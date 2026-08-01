# Data folders

The project uses three main data stages. This keeps the original M5 files
separate from temporary and cleaned results.

## Source and permitted use

The source is the **M5 Forecasting - Accuracy** competition dataset published
on Kaggle by the University of Nicosia with Walmart sales data:

https://www.kaggle.com/competitions/m5-forecasting-accuracy/data

Download requires a Kaggle account and acceptance of the competition rules.
This repository does not redistribute the source CSV files and does not claim
that they have an open-source license. Anyone reproducing the full workflow is
responsible for following Kaggle's competition and data-use terms. The dataset
is used here only for an educational capstone.

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

No synthetic dataset is used by the published modeling workflow. The audit,
cleaning, EDA, features, training, and evaluation all use the M5 source files.
