"""Load the final MLflow model and make reusable demand predictions."""

from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path
from typing import Any, Mapping

import mlflow
import mlflow.sklearn
import numpy as np
import pandas as pd

from src.validation import FEATURE_NAMES, validate_prediction_input


def project_root() -> Path:
    return Path(__file__).resolve().parents[1]


@lru_cache(maxsize=1)
def load_final_model(root: str | None = None) -> Any:
    """Load the final model from an override URI or the local MLflow run."""

    model_uri_override = os.getenv("RETAIL_MODEL_URI")
    if model_uri_override:
        return mlflow.sklearn.load_model(model_uri_override)

    root_path = Path(root).resolve() if root else project_root()
    standalone_model_path = root_path / "models" / "final_model"
    summary_path = root_path / "reports" / "mlflow_final_model_run.csv"
    database_path = root_path / "mlflow.db"

    if (standalone_model_path / "MLmodel").exists():
        return mlflow.sklearn.load_model(str(standalone_model_path))

    if not summary_path.exists():
        raise FileNotFoundError(
            "Final model artifact and run summary were not found."
        )
    if not database_path.exists():
        raise FileNotFoundError(
            "Local MLflow database was not found. Run notebook 11 to recreate it."
        )

    summary = pd.read_csv(summary_path)
    if len(summary) != 1 or not summary.loc[0, "run_id"]:
        raise RuntimeError("Final model summary must contain exactly one run_id.")

    tracking_uri = "sqlite:///" + database_path.as_posix()
    mlflow.set_tracking_uri(tracking_uri)
    return mlflow.sklearn.load_model(f"runs:/{summary.loc[0, 'run_id']}/model")


def predict_weekly_demand(
    payload: Mapping[str, Any], model: Any | None = None
) -> float:
    """Validate one feature object and return a non-negative weekly forecast."""

    validated = validate_prediction_input(payload)
    input_frame = pd.DataFrame(
        [[validated[field] for field in FEATURE_NAMES]], columns=FEATURE_NAMES
    ).astype("float32")
    fitted_model = model if model is not None else load_final_model()
    prediction = np.asarray(fitted_model.predict(input_frame), dtype="float64")

    if prediction.shape != (1,) or not np.isfinite(prediction[0]):
        raise RuntimeError("Model returned an invalid prediction.")

    return max(0.0, float(prediction[0]))
