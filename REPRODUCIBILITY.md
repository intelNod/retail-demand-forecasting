# Reproducibility guide

## Fast assessment path

Open [`demo.ipynb`](demo.ipynb) in Google Colab and run all cells. The notebook
clones this public repository when necessary, installs `requirements.txt`,
loads the committed model, makes a valid prediction, and demonstrates rejected
invalid input. The fast demo does not require the M5 CSV files or `mlflow.db`.

Expected valid example result:

```text
predicted_weekly_units: 10.4885
```

## Verified clean-clone result

On 01.08.2026, commit `8c5a5f1` was cloned into a new temporary folder and a
new Python 3.10 virtual environment. All requirements were installed from the
repository. The demo notebook then ran without errors and reproduced 10.4885.
All 18 unit and integration tests also passed. The clone contained no source or
processed CSV data and no local MLflow database.

## Local API and UI

From the repository root on Windows:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
.\.venv\Scripts\python.exe -m src.app
```

Open `http://127.0.0.1:5000`. See [`API.md`](API.md) for endpoint examples.

## Full data and training path

1. Accept the Kaggle competition terms and place the five named source files
   in `data/raw/` as described in [`data/README.md`](data/README.md).
2. Confirm their SHA-256 values against `reports/data_file_inventory.csv`.
3. Run notebooks `01` through `10` in order. The test target must remain unused
   during model selection.
4. Run notebook `11` once with the selected Random Forest configuration.
5. Run notebook `12` for frozen-model error analysis; do not tune after seeing
   the final test result.

The large source, interim, and processed files are deliberately excluded from
Git. The notebooks regenerate them without overwriting the original files.

## Expected final evidence

- train + validation rows: 2,946,422;
- final test rows: 57,480;
- final Random Forest test MAE: 4.417919;
- four-week-mean baseline test MAE: 4.787413;
- relative MAE improvement: 7.72%;
- committed model SHA-256:
  `64d3c98349b633e03d9b8af8d1b93bfcda2f5606d7cc76b29ad48a02ef22f297`.
