"""Flask REST API for weekly retail-demand predictions."""

from __future__ import annotations

from typing import Any

from flask import Flask, jsonify, render_template, request

from src.inference import load_final_model, predict_weekly_demand
from src.validation import InputValidationError


def create_app(model: Any | None = None) -> Flask:
    """Create the API; an injected model keeps automated tests lightweight."""

    app = Flask(__name__)
    app.config["PREDICTION_MODEL"] = model

    def get_model() -> Any:
        if app.config["PREDICTION_MODEL"] is None:
            app.config["PREDICTION_MODEL"] = load_final_model()
        return app.config["PREDICTION_MODEL"]

    @app.get("/")
    def index():
        return render_template("index.html")

    @app.get("/api")
    def api_index():
        return jsonify(
            {
                "service": "retail-demand-forecasting",
                "endpoints": ["GET /health", "POST /predict"],
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
