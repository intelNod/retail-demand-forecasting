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

The validation baseline compares the previous four-week mean with the previous
week for every model-ready store-product row. The four-week mean is the stronger
reference: MAE is 4.517 units and RMSE is 10.130 units, compared with MAE 5.031
and RMSE 10.580 for the previous-week forecast. Store and department reports
show where this simple reference performs better or worse. Test targets remain
unused.

The first trained model is a standardized Linear Regression using all 20
numeric leakage-safe features and all 2,888,944 training rows. Its validation
MAE is 4.766 and RMSE is 10.569, so it is 5.51% worse than the four-week-mean
baseline by MAE and is not selected as the final model. The experiment is still
valuable evidence: MLflow recorded a finished run, and the saved model was
reloaded to reproduce the same MAE. The test period remains unused.

The controlled Random Forest uses the same train rows, features, and validation
period. With 40 depth-limited trees, it reaches validation MAE 4.270 and RMSE
9.137. This improves on the four-week-mean baseline by 5.48% in MAE and becomes
the selected validation model. Training took about 160 seconds locally. The
MLflow model reload check passes, and test targets are still untouched at this
selection point.

After selection was frozen, the same Random Forest parameters were retrained
on 2,946,422 train-plus-validation rows and evaluated once on 57,480 test rows.
Final test MAE is 4.418 and RMSE is 9.133, compared with baseline MAE 4.787 and
RMSE 10.522. The final model improves test MAE by 7.72%. Its third finished
MLflow run and reload check provide the final generalization evidence; test
results are not used for another tuning round.

Final error analysis shows that 76.08% of test predictions are within five
units and the median absolute error is 2.34 units, but the error tail is much
larger: p95 absolute error is 14.76 units. High-demand rows (21+ actual units)
have MAE 12.33 and are underpredicted by 5.10 units on average. `WI_2` is the
weakest store slice and `FOODS_3` the weakest department slice. These results
support human review for unusual or high-volume forecasts and are not used for
post-test tuning.

The reusable inference layer validates the exact 20-feature contract, restores
the final model from its local MLflow run, preserves feature order, rejects
invalid numeric or calendar values, and returns a non-negative weekly demand
forecast. Unit tests use a lightweight test model, while a separate smoke check
confirmed that the function exactly matches the real final Random Forest.

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
  08_baseline.ipynb
  09_linear_regression_mlflow.ipynb
  10_random_forest_mlflow.ipynb
  11_final_model_test.ipynb
  12_final_error_analysis.ipynb
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
  baseline_metrics_validation.csv
  baseline_store_metrics_validation.csv
  baseline_department_metrics_validation.csv
  baseline_checks.csv
  linear_regression_metrics_validation.csv
  linear_regression_store_metrics_validation.csv
  linear_regression_department_metrics_validation.csv
  linear_regression_coefficients.csv
  linear_regression_checks.csv
  mlflow_linear_regression_run.csv
  random_forest_metrics_validation.csv
  random_forest_store_metrics_validation.csv
  random_forest_department_metrics_validation.csv
  random_forest_feature_importance.csv
  random_forest_checks.csv
  mlflow_random_forest_run.csv
  final_test_metrics.csv
  final_test_store_metrics.csv
  final_test_department_metrics.csv
  final_model_feature_importance.csv
  final_model_checks.csv
  mlflow_final_model_run.csv
  error_analysis_summary.csv
  error_analysis_demand_bands.csv
  error_analysis_stores.csv
  error_analysis_departments.csv
  error_analysis_weeks.csv
  error_analysis_directions.csv
  error_analysis_worst_cases.csv
  error_analysis_findings.csv
  error_analysis_checks.csv
src/
  validation.py
  inference.py
  app.py
  templates/index.html
  static/styles.css
  static/app.js
tests/
  test_validation.py
  test_inference.py
  test_api.py
examples/
  predict_request.json
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
11. Run `notebooks/08_baseline.ipynb` to evaluate the two simple validation
    baselines without using test targets.
12. Run `notebooks/09_linear_regression_mlflow.ipynb` to train the first model,
    compare it with the baseline, and record the local MLflow experiment.
13. Run `notebooks/10_random_forest_mlflow.ipynb` to train the controlled tree
    model and select the best method using validation MAE.
14. Run `notebooks/11_final_model_test.ipynb` only after selection to retrain
    the fixed model and reproduce its one-time final test evaluation.
15. Run `notebooks/12_final_error_analysis.ipynb` to reproduce the frozen-model
    residual and failure-mode analysis without another tuning round.

[Open the audit notebook in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/01_data_audit.ipynb)

[Open the cleaning notebook in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/02_data_cleaning.ipynb)

[Open the EDA overview in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/03_eda_overview.ipynb)

[Open the time EDA in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/04_eda_demand_time.ipynb)

[Open the store and department EDA in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/05_eda_stores_departments.ipynb)

[Open the quality-factor EDA in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/06_eda_quality_factors.ipynb)

[Open the feature-engineering notebook in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/07_feature_engineering.ipynb)

[Open the baseline notebook in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/08_baseline.ipynb)

[Open the Linear Regression experiment in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/09_linear_regression_mlflow.ipynb)

[Open the Random Forest experiment in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/10_random_forest_mlflow.ipynb)

[Open the final model test in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/11_final_model_test.ipynb)

[Open the final error analysis in Google Colab](https://colab.research.google.com/github/intelNod/retail-demand-forecasting/blob/main/notebooks/12_final_error_analysis.ipynb)

## Safety and reproducibility

Raw CSV files are excluded from GitHub because several exceed GitHub's regular
file-size limit. Their SHA-256 hashes are recorded in
`reports/data_file_inventory.csv`. Cleaning and feature engineering write new
local files instead of overwriting the originals.

MLflow metadata (`mlflow.db`) and model artifacts (`mlruns/`) are generated
locally and excluded from Git. The committed run summary and verification
reports preserve the experiment ID, versions, parameters, and metrics.

## Reusable prediction function

After notebook 11 has created the local final MLflow run, call the reusable
function from the repository root:

```python
from src.inference import predict_weekly_demand

prediction = predict_weekly_demand(feature_values)
```

`feature_values` must contain the 20 numeric fields defined in
`src/validation.py`. Missing, unknown, non-finite, inconsistent, or out-of-range
values raise a clear validation error before the model is called.

## Flask prediction API

Start the local demonstration server after notebook 11 has created the final
MLflow model:

```powershell
.\.venv\Scripts\python.exe -m src.app
```

The service provides `GET /health` and `POST /predict` at
`http://127.0.0.1:5000`. A complete request is stored in
`examples/predict_request.json`; endpoint details and PowerShell commands are
in [API.md](API.md). The API is a local course demonstration, not a public
production deployment.

Opening `http://127.0.0.1:5000` in a browser shows the demonstration UI. It
contains all 20 model inputs, final test metrics, live model status, validation
messages, and the calculated weekly forecast. The layout also adapts to tablet
and mobile widths.

Run all validation, inference, and API tests with:

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```
