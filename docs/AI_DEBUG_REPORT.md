# AI Debug Report

## Debugging record

- **Date:** 12.08.2026
- **Project:** Retail Demand Forecasting (`RET-01`)
- **Behavior investigated:** validation of the three related price inputs used
  by the final Random Forest inference path
- **Final status:** VERIFIED

## Problem

The prediction contract accepted `sell_price_mean`, `price_lag_1`, and
`price_change_pct` as separate finite values but did not confirm that the
percentage change matched the two prices.

For example, this contradictory input was accepted before the fix:

```text
sell_price_mean = 2.49
price_lag_1 = 2.49
price_change_pct = 0.50
```

Equal prices imply a 0% change, not a 50% increase. Accepting contradictory
features could send an impossible price combination to the model and make the
forecast less trustworthy.

## Root cause

`src/validation.py` checked that prices were positive and that
`price_change_pct` was not below `-1`, but it did not recalculate the expected
change:

```python
(sell_price_mean - price_lag_1) / price_lag_1
```

Therefore, all three fields could be individually valid while being mutually
inconsistent.

## Files changed

- `src/validation.py` — added the price-consistency validation.
- `tests/test_validation.py` — added one failing contradictory case and two
  nearby valid increase/decrease cases.
- `docs/AI_DEBUG_REPORT.md` — recorded the real debugging evidence.
- `PROJECT_STATUS.md` — recorded the verified debugging milestone.

## Automated verification created

Three focused validation tests were added:

1. Equal current and previous prices with `price_change_pct=0.5` must fail.
2. A price increase from `2.0` to `3.0` with `price_change_pct=0.5` must pass.
3. A price decrease from `2.0` to `1.0` with `price_change_pct=-0.5` must pass.

## Actual result before the fix

Command:

```powershell
.\.venv\Scripts\python.exe -m unittest `
  tests.test_validation.ValidationTests.test_inconsistent_price_change_is_rejected `
  tests.test_validation.ValidationTests.test_consistent_price_increase_is_accepted `
  tests.test_validation.ValidationTests.test_consistent_price_decrease_is_accepted -v
```

Real result:

```text
test_inconsistent_price_change_is_rejected ... FAIL
test_consistent_price_increase_is_accepted ... ok
test_consistent_price_decrease_is_accepted ... ok

AssertionError: InputValidationError not raised
Ran 3 tests
FAILED (failures=1)
```

This proved that the contradictory input reached the model-validation boundary
without being rejected.

## Fix

The validator now recalculates the expected percentage change and compares it
with the supplied value using `math.isclose` with `1e-6` relative and absolute
tolerance. The small tolerance permits normal floating-point representation
differences but rejects materially inconsistent price features.

The model artifact, feature order, dataset, chronological splits, protected
test evidence, and reported metrics were not changed.

## Actual result after the fix

Targeted result:

```text
test_inconsistent_price_change_is_rejected ... ok
test_consistent_price_increase_is_accepted ... ok
test_consistent_price_decrease_is_accepted ... ok
Ran 3 tests
OK
```

Full project check:

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

```text
Ran 21 tests in 0.162s
OK
```

Real final-model smoke result:

```text
real_model_prediction=10.488517773326
```

This matches the documented example forecast after rounding and confirms that
the existing valid prediction path still works.

## Remaining limitations and unverified areas

- The API expects all 20 engineered numeric features instead of calculating
  them from raw store and product history.
- The UI permits manual price-change entry even though it is derived from the
  two price fields. A later improvement could calculate it in the browser while
  keeping server-side validation as the source of truth.
- This debugging cycle did not retrain or retune the model and did not access
  the protected test set.

## Plain-language explanation

Previously, a user could say that the price stayed the same and also say that
it increased by 50%. Each number looked valid by itself, so the application
accepted the impossible combination. The validator now calculates the price
change from the current and previous prices and rejects the request when the
three values disagree.

## What the student should be able to explain

- A validation bug can exist even when the model itself is correct.
- Related input fields must be checked together, not only one at a time.
- The failing test was created before the production fix.
- The fix is intentionally small and does not change the trained model.
- Targeted tests, all 21 project tests, and the real prediction passed after
  the change.
