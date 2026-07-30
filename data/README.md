# Data folders

The project uses three main data stages. This keeps the original M5 files
separate from temporary and cleaned results.

## `raw`

Original downloaded M5 files:

- `calendar.csv` — dates, events, holidays, and SNAP indicators;
- `sales_train_evaluation.csv` — complete sales history used for evaluation;
- `sales_train_validation.csv` — shorter sales history used for validation;
- `sell_prices.csv` — weekly product prices by store;
- `sample_submission.csv` — required forecast submission format.

Files in this folder are read-only inputs. The project does not overwrite them.

## `interim`

Temporary files created during data audit and transformation. They can be
recreated from `raw` by running the project notebooks or scripts.

## `processed`

Full cleaned files that pass the documented data-quality checks. Model training
uses data from this folder.

## Git and reproducibility

The CSV files are kept locally and excluded from Git because several files are
larger than GitHub's regular file-size limit. Git tracks the folder structure,
code, notebooks, audit reports, cleaning reports, and instructions needed to
repeat every step.

The old `synthetic` folder contains temporary development outputs and is not the
main dataset for the full M5 audit.
