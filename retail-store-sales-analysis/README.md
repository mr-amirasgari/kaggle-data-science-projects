# Retail Store Sales Analysis

An end-to-end retail analytics and regression project that explores store performance, cleans inconsistent categories, engineers revenue-efficiency metrics, and predicts store revenue with leakage-safe machine-learning pipelines.

## 🌐 Live Demo

👉 [Open Retail Store Sales Dashboard](https://mr-amirasgari.github.io/kaggle-data-science-projects/retail-store-sales-analysis/)

## Project Overview

The dataset contains **118 stores** with information about store area, property arrangement, store type, old/new status, checkout capacity, and revenue. The project combines business-oriented EDA with a stronger regression workflow than the original two-feature baseline.

The final workflow includes:

- data-quality checks and categorical label cleaning;
- revenue conversion and `RevToArea` feature engineering;
- store and category performance analysis;
- leakage-safe preprocessing with `ColumnTransformer` and `Pipeline`;
- numerical median imputation inside training folds;
- one-hot encoding of categorical variables;
- 5-fold cross-validation across multiple regression models;
- MAE, RMSE, and R² evaluation;
- residual analysis and coefficient inspection;
- an interactive React dashboard with a portfolio revenue estimator.

## Dataset

Kaggle dataset: `mramirasgari/stores`

| Feature | Description |
|---|---|
| `Store Number` | Store identifier |
| `AreaStore` | Store area |
| `Property` | Property/ownership arrangement |
| `Type` | Express, Extra, or Hyper |
| `Old/New` | Store age category |
| `Checkout Number` | Number of checkout counters |
| `Revenue` | Recorded store revenue |

### Data-quality findings

- **118 rows × 7 original columns**
- **12 missing values** in `Checkout Number`
- **0 duplicated rows**
- trailing whitespace in `Property` and `Old/New`
- `Revenue` originally stored as formatted text

## Business Insights

- Total recorded revenue: **2,713,770,000**
- Median store revenue: **13,584,750**
- Highest-revenue store: **Store 44 — 100,083,000**
- Highest revenue per area: **Store 53 — 110,817.07**
- Hyper stores lead in total and average revenue.
- Express stores have the highest median revenue per unit of area among the three store types.

`RevToArea = Revenue / AreaStore` is used only for business analysis. It is intentionally excluded from the prediction model because it is derived from the target.

## Revenue Modeling

The model uses:

- `AreaStore`
- `Checkout Number`
- `Property`
- `Type`
- `Old/New`

The preprocessing pipeline performs median imputation and standardization for numerical variables and one-hot encoding for categorical variables. All learned preprocessing steps are fit inside each training fold.

### 5-Fold Cross-Validation

| Model | CV MAE | CV RMSE | Mean CV R² |
|---|---:|---:|---:|
| Ridge Regression | **8.69M** | **12.06M** | **0.572** |
| Extra Trees | 8.79M | 12.58M | 0.546 |
| Linear Regression | 8.58M | 12.25M | 0.545 |

Ridge Regression was selected by mean cross-validated R².

### Fixed Holdout Snapshot

Using an 80/20 split with `random_state=42`, the selected Ridge pipeline achieved:

- **MAE:** 8.98M
- **RMSE:** 14.14M
- **R²:** 0.394

The holdout split is reported as a concrete snapshot; model selection is based on cross-validation because the dataset is small.

## Interactive Dashboard

The dashboard includes:

- **Overview** — portfolio KPIs and category revenue summaries
- **Store Explorer** — searchable/filterable view of all 118 stores
- **Performance** — revenue vs. area, top stores, and efficiency analysis
- **Revenue Model** — model comparison plus an interactive Ridge-based revenue estimator
- **About** — methodology, caveats, and project links

The browser estimator uses parameters from the fitted Ridge model and is intended as an educational portfolio demo, not a production forecasting system.

## Repository Structure

```text
retail-store-sales-analysis/
├── data/
│   └── Stores.csv
├── src/
│   ├── components/
│   ├── data/
│   ├── lib/
│   └── test/
├── retail-store-sales-analysis.ipynb
├── README.md
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Run the Dashboard

```bash
npm install
npm test
npm run build
npm run dev
```

## Notebook Dependencies

```bash
pip install pandas numpy matplotlib scikit-learn jupyter
```

The notebook automatically uses the Kaggle input path when available and falls back to `data/Stores.csv` locally.

## Technologies

Python, Pandas, NumPy, Matplotlib, scikit-learn, Jupyter, Kaggle, React, TypeScript, Vite, Tailwind CSS, Recharts, Vitest, GitHub Pages.

## Limitations

- Only 118 stores are available.
- The dataset has no time dimension, location data, customer traffic, promotion history, or product-mix variables.
- Revenue relationships are observational and should not be interpreted causally.
- Cross-validation estimates still have noticeable fold-to-fold variation because the sample is small.

## Source Code

This folder is part of the portfolio repository:

`mr-amirasgari/kaggle-data-science-projects`
