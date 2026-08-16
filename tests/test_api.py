from __future__ import annotations

import unittest
from io import BytesIO

import numpy as np
import pandas as pd

from src.app import create_app
from src.validation import FEATURE_NAMES
from tests.sample_input import VALID_INPUT


class FixedModel:
    def predict(self, frame):
        return np.full(len(frame), 10.84321)


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

    def test_showcase_is_available(self) -> None:
        response = self.client.get("/showcase")
        try:
            self.assertEqual(response.status_code, 200)
            self.assertIn(b"Retail Demand Forecasting", response.data)
            self.assertIn(b"Open prediction UI", response.data)
        finally:
            response.close()

    def test_rehearsal_workbook_is_downloadable(self) -> None:
        response = self.client.get("/rehearsal/demo-sales-features.xlsx")
        try:
            self.assertEqual(response.status_code, 200)
            self.assertIn(
                "demo_sales_features.xlsx", response.headers["Content-Disposition"]
            )
            self.assertGreater(len(response.data), 10_000)
        finally:
            response.close()

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

    def _workbook(self, sheet_name="Demo Input", remove_feature=None) -> BytesIO:
        row = dict(VALID_INPUT)
        if remove_feature:
            row.pop(remove_feature)
        row.update(
            {
                "item_id": "FOODS_1_001",
                "store_id": "CA_1",
                "actual_units_sold": 12,
            }
        )
        output = BytesIO()
        with pd.ExcelWriter(output, engine="openpyxl") as writer:
            pd.DataFrame([row]).to_excel(writer, sheet_name=sheet_name, index=False)
        output.seek(0)
        return output

    def test_excel_batch_returns_metrics_preview_and_download(self) -> None:
        response = self.client.post(
            "/predict-file",
            data={"file": (self._workbook(), "demo.xlsx")},
            content_type="multipart/form-data",
        )
        self.assertEqual(response.status_code, 200)
        payload = response.get_json()
        self.assertEqual(payload["metrics"]["rows"], 1)
        self.assertAlmostEqual(payload["metrics"]["mae"], 1.1568, places=4)
        self.assertEqual(payload["preview"][0]["predicted_units_sold"], 10.8432)
        download = self.client.get(payload["download_url"])
        self.assertEqual(download.status_code, 200)
        self.assertIn("prediction_results.xlsx", download.headers["Content-Disposition"])

    def test_excel_batch_requires_demo_input_sheet(self) -> None:
        response = self.client.post(
            "/predict-file",
            data={"file": (self._workbook(sheet_name="Wrong"), "demo.xlsx")},
            content_type="multipart/form-data",
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("Demo Input", response.get_json()["error"])

    def test_excel_batch_reports_missing_feature(self) -> None:
        response = self.client.post(
            "/predict-file",
            data={"file": (self._workbook(remove_feature="sales_lag_1"), "demo.xlsx")},
            content_type="multipart/form-data",
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("sales_lag_1", response.get_json()["error"])


if __name__ == "__main__":
    unittest.main()
