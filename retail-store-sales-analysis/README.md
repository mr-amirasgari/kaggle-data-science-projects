# Retail Store Sales Analysis

A data analysis and introductory machine learning project that explores retail store characteristics, cleans the dataset, creates performance indicators, and predicts store revenue using linear regression.

## Project Overview

This project analyzes a retail store dataset containing information about store size, property status, store type, age category, checkout capacity, and revenue.

The workflow includes:

- Data loading and inspection
- Missing-value and duplicate checks
- Data cleaning and type conversion
- Feature engineering
- Exploratory data analysis
- Store-level performance comparisons
- Revenue prediction with linear regression
- Model evaluation and coefficient interpretation

## Dataset

The notebook uses the Kaggle dataset:

```text
mramirasgari/stores
```

The original dataset contains **118 stores** and **7 columns**.

| Feature | Description |
|---|---|
| `Store Number` | Unique identifier for each store |
| `AreaStore` | Store area |
| `Property` | Property or ownership arrangement |
| `Type` | Store format, such as Express, Extra, or Hyper |
| `Old/New` | Whether the store is categorized as old or new |
| `Checkout Number` | Number of checkout counters |
| `Revenue` | Store revenue |

## Data Quality Checks

The initial inspection found:

- **118 rows**
- **7 original columns**
- **12 missing values** in `Checkout Number`
- **No duplicated rows**
- `Revenue` initially stored as text because it contained comma separators

The categorical columns also contain formatting inconsistencies such as extra spaces in some labels. Standardizing these values would improve future analysis.

## Data Cleaning

The following cleaning steps were applied:

### Revenue Conversion

Comma separators were removed from `Revenue`, and the column was converted from text to a numeric data type.

### Missing-Value Treatment

Missing values in `Checkout Number` were filled with its median value:

```text
Median checkout count = 4
```

### Store Index

`Store Number` was set as the DataFrame index to make store-level lookup and comparison easier.

## Feature Engineering

A new performance metric called `RevToArea` was created:

```text
RevToArea = Revenue / AreaStore
```

This feature measures the amount of revenue generated per unit of store area and allows stores of different sizes to be compared more fairly.

## Exploratory Data Analysis

The notebook includes:

- Numerical and categorical descriptive statistics
- Distribution of store types
- Revenue distribution with a histogram and KDE curve
- Comparison of selected store areas
- Property-category frequency analysis
- Identification of the store with the highest revenue per unit of area
- Ranking functions for finding the highest-revenue stores within a selected group

## Selected Findings

### Store Area Comparison

- Store 5 area: **220**
- Store 117 area: **200**
- Store 5 has the larger area.

### Most Common Property Category

The most frequent displayed property category was:

```text
Owned
```

Some category labels contain extra spaces, so category cleaning should be completed before treating the counts as final.

### Highest Revenue per Unit of Area

Store **53** had the highest `RevToArea` value:

```text
110,817.07
```

Its recorded characteristics were:

| Feature | Value |
|---|---|
| Store area | 82 |
| Property | Owned |
| Type | Express |
| Old/New | New |
| Checkout count | 2 |
| Revenue | 9,087,000 |

## Custom Ranking Function

The notebook defines a reusable function:

```python
top_n_revenue_in_k_stores(N, K)
```

It returns the top `N` stores by revenue among the first `K` stores while validating the input values.

Example analyses include:

- Top 5 revenue stores among the first 20 stores
- Top 10 revenue stores among the first 50 stores

## Revenue Prediction

A Linear Regression model was trained to predict `Revenue`.

### Input Features

The model used:

- `AreaStore`
- `Checkout Number`

`RevToArea` was intentionally excluded because it is calculated using the target variable and would cause data leakage.

### Train-Test Split

The data was divided into:

- **80% training data:** 94 stores
- **20% testing data:** 24 stores
- `random_state=42`

The two input features were standardized using `StandardScaler`, fitted only on the training data.

### Model Result

The model achieved:

```text
R² = 0.3639
```

This means the model explained approximately **36.4%** of the variation in store revenue on the test set.

The result suggests that store area and checkout count provide some predictive information, but they are not sufficient to explain most revenue differences.

## Model Coefficients

Because the features were standardized, the coefficients represent the expected revenue change associated with a one-standard-deviation increase in each feature.

| Feature | Coefficient |
|---|---:|
| `AreaStore` | 4,964,972 |
| `Checkout Number` | 12,985,550 |

Within this model, checkout count had the larger coefficient. These coefficients describe association within the fitted model and should not be interpreted as causal effects.

## Technologies Used

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Scikit-learn
- Jupyter Notebook
- Kaggle

## Repository Structure

```text
retail-store-sales-analysis/
├── retail-store-sales-analysis.ipynb
└── README.md
```

## Running the Project

Install the required libraries:

```bash
pip install pandas numpy matplotlib seaborn scikit-learn
```

The notebook was originally developed on Kaggle and reads data from a Kaggle input path. For local execution, update the CSV path to the location of `Stores.csv` on your computer.

## Key Learning Outcomes

This project demonstrates how to:

- Inspect a structured dataset
- Identify missing and duplicated records
- Convert formatted text into numerical data
- Fill missing numerical values using the median
- Create a business-oriented performance metric
- Build basic charts with Matplotlib and Seaborn
- Filter, rank, and compare store records
- Prevent target leakage during feature selection
- Scale numerical features correctly
- Train and evaluate a regression model
- Interpret R² and regression coefficients

## Limitations

- The dataset contains only 118 stores.
- Several categorical labels appear to contain extra whitespace.
- The regression model uses only two numerical features.
- Categorical store characteristics are not included in the model.
- Performance is evaluated using a single train-test split.
- Only R² is reported; error-based metrics are not included.

## Future Improvements

Possible improvements include:

- Removing leading and trailing spaces from categorical labels
- Standardizing inconsistent category names
- One-hot encoding `Property`, `Type`, and `Old/New`
- Adding categorical variables to the regression model
- Reporting MAE and RMSE alongside R²
- Applying cross-validation
- Comparing regularized and tree-based regression models
- Performing residual analysis
- Investigating and treating influential outliers
- Adding feature importance and model-explanation methods