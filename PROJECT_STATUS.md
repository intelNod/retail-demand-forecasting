# Project Status

## Project

Retail Demand Forecasting (`RET-01`)

## Current stage

C6 finalization and rehearsal preparation: Excel batch demo, custom showcase,
comprehensive guide, presentation, and verified debugging complete

## Completed

- Completed one controlled debugging cycle for the prediction input contract.
- Reproduced and fixed a validation defect: contradictory current price,
  previous price, and percentage-change values were accepted together.
- Added three focused debugging tests; the real example
  prediction remains 10.4885.
- Recorded before/after evidence in `docs/AI_DEBUG_REPORT.md` without changing
  the trained model, dataset, protected test evidence, or reported metrics.
- Rebuilt and visually reviewed the final 17-slide defense presentation from
  the comprehensive guide.
- Updated the final deck to report the current 21-test suite while preserving
  the historical 18-test clean-clone record in the reproducibility evidence.
- Added a 240-row Excel rehearsal workbook sampled reproducibly across four
  protected test weeks, ten stores, and three FOODS departments.
- Added batch Excel prediction, row validation, sample MAE, actual-versus-
  predicted preview, and downloadable Excel results to the Flask UI.
- Verified the rehearsal workbook with the real final model: demo MAE 3.4419,
  mean actual demand 6.7875, and mean prediction 6.4392. These sample metrics do
  not replace the official 57,480-row test result.
- Added a custom static showcase and a step-by-step Russian rehearsal guide.
- Expanded the automated suite to 26 passing tests.

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
- Created and executed the leakage-safe feature-engineering notebook.
- Confirmed 3,104,492 consecutive seven-day gaps across all store-product
  series before using row-based weekly lags.
- Created four categorical and 20 numeric features using past sales, known
  prices, and known calendar information.
- Applied `shift(1)` before all sales rolling statistics so the current target
  cannot enter its own features.
- Excluded the current target and current sales-outlier flag from predictors.
- Removed 114,960 expected warm-up rows, including two first-validation rows
  from late-starting product series without eight past weeks.
- Saved 3,003,902 model-ready rows: 2,888,944 train, 57,478 validation, and
  57,480 test rows.
- Passed sentinel leakage, exact lag, chronological order, duplicate-key, and
  required-null checks.
- Rechecked all five raw-file SHA-256 hashes after feature generation; every
  original file remains unchanged.
- Saved feature definitions, split counts, missing-value counts, leakage
  checks, and a feature summary in `reports/`.
- Created and executed the simple baseline notebook without training a model.
- Evaluated 57,478 chronological validation rows without loading test targets.
- Measured the main previous-four-week-mean baseline at MAE 4.517 and RMSE
  10.130 units.
- Measured the previous-week reference at MAE 5.031 and RMSE 10.580 units.
- Confirmed that the previous-four-week mean is the stronger baseline on both
  validation metrics.
- Reviewed both baselines across all ten stores and three FOODS departments.
- Passed validation-scope, prediction-value, and group-accounting checks.
- Saved overall, store, department, and verification reports for the baseline.
- Added reproducible scikit-learn and MLflow dependencies.
- Created and executed the Linear Regression + MLflow notebook.
- Trained StandardScaler + Linear Regression on all 2,888,944 model-ready
  training rows and 20 numeric leakage-safe features.
- Evaluated the model on 57,478 later validation rows without loading test.
- Measured validation MAE 4.766 and RMSE 10.569 after clipping negative demand
  predictions to zero.
- Confirmed the model is 5.51% worse by MAE than the 4.517 baseline and must
  not be selected as final.
- Recorded one finished MLflow run with parameters, metrics, reports, feature
  list, and the fitted sklearn pipeline.
- Reloaded the saved MLflow model and reproduced validation MAE 4.766.
- Passed all 14 split, leakage, prediction, row-accounting, MLflow-status, and
  model-reload checks.
- Saved model metrics, grouped results, standardized coefficients, checks, and
  the MLflow run summary in `reports/`.
- Created and executed the controlled Random Forest + MLflow notebook.
- Trained 40 depth-limited trees on all 2,888,944 training rows using the same
  20 numeric features as Linear Regression.
- Measured validation MAE 4.270 and RMSE 9.137 on 57,478 later rows.
- Improved on the four-week-mean baseline by 5.48% in validation MAE.
- Selected Random Forest over the baseline and Linear Regression using
  validation only; test remained untouched during selection.
- Recorded the second finished MLflow run and reloaded its model to reproduce
  validation MAE 4.270.
- Passed all 16 split, prediction, tree, importance, row-accounting, MLflow,
  and model-reload checks.
- Confirmed that lag 1 and the previous four-week mean are the two most
  important Random Forest inputs; importance is not treated as causality.
- Froze the selected Random Forest parameters before accessing test targets.
- Retrained the fixed model on 2,946,422 combined train-plus-validation rows.
- Performed one final evaluation on all 57,480 test rows across four later
  weeks without another tuning round.
- Measured final test MAE 4.418 and RMSE 9.133, compared with baseline MAE
  4.787 and RMSE 10.522.
- Confirmed a 7.72% final test MAE improvement over the four-week-mean
  baseline.
- Recorded the third finished MLflow run with the final fitted model and test
  evidence.
- Reloaded the final MLflow model and reproduced test MAE 4.418.
- Passed all 17 selection, parameter, split, prediction, row-accounting,
  MLflow-status, and final-model reload checks.
- Added a reusable 20-feature input-validation contract.
- Added clear checks for missing, unknown, non-numeric, non-finite, negative,
  out-of-range, and inconsistent calendar/SNAP/event values.
- Added a cached final-model loader using the committed MLflow run summary and
  local SQLite tracking database.
- Added a reusable function that preserves feature order and returns a
  non-negative weekly demand forecast.
- Passed ten unit tests for validation and inference behavior.
- Confirmed with the real final Random Forest that reusable and direct
  predictions match exactly.
- Added a Flask application that loads the final model lazily and reuses the
  same validation and prediction functions.
- Added `GET /`, `GET /health`, and `POST /predict` endpoints.
- Added explicit HTTP responses for invalid JSON, invalid features, missing
  local model artifacts, and successful weekly forecasts.
- Added a complete 20-feature example request and beginner-friendly API run
  instructions.
- Passed all 16 validation, inference, and Flask endpoint unit tests.
- Started the real local server, verified `/health` returned HTTP 200 with the
  final model loaded, and verified `/predict` returned 10.4885 units for the
  committed example request.
- Stopped the temporary verification server after the successful HTTP test.
- Added a responsive browser UI with project-specific model metrics and a
  three-part input form for past demand, price, and calendar/program features.
- Connected the UI to the existing `/health` and `/predict` endpoints without
  duplicating validation or inference logic.
- Added clear ready, loading, prediction, reset, and validation-error states.
- Confirmed that the rendered page contains all 20 required feature inputs.
- Verified the real local UI page, CSS, JavaScript, and prediction endpoint all
  returned HTTP 200; the committed example produced 10.4885 units.
- Expanded the automated suite to 18 passing validation, inference, API, and UI
  integration tests.
- Created and executed a no-retraining final test error-analysis notebook.
- Confirmed median absolute error 2.34 units, p95 absolute error 14.76 units,
  and 76.08% of predictions within five units.
- Found that high-demand rows (21+ units) are the main failure band, with MAE
  12.33 and average underprediction of 5.10 units.
- Identified `WI_2` as the weakest store slice and `FOODS_3` as the weakest
  department slice by test MAE.
- Saved 25 concrete worst-error examples for defense discussion and human
  review guidance.
- Passed all 12 final error-analysis scope, metric, row-accounting, and ordering
  checks without changing the model after test.
- Exported the final MLflow/skops artifact into `models/final_model/` so a clean
  clone does not depend on the ignored local MLflow database.
- Recorded the 20,523,283-byte model file SHA-256 and final run provenance in
  `models/README.md`.
- Removed the copied local absolute path from the portable MLflow metadata.
- Updated reusable inference to prefer the repository-contained model while
  keeping the original MLflow run as a documented fallback.
- Created and executed a focused root-level demo notebook with a normal example
  and an expected invalid-input example.
- Confirmed the standalone artifact loads 40 trees and reproduces the real
  example forecast without raw data, processed data, or `mlflow.db`.
- Cloned GitHub commit `8c5a5f1` into a new temporary directory and created a
  fresh Python 3.10 environment.
- Installed all declared requirements and executed `demo.ipynb` successfully
  from the clean clone with no raw/processed CSV files and no `mlflow.db`.
- Reproduced the example prediction of 10.4885 and passed all 18 tests in the
  clean environment.
- Documented dataset access terms, reproducibility evidence, intended use,
  limitations, risks, and human-review safeguards.
- Created a one-page LMS submission-details document with repository and Colab
  links, project summary, and verified metrics.
- Created an initial 10-slide defense presentation, then marked it as a
  superseded draft after student review; it is not the final defense deck.
- Added a comprehensive Russian guide covering every notebook, exact
  preprocessing logic, all 20 features, model selection, final test, error
  analysis, inference/API/UI, reproducibility, responsible use, the full
  10-minute talk, 55 likely questions, unsafe claims, and final checks.
- Extracted all twelve verified notebook charts directly from executed outputs
  and embedded the ten most useful figures in the guide.
- Added the reviewed Markdown source and a styled standalone Word document.

## Current task

Run the student rehearsal using `rehearsal/README_RU.md`, then perform the
remaining LMS, public-link, Colab, and defense-practice checks.

## Next planned task

Student studies the guide, reviews the revised presentation, confirms
mentor/deadline details, submits through LMS, and makes no commits afterward.

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
- The instructor message says 04.08.2026 at 23:59, while the student's safer
  personal deadline is 03.08.2026; the exact LMS deadline must be confirmed.
- No commits or pushes are allowed after final LMS submission.

## Git state

- Dataset folders and the full M5 Project Brief are published on `origin/main`.
- The completed audit milestone is published on `origin/main`.
- The FOODS cleaning milestone is published on `origin/main`.
- EDA-1 is published on `origin/main`.
- EDA-2 is published on `origin/main`.
- EDA-3 is published on `origin/main`.
- EDA-4 is published as the first verified milestone in the current C3 batch.
- The leakage-safe feature table is published as the second verified milestone
  in the current C3 batch.
- The verified validation baseline is published on `origin/main`.
- The verified Linear Regression + MLflow experiment is published on
  `origin/main`.
- The verified Random Forest selection experiment is published on
  `origin/main`.
- The verified final Random Forest test and third MLflow run are published on
  `origin/main`.
- The verified reusable validation and prediction functions are published on
  `origin/main`.
- The verified Flask API, endpoint tests, and example request are published on
  `origin/main`.
- The verified local prediction UI is published on `origin/main`.
- The verified final error analysis is published on `origin/main`.
- The standalone final model and focused clean demo are published on
  `origin/main`.
