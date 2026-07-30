# Project Status

## Project

Retail Demand Forecasting (`RET-01`)

## Current stage

Scope definition and dataset organization

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

## Current task

Send the updated Project Brief for mentor approval.

## Next planned task

Create a full, read-only data-audit notebook that checks every source M5 file
and records its real findings. No cleaning or model training will begin until
the audit result and time-based split strategy have been reviewed.

## Planned course route

1. Full data audit and data-quality report.
2. EDA, cleaning, preprocessing, and leakage-safe split.
3. Baseline, MLflow experiments, and model selection.
4. Flask/REST inference demonstration.
5. Reproducibility, submission checks, and defense preparation.

## Known risks and blockers

- Mentor approval is still pending.
- Exact train, validation, test, and demonstration dates must be chosen after
  the full audit.
- The complete transformed dataset may exceed free Colab memory, so modeling
  scope must be justified with real memory and runtime measurements.
- The current M5 data represents US Walmart stores, not Uzbekistan.

## Git state

- Dataset-folder milestone committed locally.
- Updated Brief and Status are awaiting review and their own commit.
- Nothing has been pushed after the latest local changes.
