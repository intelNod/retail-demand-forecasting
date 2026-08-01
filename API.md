# Prediction API

The Flask service exposes the final Random Forest through two small REST
endpoints. Run commands from the repository root.

## Prerequisites

1. Install `requirements.txt`.
2. Run notebooks 01–11 in order. Notebook 11 creates the local `mlflow.db` and
   final model artifact required by the API.

## Start the server

```powershell
.\.venv\Scripts\python.exe -m src.app
```

The development server listens on `http://127.0.0.1:5000`.

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
  "predicted_weekly_units": 10.8432,
  "unit": "units_per_week"
}
```

The displayed number above only illustrates the response format. The real
value is calculated by the locally restored final model.

## Error behavior

The API returns:

- `400` for missing, unknown, inconsistent, or invalid feature values;
- `415` when `Content-Type` is not `application/json`;
- `503` when the final local model cannot be loaded or returns an invalid
  result.

The server is a local course demonstration. Flask's built-in development server
is not intended as a public production deployment.

## Run automated tests

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```
