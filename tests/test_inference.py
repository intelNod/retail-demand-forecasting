from __future__ import annotations

import unittest

import numpy as np

from src.inference import predict_weekly_demand
from src.validation import FEATURE_NAMES
from tests.sample_input import VALID_INPUT


class RecordingModel:
    def __init__(self, prediction: float) -> None:
        self.prediction = prediction
        self.columns: tuple[str, ...] | None = None

    def predict(self, frame):
        self.columns = tuple(frame.columns)
        return np.array([self.prediction])


class InferenceTests(unittest.TestCase):
    def test_prediction_uses_exact_feature_order(self) -> None:
        model = RecordingModel(11.25)
        result = predict_weekly_demand(VALID_INPUT, model=model)
        self.assertEqual(result, 11.25)
        self.assertEqual(model.columns, FEATURE_NAMES)

    def test_negative_model_output_is_clipped_to_zero(self) -> None:
        result = predict_weekly_demand(VALID_INPUT, model=RecordingModel(-2.0))
        self.assertEqual(result, 0.0)

    def test_non_finite_model_output_is_rejected(self) -> None:
        with self.assertRaisesRegex(RuntimeError, "invalid prediction"):
            predict_weekly_demand(VALID_INPUT, model=RecordingModel(float("nan")))


if __name__ == "__main__":
    unittest.main()
