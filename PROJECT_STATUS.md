# Project Status

## Project

Retail Demand Forecasting (`RET-01`)

## Current stage

EDA-4 train-only quality-factor analysis completed

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
- Created and executed the Colab-compatible FOODS cleaning notebook.
- Processed all 14,370 FOODS store-product series and 27,892,170 daily sales
  values.
- Converted daily values into 3,994,860 weekly records before cleaning.
- Excluded incomplete weeks and 870,551 no-price weeks; none of the no-price
  weeks contained positive sales.
- Saved 3,118,862 model-ready weekly rows in 38 Parquet parts.
- Confirmed zero duplicate weekly keys and zero missing required output values.
- Kept 634,398 zero-demand weeks as valid observations.
- Kept and flagged 20,907 weeks containing high daily sales.
- Added calendar events, SNAP days, and day-weighted weekly prices.
- Created chronological train, validation, test, and demonstration periods.
- Saved cleaning and split reports in `reports/`.
- Created and executed the short EDA overview notebook.
- Confirmed 3,118,862 model-ready rows across 1,437 products, three
  departments, ten stores, three states, and 277 weeks.
- Verified the processed date range from 31.01.2011 to 22.05.2016.
- Compared row counts, average demand, maximum demand, and zero-demand share
  across train, validation, and test.
- Visualized total weekly FOODS demand and the validation/test boundaries.
- Saved the EDA overview, split statistics, and weekly time-series reports.
- Created and executed the train-only demand-over-time notebook.
- Analyzed 269 training weeks without loading validation or test targets.
- Compared raw weekly demand with a four-week moving average.
- Summarized demand per active series by calendar month and year.
- Found the highest training-period monthly average in July and the lowest in
  November.
- Documented that the changing number of active series makes total-demand and
  per-series trends different.
- Saved weekly, monthly, yearly, and reproducible finding reports for EDA-2.
- Created and executed the train-only store and department EDA notebook.
- Compared all ten stores using mean demand, total demand, zero-demand share,
  and outlier-week share.
- Compared `FOODS_1`, `FOODS_2`, and `FOODS_3` using the same metrics.
- Found the highest mean store demand in `CA_3` and the lowest in `CA_4`.
- Found that `FOODS_3` has the highest mean and total demand, while `FOODS_2`
  has the highest zero-demand share.
- Confirmed that all 3,003,902 training rows are represented once in both the
  store and department summaries.
- Saved store, department, and reproducible finding reports for EDA-3.
- Created and executed the train-only quality-factor EDA notebook.
- Confirmed that zero demand represents 20.72% of training product-weeks.
- Compared event and no-event weeks without claiming a causal event effect.
- Compared SNAP and no-SNAP weeks without claiming a causal SNAP effect.
- Compared four training-derived price bands and documented product-mix
  confounding.
- Confirmed that flagged outlier weeks represent 0.68% of training rows and
  remain in the dataset.
- Verified full row accounting for zero, event, SNAP, price, and outlier
  summaries.
- Saved seven small train-only EDA-4 reports.

## Current task

Review the completed EDA results and build the leakage-safe feature table.

## Next planned task

Create past-only lag, rolling, price, and calendar features. Verify that no
current or future target is used and save the local Parquet feature table.

## Planned course route

1. Full data audit and data-quality report.
2. EDA, cleaning, preprocessing, and leakage-safe split.
3. Baseline, MLflow experiments, and model selection.
4. Flask/REST inference demonstration.
5. Reproducibility, submission checks, and defense preparation.

## Known risks and blockers

- Mentor approval is still pending.
- The chronological split dates are fixed and must not be changed after model
  comparison begins.
- The complete transformed dataset may exceed free Colab memory, so modeling
  scope must be justified with real memory and runtime measurements.
- The current M5 data represents US Walmart stores, not Uzbekistan.
- High sales and prices are review candidates, not automatic errors.
- Optional event fields and zero sales are valid data characteristics and must
  not be filled or removed without a clear rule.
- Project submission is due on 03.08.2026; the exact LMS time must be confirmed.
- No commits or pushes are allowed after final LMS submission.

## Git state

- Dataset folders and the full M5 Project Brief are published on `origin/main`.
- The completed audit milestone is published on `origin/main`.
- The FOODS cleaning milestone is published on `origin/main`.
- EDA-1 is published on `origin/main`.
- EDA-2 is published on `origin/main`.
- EDA-3 is published on `origin/main`.
- EDA-4 is completed as the first verified milestone in the current C3 batch.
