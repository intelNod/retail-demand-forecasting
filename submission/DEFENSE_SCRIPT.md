# 10-minute defense guide

## 1. Problem and goal — about 50 seconds

My project forecasts next-week demand for a specific FOODS product in a
specific store. The user is a retail planner deciding how much stock may be
needed. The model supports that decision; it does not place orders itself.

## 2. Dataset — about 55 seconds

I used the M5 Forecasting — Accuracy dataset. It contains Walmart unit sales,
weekly prices, calendar dates, events, holidays, and SNAP indicators. I kept
the original CSV files unchanged and processed the complete FOODS category:
14,370 product-store series and almost 28 million daily sales values.

## 3. Audit and cleaning — about 65 seconds

I checked file schemas, identifiers, missing values, duplicates, numeric types,
negative and fractional sales, prices, date coverage, and relationships between
files. I retained valid zero-sales weeks and flagged unusual high demand for
review instead of deleting it automatically. I excluded inactive weeks without
a valid price and incomplete weeks, with every count recorded in reports.

## 4. Leakage-safe workflow — about 65 seconds

Time-series order is critical. I split the data chronologically: training first,
then validation, then a final test period. Sales lags and rolling averages use
past weeks only. I used validation to compare methods, froze the selected model,
and opened the test target once for final evaluation. The test result was not
used for another tuning round.

## 5. Experiments and selection — about 60 seconds

The four-week moving average was the strongest simple baseline with validation
MAE 4.517. Linear Regression was worse at 4.766. The controlled Random Forest
reached 4.270, so I selected it. All three finished model stages are recorded in
MLflow, and each saved model was reloaded to verify its metric.

## 6. Final result — about 55 seconds

After selection, I retrained the fixed Random Forest on training plus validation
data and tested it on 57,480 rows. Test MAE was 4.418 compared with baseline MAE
4.787. That is a 7.72% improvement. Test RMSE was 9.133.

## 7. Error analysis — about 65 seconds

The average result hides important differences. 76.08% of predictions are
within five units, but high-demand rows have MAE 12.33 and average
underprediction of 5.10 units. `WI_2` is the weakest store slice and `FOODS_3`
the weakest department slice. This is why high-volume forecasts need human
review.

## 8. Demonstration — about 70 seconds

I can open `demo.ipynb` in Colab and run all cells. It loads the committed final
model, validates 20 input features, returns a weekly forecast, and shows a clear
error for invalid input. The Flask application exposes the same logic through
`GET /health` and `POST /predict`, and the browser UI uses those endpoints.

## 9. Reproducibility and limits — about 55 seconds

I tested a fresh GitHub clone in a new Python environment. The notebook ran and
all 18 tests passed without raw data, processed data, or a local MLflow database.
The main limitation is transferability: the model was trained on 2011-2016 US
Walmart FOODS data, so it must be retrained and revalidated before use in
Uzbekistan, another retailer, or current market conditions.

## 10. Closing — about 30 seconds

The project delivers a complete, leakage-safe workflow and a working prediction
demo. The Random Forest beats the baseline, but the error analysis also shows
where a planner should be cautious. My conclusion is to use it as transparent
decision support with human review, not as an autonomous ordering system.

## Short answers for likely questions

- **Why weekly instead of daily?** Weekly aggregation reduces daily noise and
  keeps the project computationally realistic while preserving useful demand,
  price, event, and SNAP signals.
- **Why Random Forest?** It captured nonlinear demand patterns and beat both the
  baseline and Linear Regression on the untouched validation period.
- **Why MAE?** It is easy to explain as the average absolute error in units and
  is less dominated by extreme errors than RMSE. I still report RMSE.
- **How did you prevent leakage?** Chronological splits; past-only lags and
  rolling statistics; validation-only selection; one-time final test.
- **Can it work in Uzbekistan?** Not without local data, local holidays,
  retraining, a new chronological test, and comparison with a local baseline.
- **What would you improve next?** Prediction intervals, local retailer data,
  richer promotion/stock information, and monitored retraining.
