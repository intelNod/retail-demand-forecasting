# Retail Demand Forecasting

AI/ML Fundamentals capstone project for weekly product-demand forecasting with
the M5 Forecasting — Accuracy dataset.

## Current progress

The full read-only data audit, FOODS cleaning/preprocessing, four EDA blocks,
and leakage-safe feature engineering are complete. All five source files were
checked without changing `data/raw`.

Main verified findings:

- 30,490 store-product sales series;
- 59,181,090 daily values in `sales_train_evaluation.csv`;
- 6,841,121 weekly price rows;
- no missing, non-numeric, negative, fractional, or duplicated sales records;
- no invalid, missing, non-positive, or duplicated price records;
- approximately 68% of daily sales values are zero;
- values above the 99.9th percentile are flagged for contextual review;
- the validation sales history is an exact earlier prefix of the evaluation
  history and must not be treated as independent data.

Detailed results are stored in `reports/` and in the executed notebook.

The cleaning notebook processed the complete FOODS category:

- 14,370 store-product series and 27,892,170 daily source values;
- 3,994,860 weekly rows inspected before cleaning;
- 3,118,862 model-ready weekly rows saved;
- 1,437 products across all ten stores;
- zero duplicated output keys and zero missing required output values;
- zero-sales weeks retained and high-sales weeks retained with a review flag;
- inactive weeks without prices and incomplete weeks excluded with counts
  recorded in the cleaning report;
- chronological train, validation, test, and demonstration periods documented.

The first EDA overview confirmed 3,118,862 model-ready rows, 1,437 products,
three departments, ten stores, three states, and 277 weeks from 31.01.2011 to
22.05.2016. It also records demand statistics for each chronological split and
visualizes total weekly FOODS demand.

The time-based EDA uses training targets only. It compares weekly demand with a
four-week moving average and summarizes monthly and yearly patterns. July has
the highest mean weekly demand per active series in the training history, while
November has the lowest. The number of active series changes considerably over
time, so total demand and per-series demand must be interpreted together.

The store and department EDA also uses training targets only. `CA_3` has the
highest mean weekly demand per active product and `CA_4` the lowest. `FOODS_3`
has the highest mean and total demand, while `FOODS_2` has the highest
zero-demand share. These are descriptive differences and do not prove their
causes.

The final EDA block uses training targets only to review zero demand, prices,
events, SNAP, and flagged outliers. Zero demand represents 20.72% of training
rows. Event and no-event weeks have similar mean demand, SNAP weeks have a
higher descriptive mean, and flagged outlier weeks represent 0.68% of rows.
Price-band differences are reported as associations, not causal price effects.

The feature notebook creates 4 categorical and 20 numeric predictors for a
rolling one-week-ahead forecast. Sales lags and rolling statistics use past
weeks only; the current target and current sales-outlier flag are excluded.
After the required eight-week warm-up, 3,003,902 model-ready rows remain:
2,888,944 train, 57,478 validation, and 57,480 test rows. The two removed
validation rows belong to a late-starting product series that did not yet have
eight past weeks. All leakage, null, duplicate-key, and split-order checks pass.

## Project structure

```text
data/
  raw/          local original CSV files (ignored by Git)
  interim/      temporary transformation results
  processed/    cleaned modeling data
notebooks/
  01_data_audit.ipynb
  02_data_cleaning.ipynb
  03_eda_overview.ipynb
  04_eda_demand_time.ipynb
  05_eda_stores_departments.ipynb
  06_eda_quality_factors.ipynb
  07_feature_engineering.ipynb
reports/
  data_file_inventory.csv
  data_audit_summary.csv
  data_audit_findings.json
  cleaning_summary.csv
  cleaning_findings.json
  split_summary.csv
  split_plan.csv
  eda_overview_summary.csv
  eda_split_statistics.csv
  eda_weekly_overview.csv
  eda_time_weekly_train.csv
  eda_time_monthly_train.csv
  eda_time_yearly_train.csv
  eda_time_findings.csv
  eda_store_statistics_train.csv
  eda_department_statistics_train.csv
  eda_store_department_findings.csv
  eda_zero_demand_train.csv
  eda_event_summary_train.csv
  eda_snap_summary_train.csv
  eda_event_names_train.csv
  eda_price_bands_train.csv
  eda_outlier_summary_train.csv
  eda_quality_factor_findings.csv
  feature_definitions.csv
  feature_missing_before_warmup.csv
  feature_split_summary.csv
  leakage_checks.csv
  feature_summary.csv
```

## Run the audit

1. Download the five M5 files listed in `data/README.md`.
2. Place them in `data/raw`.
3. Install the packages from `requirements.txt`.
4. Run `notebooks/01_data_audit.ipynb` from the repository root or in Google
   Colab.
5. Review the audit report, then run `notebooks/02_data_cleaning.ipynb`.
6. Run `notebooks/03_eda_overview.ipynb` for the first exploratory overview.
7. Run `notebooks/04_eda_demand_time.ipynb` for train-only time analysis.
8. Run `notebooks/05_eda_stores_departments.ipynb` for train-only store and
   department comparisons.
9. Run `notebooks/06_eda_quality_factors.ipynb` for train-only quality-factor
   analysis.
10. Run `notebooks/07_feature_engineering.ipynb` to create and verify the local
    leakage-safe train, validation, and test feature files.

[Open the audit notebook in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/01_data_audit.ipynb)

[Open the cleaning notebook in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/02_data_cleaning.ipynb)

[Open the EDA overview in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/03_eda_overview.ipynb)

[Open the time EDA in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/04_eda_demand_time.ipynb)

[Open the store and department EDA in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/05_eda_stores_departments.ipynb)

[Open the quality-factor EDA in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/06_eda_quality_factors.ipynb)

[Open the feature-engineering notebook in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/07_feature_engineering.ipynb)

## Safety and reproducibility

Raw CSV files are excluded from GitHub because several exceed GitHub's regular
file-size limit. Their SHA-256 hashes are recorded in
`reports/data_file_inventory.csv`. Cleaning and feature engineering write new
local files instead of overwriting the originals.
