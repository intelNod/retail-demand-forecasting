from __future__ import annotations

import unittest

from src.validation import FEATURE_NAMES, InputValidationError, validate_prediction_input
from tests.sample_input import VALID_INPUT


class ValidationTests(unittest.TestCase):
    def test_valid_input_returns_all_features_in_order(self) -> None:
        result = validate_prediction_input(VALID_INPUT)
        self.assertEqual(tuple(result), FEATURE_NAMES)

    def test_missing_field_is_rejected(self) -> None:
        payload = dict(VALID_INPUT)
        payload.pop("sales_lag_1")
        with self.assertRaisesRegex(InputValidationError, "Missing required fields"):
            validate_prediction_input(payload)

    def test_unknown_field_is_rejected(self) -> None:
        payload = {**VALID_INPUT, "unknown": 1}
        with self.assertRaisesRegex(InputValidationError, "Unknown fields"):
            validate_prediction_input(payload)

    def test_boolean_is_not_accepted_as_number(self) -> None:
        payload = {**VALID_INPUT, "sales_lag_1": True}
        with self.assertRaisesRegex(InputValidationError, "must be a number"):
            validate_prediction_input(payload)

    def test_negative_price_is_rejected(self) -> None:
        payload = {**VALID_INPUT, "sell_price_mean": -1}
        with self.assertRaisesRegex(InputValidationError, "cannot be negative"):
            validate_prediction_input(payload)

    def test_inconsistent_quarter_is_rejected(self) -> None:
        payload = {**VALID_INPUT, "quarter": 4}
        with self.assertRaisesRegex(InputValidationError, "does not match"):
            validate_prediction_input(payload)

    def test_inconsistent_snap_flag_is_rejected(self) -> None:
        payload = {**VALID_INPUT, "has_snap": 0}
        with self.assertRaisesRegex(InputValidationError, "does not match"):
            validate_prediction_input(payload)

    def test_inconsistent_price_change_is_rejected(self) -> None:
        payload = {
            **VALID_INPUT,
            "sell_price_mean": 2.49,
            "price_lag_1": 2.49,
            "price_change_pct": 0.5,
        }
        with self.assertRaisesRegex(InputValidationError, "price_change_pct"):
            validate_prediction_input(payload)

    def test_consistent_price_increase_is_accepted(self) -> None:
        payload = {
            **VALID_INPUT,
            "sell_price_mean": 3.0,
            "price_lag_1": 2.0,
            "price_change_pct": 0.5,
        }
        result = validate_prediction_input(payload)
        self.assertEqual(result["price_change_pct"], 0.5)

    def test_consistent_price_decrease_is_accepted(self) -> None:
        payload = {
            **VALID_INPUT,
            "sell_price_mean": 1.0,
            "price_lag_1": 2.0,
            "price_change_pct": -0.5,
        }
        result = validate_prediction_input(payload)
        self.assertEqual(result["price_change_pct"], -0.5)


if __name__ == "__main__":
    unittest.main()
