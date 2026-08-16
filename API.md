# Prediction API

The Flask service exposes the final Random Forest through a local browser UI,
a batch Excel rehearsal flow, and small REST endpoints. Run commands from the
repository root.

## Prerequisites

1. Clone or download the repository.
2. Install `requirements.txt`. The final inference model is already stored in
   `models/final_model/`; no dataset or local MLflow database is required.

## Start the server

```powershell
.\.venv\Scripts\python.exe -m src.app
```

The development server listens on `http://127.0.0.1:5000`.

Open that address in a browser to use the prediction form. A machine-readable
service description is available at `GET /api`.

The custom project showcase is available at
`http://127.0.0.1:5000/showcase`.

## Excel batch prediction

Use `rehearsal/demo_sales_features.xlsx` in the `Predict an Excel batch`
section of the browser UI. The workbook must contain a `Demo Input` sheet and
all 20 feature columns. Up to 5,000 rows and a 10 MB `.xlsx` file are accepted.

Optional identifier columns are preserved in the result. If
`actual_units_sold` is present, it is excluded from model inputs and used only
after prediction to calculate `absolute_error` and MAE. The result can be
downloaded as `prediction_results.xlsx`.

## Health check

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:5000/health
```

Successful response:

```json
{
  "model": "random_forest_final",
  "model_loaded": true,
  "status": "ok"
}
```

## Prediction request

The example file contains all 20 required numeric fields:

```powershell
$body = Get-Content -Raw examples\predict_request.json
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:5000/predict -ContentType application/json -Body $body
```

Example response:

```json
{
  "model": "random_forest_final",
  "predicted_weekly_units": 10.4885,
  "unit": "units_per_week"
}
```

The displayed value is the verified output of the committed example request
and standalone final model. Small display rounding may be applied by clients.

## Error behavior

The API returns:

- `400` for missing, unknown, inconsistent, or invalid feature values;
- `400` for an unreadable Excel file, missing `Demo Input` sheet, missing
  feature columns, invalid actual sales, or too many rows;
- `415` when `Content-Type` is not `application/json`;
- `503` when the final local model cannot be loaded or returns an invalid
  result.

The server is a local course demonstration. Flask's built-in development server
is not intended as a public production deployment.

## Run automated tests

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

The current verified suite contains 26 tests.
