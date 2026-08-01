from __future__ import annotations

import unittest

import numpy as np

from src.app import create_app
from src.validation import FEATURE_NAMES
from tests.sample_input import VALID_INPUT


class FixedModel:
    def predict(self, frame):
        return np.array([10.84321])


class ApiTests(unittest.TestCase):
    def setUp(self) -> None:
        app = create_app(model=FixedModel())
        app.config.update(TESTING=True)
        self.client = app.test_client()

    def test_index_renders_prediction_form(self) -> None:
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Weekly demand forecast", response.data)
        self.assertIn(b'id="prediction-form"', response.data)
        for feature in FEATURE_NAMES:
            self.assertIn(f'name="{feature}"'.encode(), response.data)

    def test_ui_assets_are_available(self) -> None:
        styles = self.client.get("/static/styles.css")
        script = self.client.get("/static/app.js")
        try:
            self.assertEqual(styles.status_code, 200)
            self.assertEqual(script.status_code, 200)
        finally:
            styles.close()
            script.close()

    def test_api_index_documents_endpoints(self) -> None:
        response = self.client.get("/api")
        self.assertEqual(response.status_code, 200)
        self.assertIn("POST /predict", response.get_json()["endpoints"])

    def test_health_reports_loaded_model(self) -> None:
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["status"], "ok")
        self.assertTrue(response.get_json()["model_loaded"])

    def test_valid_prediction(self) -> None:
        response = self.client.post("/predict", json=VALID_INPUT)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["predicted_weekly_units"], 10.8432)
        self.assertEqual(response.get_json()["unit"], "units_per_week")

    def test_missing_field_returns_400(self) -> None:
        payload = dict(VALID_INPUT)
        payload.pop("sales_lag_1")
        response = self.client.post("/predict", json=payload)
        self.assertEqual(response.status_code, 400)
        self.assertIn("Missing required fields", response.get_json()["error"])

    def test_json_array_returns_400(self) -> None:
        response = self.client.post("/predict", json=[VALID_INPUT])
        self.assertEqual(response.status_code, 400)
        self.assertIn("JSON object", response.get_json()["error"])

    def test_non_json_request_returns_415(self) -> None:
        response = self.client.post("/predict", data="not json")
        self.assertEqual(response.status_code, 415)


if __name__ == "__main__":
    unittest.main()
