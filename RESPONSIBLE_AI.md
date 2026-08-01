# Responsible use and model limitations

## Intended use

This model is a course demonstration that estimates next-week unit demand for
an existing FOODS product in an existing store. Its intended user is a retail
planner who may use the forecast as one input to a stock-planning decision.
It is decision support, not an automatic ordering system.

## Data scope

- The training data covers ten Walmart stores in California, Texas, and
  Wisconsin from 2011 to 2016.
- The final model covers the M5 FOODS category only.
- Every prediction needs eight weeks of prior product-store sales, recent
  prices, and known calendar, event, and SNAP inputs.
- The data is aggregated retail activity and contains no customer names or
  other direct personal identifiers.

## Known limitations

- The model has not been validated for Uzbekistan, another retailer, a new
  product, or a store outside the M5 data.
- Old US retail patterns may not represent current behavior, local holidays,
  inflation, assortment changes, promotions, or supply constraints.
- A sales value of zero may mean no demand, no stock, or no sale; the source
  data does not always distinguish these causes.
- Final test MAE is 4.42 units, but errors are not uniform. High-demand rows
  (21+ actual units) have MAE 12.33 and are underpredicted by 5.10 units on
  average. `WI_2` and `FOODS_3` are the weakest reported slices.
- The API validates the input format, but a structurally valid input may still
  be unrealistic or outside the training distribution.

## Possible harm and safeguards

An underprediction can contribute to a stockout; an overprediction can create
excess inventory and waste. A planner should review high-volume products,
large week-to-week changes, special events, and forecasts for weak slices.
The model should not place orders or make financial commitments by itself.

Before use with another retailer or newer data, repeat the audit, adapt local
holidays and programs, recreate chronological splits, retrain, and compare the
model against a simple local baseline. Monitor error by store, department, and
demand band after deployment. Stop or revise use if those errors materially
worsen.

## Transparency

The exact features, split rules, experiments, metrics, test error analysis,
and a standalone final model are included in this repository. Predictions are
point estimates and do not provide confidence intervals.
