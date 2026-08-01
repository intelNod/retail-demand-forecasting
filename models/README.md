# Final model artifact

`final_model/` is the MLflow sklearn artifact produced by notebook 11 after
Random Forest was selected on validation and retrained on train plus validation.

The repository copy makes the short demo, reusable inference function, Flask
API, and UI work in a clean clone without a hidden local MLflow database.

Key facts:

- model type: controlled `RandomForestRegressor`;
- trees: 40;
- model inputs: 20 numeric leakage-safe features;
- training rows: 2,946,422 train-plus-validation rows;
- final test MAE: 4.417919;
- final test RMSE: 9.132909;
- serialization: MLflow sklearn flavor using `skops`;
- `model.skops` size: 20,523,283 bytes;
- `model.skops` SHA-256:
  `64d3c98349b633e03d9b8af8d1b93bfcda2f5606d7cc76b29ad48a02ef22f297`.

The original MLflow run ID and tested dependency versions remain recorded in
`reports/mlflow_final_model_run.csv`. Notebook 11 can recreate both the local
MLflow database and this model from the ignored processed data.
