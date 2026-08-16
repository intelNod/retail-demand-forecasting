# Defense Pitch Outline

## Five-minute route

This is the short EXTC4 defense route. The showcase is navigation, not a script.

| Time | Block | Exact line and evidence route |
|---|---|---|
| 0:00-0:30 | Opening | "My name is Nodir Nosirov. My project forecasts next-week demand for one FOODS product in one store. It helps a retail planner review how much stock may be needed; it does not place orders automatically." Show the showcase title and `PROJECT_BRIEF.md` sections 2-3. |
| 0:30-1:15 | User and ML task | "The input is 20 values already known before the forecast week: past sales, rolling sales statistics, price, calendar, event, and SNAP features. The output is predicted weekly units sold." Show `PROJECT_BRIEF.md` sections 5-6, then the column names in `rehearsal/demo_sales_features.xlsx`. |
| 1:15-2:10 | Data and approach | "I used the M5 Walmart dataset and processed the complete FOODS category. I audited and cleaned the source tables, changed daily sales into a weekly modeling table, and used chronological train, validation, and test periods. I compared a previous-four-week baseline, Linear Regression, and Random Forest. Random Forest was selected using validation MAE." Show `reports/split_summary.csv`, `reports/leakage_checks.csv`, and `reports/random_forest_metrics_validation.csv`. |
| 2:10-3:10 | Results and weakness | "On 57,480 unseen test rows, Random Forest achieved MAE 4.4179, compared with 4.7874 for the baseline, a 7.72 percent improvement. The main weakness is high demand: for actual sales of 21 or more units, MAE is 12.33 and the model underpredicts by 5.10 units on average. Therefore, high-volume forecasts require human review." Show `reports/final_test_metrics.csv` and the `high_21_plus` row in `reports/error_analysis_demand_bands.csv`. |
| 3:10-4:20 | Showcase and live demo | Open `rehearsal/showcase/index.html`, choose the live demo, upload `rehearsal/demo_sales_features.xlsx`, and show the prediction table. Explain that the Flask UI validates the same 20 features used by `src/inference.py`. If the browser route is unavailable, run all cells in `demo.ipynb` and show the verified 10.4885 example prediction and invalid-input rejection. |
| 4:20-5:00 | Close and question | "The project delivers a leakage-safe forecasting workflow and a reproducible prediction route. It performs better than the baseline, but it was trained on 2011-2016 US Walmart data and must be retrained and tested before use in Uzbekistan. My next improvement is to add local promotion and stock information. I am ready for a question." |

## Demo route

- Showcase entry: `rehearsal/showcase/index.html`
- Local launcher: `rehearsal/start_rehearsal.ps1`
- Live UI entry: `http://127.0.0.1:5000/` after starting the Flask app
- Colab-first fallback: open `demo.ipynb` from GitHub and run all cells
- Real batch input: `rehearsal/demo_sales_features.xlsx`
- Expected-results reference: `rehearsal/expected_prediction_results.xlsx`
- Verified single prediction: `10.4885` for the example in `demo.ipynb`
- Backup rule: a screenshot may support rehearsal, but it does not replace a working demo.

## Rehearsal log

- Actual duration: Pending student timed rehearsal
- Question answered aloud: Pending student rehearsal
- Evidence used: Pending; record the exact path after rehearsal
- Answer weakness or fact to verify: Pending student self-review
- Required revision: Shorten any block that exceeds its assigned time; do not remove the unseen-test result, concrete failure, or live input-to-output path.
