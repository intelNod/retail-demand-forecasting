"""Flask REST API for weekly retail-demand predictions."""

from __future__ import annotations

import io
import json
import uuid
from typing import Any

import numpy as np
import pandas as pd
from flask import Flask, jsonify, render_template, request, send_file, send_from_directory
from openpyxl.styles import Font, PatternFill

from src.inference import (
    load_final_model,
    predict_weekly_demand,
    predict_weekly_demand_batch,
)
from src.validation import FEATURE_NAMES, InputValidationError


MAX_BATCH_ROWS = 5_000
DEMO_SHEET_NAME = "Demo Input"
ACTUAL_COLUMN = "actual_units_sold"


def _results_workbook(result_frame: pd.DataFrame, metrics: dict[str, Any]) -> bytes:
    """Create a downloadable Excel workbook for the rehearsal result."""

    output = io.BytesIO()
    summary = pd.DataFrame(
        {
            "metric": ["rows", "mae", "mean_actual", "mean_prediction"],
            "value": [
                metrics["rows"],
                metrics.get("mae"),
                metrics.get("mean_actual"),
                metrics["mean_prediction"],
            ],
        }
    )
    with pd.ExcelWriter(output, engine="openpyxl") as writer:
        summary.to_excel(writer, sheet_name="Summary", index=False)
        result_frame.to_excel(writer, sheet_name="Predictions", index=False)
        for sheet in writer.book.worksheets:
            sheet.freeze_panes = "A2"
            sheet.auto_filter.ref = sheet.dimensions
            for cell in sheet[1]:
                cell.font = Font(bold=True, color="FFFFFF")
                cell.fill = PatternFill(fill_type="solid", fgColor="176B87")
            for column in sheet.columns:
                width = min(max(len(str(cell.value or "")) for cell in column) + 2, 24)
                sheet.column_dimensions[column[0].column_letter].width = width
    return output.getvalue()


def create_app(model: Any | None = None) -> Flask:
    """Create the API; an injected model keeps automated tests lightweight."""

    app = Flask(__name__)
    app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024
    app.config["PREDICTION_MODEL"] = model
    app.config["RESULT_DOWNLOADS"] = {}

    def get_model() -> Any:
        if app.config["PREDICTION_MODEL"] is None:
            app.config["PREDICTION_MODEL"] = load_final_model()
        return app.config["PREDICTION_MODEL"]

    @app.get("/")
    def index():
        return render_template("index.html")

    @app.get("/showcase")
    def showcase():
        return send_from_directory(
            app.root_path + "/../rehearsal/showcase", "index.html"
        )

    @app.get("/rehearsal/demo-sales-features.xlsx")
    def rehearsal_workbook():
        return send_from_directory(
            app.root_path + "/../rehearsal",
            "demo_sales_features.xlsx",
            as_attachment=True,
        )

    @app.get("/api")
    def api_index():
        return jsonify(
            {
                "service": "retail-demand-forecasting",
                "endpoints": [
                    "GET /health",
                    "POST /predict",
                    "POST /predict-file",
                    "GET /download/<token>",
                    "GET /rehearsal/demo-sales-features.xlsx",
                ],
            }
        )

    @app.get("/health")
    def health():
        try:
            get_model()
        except (FileNotFoundError, RuntimeError) as error:
            return jsonify({"status": "error", "model_loaded": False, "error": str(error)}), 503
        return jsonify(
            {
                "status": "ok",
                "model_loaded": True,
                "model": "random_forest_final",
            }
        )

    @app.post("/predict-file")
    def predict_file():
        uploaded = request.files.get("file")
        if uploaded is None or not uploaded.filename:
            return jsonify({"error": "Choose an .xlsx workbook first."}), 400
        if not uploaded.filename.lower().endswith(".xlsx"):
            return jsonify({"error": "Only .xlsx workbooks are supported."}), 400

        try:
            frame = pd.read_excel(uploaded, sheet_name=DEMO_SHEET_NAME)
        except ValueError:
            return jsonify(
                {"error": f"Workbook must contain a '{DEMO_SHEET_NAME}' sheet."}
            ), 400
        except Exception as error:
            return jsonify({"error": f"Workbook could not be read: {error}"}), 400

        if frame.empty:
            return jsonify({"error": "The Demo Input sheet contains no data rows."}), 400
        if len(frame) > MAX_BATCH_ROWS:
            return jsonify(
                {"error": f"Upload at most {MAX_BATCH_ROWS:,} rows for the demo."}
            ), 400
        missing = [field for field in FEATURE_NAMES if field not in frame.columns]
        if missing:
            return jsonify(
                {"error": "Missing required feature columns: " + ", ".join(missing)}
            ), 400

        try:
            predictions = predict_weekly_demand_batch(
                frame[list(FEATURE_NAMES)].to_dict(orient="records"), model=get_model()
            )
        except InputValidationError as error:
            return jsonify({"error": str(error)}), 400
        except (FileNotFoundError, RuntimeError) as error:
            return jsonify({"error": str(error)}), 503

        result = frame.copy()
        result["predicted_units_sold"] = np.round(predictions, 4)
        metrics: dict[str, Any] = {
            "rows": int(len(result)),
            "mean_prediction": round(float(predictions.mean()), 4),
        }
        if ACTUAL_COLUMN in result.columns:
            actual = pd.to_numeric(result[ACTUAL_COLUMN], errors="coerce")
            if actual.isna().any() or (actual < 0).any():
                return jsonify(
                    {"error": f"'{ACTUAL_COLUMN}' must contain non-negative numbers."}
                ), 400
            result["absolute_error"] = np.abs(actual - predictions).round(4)
            metrics.update(
                {
                    "mae": round(float(result["absolute_error"].mean()), 4),
                    "mean_actual": round(float(actual.mean()), 4),
                }
            )

        token = uuid.uuid4().hex
        downloads = app.config["RESULT_DOWNLOADS"]
        if len(downloads) >= 5:
            downloads.pop(next(iter(downloads)))
        downloads[token] = _results_workbook(result, metrics)

        preview_columns = [
            column
            for column in (
                "week_start",
                "item_id",
                "store_id",
                ACTUAL_COLUMN,
                "predicted_units_sold",
                "absolute_error",
            )
            if column in result.columns
        ]
        preview = json.loads(
            result[preview_columns].head(20).to_json(orient="records", date_format="iso")
        )
        return jsonify(
            {
                "metrics": metrics,
                "preview": preview,
                "preview_columns": preview_columns,
                "download_url": f"/download/{token}",
                "model": "random_forest_final",
            }
        )

    @app.get("/download/<token>")
    def download(token: str):
        content = app.config["RESULT_DOWNLOADS"].get(token)
        if content is None:
            return jsonify({"error": "Result file is unavailable or expired."}), 404
        return send_file(
            io.BytesIO(content),
            as_attachment=True,
            download_name="prediction_results.xlsx",
            mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )

    @app.post("/predict")
    def predict():
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json."}), 415

        payload = request.get_json(silent=True)
        if not isinstance(payload, dict):
            return jsonify({"error": "Request body must be a JSON object."}), 400

        try:
            prediction = predict_weekly_demand(payload, model=get_model())
        except InputValidationError as error:
            return jsonify({"error": str(error)}), 400
        except (FileNotFoundError, RuntimeError) as error:
            return jsonify({"error": str(error)}), 503

        return jsonify(
            {
                "predicted_weekly_units": round(prediction, 4),
                "model": "random_forest_final",
                "unit": "units_per_week",
            }
        )

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
