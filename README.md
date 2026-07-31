# Retail Demand Forecasting

AI/ML Fundamentals capstone project for weekly product-demand forecasting with
the M5 Forecasting — Accuracy dataset.

## Current progress

The full read-only data audit and FOODS cleaning/preprocessing stages are
complete. All five source files were checked without changing `data/raw`.

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

## Project structure

```text
data/
  raw/          local original CSV files (ignored by Git)
  interim/      temporary transformation results
  processed/    cleaned modeling data
notebooks/
  01_data_audit.ipynb
  02_data_cleaning.ipynb
reports/
  data_file_inventory.csv
  data_audit_summary.csv
  data_audit_findings.json
  cleaning_summary.csv
  cleaning_findings.json
  split_summary.csv
  split_plan.csv
```

## Run the audit

1. Download the five M5 files listed in `data/README.md`.
2. Place them in `data/raw`.
3. Install the packages from `requirements.txt`.
4. Run `notebooks/01_data_audit.ipynb` from the repository root or in Google
   Colab.
5. Review the audit report, then run `notebooks/02_data_cleaning.ipynb`.

[Open the audit notebook in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/01_data_audit.ipynb)

[Open the cleaning notebook in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/02_data_cleaning.ipynb)

## Safety and reproducibility

Raw CSV files are excluded from GitHub because several exceed GitHub's regular
file-size limit. Their SHA-256 hashes are recorded in
`reports/data_file_inventory.csv`. Cleaning and feature engineering will write
new files instead of overwriting the originals.
