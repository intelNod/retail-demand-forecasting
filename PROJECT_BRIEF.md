# RET-01 — Product Demand Forecasting

## 1. Project Identification

- **Field:** RetailTech
- **Track:** Field-Based Scenario
- **Student:** Nosirov Nodir
- **Group:** Tulpar
- **Date:** 27.07.2026
- **Project title:** Retail Demand Forecasting
- **Mentor approval status:** Pending

## 2. Project Summary

The goal of this project is to forecast short-term product demand for retail
stores. The model will use historical sales together with calendar events,
holidays, SNAP indicators, and weekly product prices. The result should help a
retail planner estimate how many units may be needed for the next week.

The project will cover the complete beginner-level machine learning workflow:
data audit, cleaning, exploratory analysis, leakage-safe splitting, baseline,
model comparison, experiment tracking, final evaluation, and a reproducible
Colab demonstration.

## 3. Business Problem

Retail stores need to order products before future demand is known. Ordering too
little can lead to unavailable products and lost sales. Ordering too much can
increase storage costs and leave unsold stock.

A simple historical average may not react to seasonal changes, holidays, price
changes, or differences between stores and products. The requested solution is
a repeatable forecast that supports a planner. It will not place orders
automatically.

## 4. Dataset

The selected source is the public dataset from the **M5 Forecasting — Accuracy**
competition:

<https://www.kaggle.com/competitions/m5-forecasting-accuracy/data>

The downloaded dataset contains anonymized daily unit sales for Walmart
products sold in ten stores across three US states. The project will use the
following original files:

- `calendar.csv` — dates, events, holidays, SNAP indicators, and week IDs;
- `sales_train_evaluation.csv` — sales history for 30,490 store-product series;
- `sales_train_validation.csv` — the shorter validation version of the history;
- `sell_prices.csv` — weekly prices for products in each store;
- `sample_submission.csv` — the required 28-day forecast layout.

The local files have been checked after download. Their copies in `data/raw`
match the downloaded files by SHA-256. Raw files are never overwritten.

## 5. Unit of Analysis and Target

In the original sales table, one row represents one product in one store and
the columns `d_1`, `d_2`, and so on contain daily sales.

For modeling, the wide sales table will be converted into a time-based table and
joined with calendar and price information. The planned target is:

> total units sold for a store-product combination during the next seven days.

The complete source files will be audited. The modeling scope will be selected
after memory and runtime checks in Colab. If the complete transformed table is
too large, the project will use a documented business segment such as the full
`FOODS` category rather than a tiny random sample.

## 6. Information Available at Prediction Time

Only information known before the forecast week may be used:

- store, state, department, category, and product identifiers;
- calendar information for the forecast dates;
- known holidays and events;
- SNAP indicators;
- prices available for the relevant store and week;
- lagged sales and rolling statistics calculated only from past sales.

Future sales must not be used to construct input features.

## 7. Data Audit and Cleaning

The audit will inspect all source files before modeling. It will include:

- file shape, columns, data types, and memory usage;
- date coverage and chronological order;
- missing and invalid values;
- duplicated rows and duplicated business keys;
- negative or impossible prices and sales;
- unusual values and outliers;
- category and identifier consistency;
- matches between sales, calendar, and price keys;
- zero-sales frequency and possible intermittent demand;
- comparison of validation and evaluation sales histories.

The notebook will show how each check was performed with Pandas and how important
findings were visualized. Cleaning will be implemented as reproducible code.
Original files will remain in `data/raw`; cleaned results will be written to
`data/processed`, and the changes will be recorded in a cleaning report.

Outliers will not be deleted automatically. A large value may represent a real
holiday or promotion peak. The project will first compare the value with its
date, event, product, store, and nearby sales before choosing a treatment.

## 8. Leakage Prevention and Data Splitting

Random splitting is not suitable for this forecasting task because it would mix
past and future observations.

The split will preserve time order:

1. **Training period** — earlier dates used to fit models.
2. **Validation period** — later dates used to compare models and settings.
3. **Test period** — a more recent untouched period used once for final
   evaluation.
4. **Demonstration period** — the latest available input window used to show the
   final prediction workflow.

Exact dates will be selected after the full audit confirms the available range.
All lag and rolling features will be created separately with respect to time so
that no future target value enters the training data.

## 9. Baseline and Models

The main baseline will predict next week's demand from the average of the
previous four complete weeks for the same store-product combination. A
previous-week forecast may be included as a second naive reference.

The baseline will be compared with at least two understandable regression
models covered by the course. Initial candidates are:

- Linear Regression;
- Random Forest Regressor or another course-appropriate tree model.

The final choice will depend on verified runtime, accuracy, and the ability to
explain the model during the defense. Experiments and parameters will be
recorded with MLflow.

## 10. Evaluation

The primary metric will be **Mean Absolute Error (MAE)** because it is easy to
explain as the average error in sold units. **Root Mean Squared Error (RMSE)**
will be reported as a supporting metric because it gives more weight to large
errors.

The model must be compared with the baseline on later, unseen dates. Results
will also be reviewed across stores, categories, and demand levels so that one
overall score does not hide weak performance for particular groups.

No target accuracy will be invented before the baseline has been measured.
Success means that the selected model improves on the baseline and that the
whole evaluation can be reproduced.

## 11. Flexibility and Testing on Other Data

Data loading, validation, cleaning, feature creation, training, and prediction
will be separated into reusable steps. The final workflow will check required
columns and data types before running.

Flexibility will be demonstrated by applying the same validation and
preprocessing logic to a held-out period and, where practical, to a different
store or product group. Compatibility with another dataset will require a
documented mapping to the same fields; the project will not claim that an
unrelated dataset works without a real test.

## 12. Expected Inference

The inference workflow will receive:

- store and product identifiers;
- a forecast start date;
- recent sales history;
- required calendar and price information.

It will return the predicted seven-day demand in units, the forecast period,
and a note that the value is a planning estimate rather than an automatic order.

## 13. Deliverables

- approved Project Brief;
- GitHub repository with meaningful verified commits;
- documented dataset source and folder structure;
- Colab-compatible notebooks for audit, cleaning, EDA, and modeling;
- full data-quality and cleaning reports;
- leakage-safe training, validation, test, and demonstration split;
- baseline and at least two model experiments;
- MLflow experiment records;
- final evaluation and error analysis;
- saved model or reproducible training workflow;
- REST/Flask inference demonstration if required by the course criteria;
- updated README and reproducibility instructions;
- ten-minute defense presentation.

## 14. Acceptance Criteria

The project will be complete when:

- another person can obtain the data and reproduce the documented workflow;
- every source file is checked before modeling;
- raw and processed data are kept separate;
- training and evaluation preserve chronological order;
- features use only information available at prediction time;
- the final model is compared with a simple baseline;
- the model is evaluated on an untouched test period;
- important cleaning decisions and limitations are explained;
- the final prediction runs without hidden notebook state;
- the student can explain the data, code, metrics, and results.

## 15. Risks and Limitations

- Recorded sales may be limited by product availability and may not equal true
  customer demand.
- M5 describes US Walmart stores, so results cannot be presented as a direct
  forecast for Uzbekistan without local data and retraining.
- Some products have many zero-sales days.
- Large transformations may exceed free Colab memory.
- Prices and events may affect different products in different ways.
- New products and stores may not have enough historical information.
- Demand patterns may change after the period covered by the dataset.

## 16. Scope

### In scope

- full audit of all downloaded M5 source files;
- weekly store-product demand forecasting;
- calendar, event, SNAP, price, and historical sales features;
- reproducible Pandas cleaning and preprocessing;
- time-based evaluation;
- course-appropriate models and MLflow;
- Colab-first workflow and final demonstration.

### Out of scope

- automatic inventory ordering;
- real-time production infrastructure;
- personal customer information;
- direct claims about Uzbekistan without local retail data;
- enterprise-scale deployment;
- unrelated products such as fuel or crude oil;
- advanced deep learning unless the required course workflow is already
  complete and resources allow it.

## 17. Mentor Review

- **Status:** Awaiting mentor approval
- **Mentor:** Pending
- **Review date:** Pending
- **Requested revisions:** Pending
