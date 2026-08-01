"""Validation rules for one-week-ahead demand prediction inputs."""

from __future__ import annotations

import math
from numbers import Real
from typing import Any, Mapping


FEATURE_NAMES = (
    "sales_lag_1",
    "sales_lag_2",
    "sales_lag_4",
    "sales_lag_8",
    "sales_roll_mean_4",
    "sales_roll_std_4",
    "sales_roll_mean_8",
    "sales_roll_std_8",
    "zero_weeks_last_4",
    "sell_price_mean",
    "price_lag_1",
    "price_change_pct",
    "year",
    "month",
    "week_of_year",
    "quarter",
    "event_days",
    "has_event",
    "snap_days",
    "has_snap",
)

NON_NEGATIVE_FIELDS = {
    "sales_lag_1",
    "sales_lag_2",
    "sales_lag_4",
    "sales_lag_8",
    "sales_roll_mean_4",
    "sales_roll_std_4",
    "sales_roll_mean_8",
    "sales_roll_std_8",
    "zero_weeks_last_4",
    "sell_price_mean",
    "price_lag_1",
    "event_days",
    "snap_days",
}

INTEGER_RANGES = {
    "zero_weeks_last_4": (0, 4),
    "year": (2000, 2100),
    "month": (1, 12),
    "week_of_year": (1, 53),
    "quarter": (1, 4),
    "event_days": (0, 7),
    "has_event": (0, 1),
    "snap_days": (0, 7),
    "has_snap": (0, 1),
}


class InputValidationError(ValueError):
    """Raised when a prediction request does not match the feature contract."""


def _as_finite_number(field: str, value: Any) -> float:
    if isinstance(value, bool) or not isinstance(value, Real):
        raise InputValidationError(f"Field '{field}' must be a number.")
    numeric_value = float(value)
    if not math.isfinite(numeric_value):
        raise InputValidationError(f"Field '{field}' must be finite.")
    return numeric_value


def validate_prediction_input(payload: Mapping[str, Any]) -> dict[str, float]:
    """Validate one request and return numeric values in model feature order."""

    if not isinstance(payload, Mapping):
        raise InputValidationError("Prediction input must be a JSON object.")

    missing = [field for field in FEATURE_NAMES if field not in payload]
    if missing:
        raise InputValidationError(f"Missing required fields: {', '.join(missing)}.")

    extra = sorted(set(payload) - set(FEATURE_NAMES))
    if extra:
        raise InputValidationError(f"Unknown fields: {', '.join(extra)}.")

    validated = {
        field: _as_finite_number(field, payload[field]) for field in FEATURE_NAMES
    }

    for field in NON_NEGATIVE_FIELDS:
        if validated[field] < 0:
            raise InputValidationError(f"Field '{field}' cannot be negative.")

    if validated["sell_price_mean"] <= 0 or validated["price_lag_1"] <= 0:
        raise InputValidationError("Current and previous prices must be greater than zero.")

    if validated["price_change_pct"] < -1:
        raise InputValidationError("Field 'price_change_pct' cannot be below -1.")

    for field, (minimum, maximum) in INTEGER_RANGES.items():
        value = validated[field]
        if not value.is_integer() or not minimum <= value <= maximum:
            raise InputValidationError(
                f"Field '{field}' must be an integer from {minimum} to {maximum}."
            )

    expected_quarter = (int(validated["month"]) - 1) // 3 + 1
    if int(validated["quarter"]) != expected_quarter:
        raise InputValidationError("Field 'quarter' does not match field 'month'.")

    if int(validated["has_event"]) != int(validated["event_days"] > 0):
        raise InputValidationError("Field 'has_event' does not match 'event_days'.")

    if int(validated["has_snap"]) != int(validated["snap_days"] > 0):
        raise InputValidationError("Field 'has_snap' does not match 'snap_days'.")

    return validated
