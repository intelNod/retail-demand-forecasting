# Project Status

## Project

Retail Demand Forecasting (`RET-01`)

## Current stage

Full data audit completed

## Completed

- Selected the official field-based scenario `RET-01 — Product Demand
  Forecasting`.
- Selected the M5 Forecasting — Accuracy dataset.
- Downloaded all five M5 CSV files.
- Verified the main file structure, dates, identifiers, sales, and price keys.
- Copied the original files to `data/raw`.
- Confirmed that every local raw copy matches its downloaded source by SHA-256.
- Added separate `raw`, `interim`, and `processed` data folders.
- Documented why large local CSV files are excluded from Git.
- Updated the Project Brief for the full M5 workflow.
- Created and executed the Colab-compatible full data-audit notebook.
- Checked all 59,181,090 daily evaluation sales values and all 58,327,370
  validation sales values.
- Checked all 6,841,121 price rows.
- Confirmed zero missing, non-numeric, negative, fractional, and duplicate sales
  problems.
- Confirmed zero missing, invalid, non-positive, and duplicate price problems.
- Confirmed that validation is an exact prefix of evaluation and must not be
  used as an independent dataset.
- Recorded the approximately 68% zero-sales share and p99.9 review thresholds
  for sales and prices.
- Saved the file inventory, SHA-256 hashes, audit summary, and detailed findings
  in `reports/`.

## Current task

Review the real audit findings and agree on the cleaning, transformation, and
time-based split plan.

## Next planned task

Create the cleaning and preprocessing notebook. It will reshape the selected
modeling scope, merge calendar and price data, handle expected missing
context fields, review outliers, and create a leakage-safe chronological split.
No model training will begin until this output has been reviewed.

## Planned course route

1. Full data audit and data-quality report.
2. EDA, cleaning, preprocessing, and leakage-safe split.
3. Baseline, MLflow experiments, and model selection.
4. Flask/REST inference demonstration.
5. Reproducibility, submission checks, and defense preparation.

## Known risks and blockers

- Mentor approval is still pending.
- Exact train, validation, test, and demonstration dates still need approval.
- The complete transformed dataset may exceed free Colab memory, so modeling
  scope must be justified with real memory and runtime measurements.
- The current M5 data represents US Walmart stores, not Uzbekistan.
- High sales and prices are review candidates, not automatic errors.
- Optional event fields and zero sales are valid data characteristics and must
  not be filled or removed without a clear rule.

## Git state

- Dataset folders and the full M5 Project Brief are published on `origin/main`.
- The completed audit milestone is awaiting review and its own commit.
