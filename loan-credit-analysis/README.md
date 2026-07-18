# Loan Credit Analysis

A machine learning project for analyzing borrower characteristics and predicting whether a loan will be **not fully paid**.

> **Disclaimer:** This project is for educational and portfolio purposes only. It should not be used as the sole basis for real lending or credit decisions.

## Project Overview

The project explores a structured loan dataset, prepares the data for modeling, compares multiple classification algorithms, and examines the effect of class imbalance on model performance.

The workflow includes:

- Data inspection and quality checks
- Exploratory data analysis
- Feature binning and transformation
- Correlation analysis
- Categorical encoding
- Feature scaling
- Binary classification
- Model comparison
- Class-imbalance treatment using SMOTE

## Dataset

The notebook uses the Kaggle dataset:

```text
mramirasgari/loan-data
```

The dataset contains **9,578 records** and **14 original columns**.

| Feature | Description |
|---|---|
| `credit.policy` | Whether the borrower meets the lender's credit policy |
| `purpose` | Purpose of the loan |
| `int.rate` | Loan interest rate |
| `installment` | Monthly installment amount |
| `log.annual.inc` | Natural logarithm of annual income |
| `dti` | Debt-to-income ratio |
| `fico` | Borrower's FICO credit score |
| `days.with.cr.line` | Length of the borrower's credit history |
| `revol.bal` | Revolving credit balance |
| `revol.util` | Revolving credit utilization rate |
| `inq.last.6mths` | Credit inquiries during the previous six months |
| `delinq.2yrs` | Delinquencies during the previous two years |
| `pub.rec` | Number of derogatory public records |
| `not.fully.paid` | Target indicating whether the loan was not fully paid |

No missing values were detected.

## Target Variable

The target is:

```text
not.fully.paid
```

- `False` or `0`: the loan was fully paid
- `True` or `1`: the loan was not fully paid

Approximately **16%** of the records belong to the positive class, which makes the dataset imbalanced.

## Exploratory Data Analysis

The notebook includes:

- Dataset structure and descriptive statistics
- Missing-value checks
- Frequency and percentage tables
- Bar charts for categorical variables
- Histograms for numerical variables
- Spearman correlation analysis
- A correlation heatmap
- Inspection of invalid credit-utilization values
- Analysis of skewed revolving-balance values

One notable relationship is the strong negative Spearman correlation between interest rate and FICO score.

## Data Preparation

The following preprocessing steps were applied:

### Type Conversion

`credit.policy` and `not.fully.paid` were converted to Boolean values.

### Feature Binning

The following count variables were grouped into categorical bins:

- `inq.last.6mths`
- `delinq.2yrs`
- `pub.rec`

### Data Cleaning

Values of `revol.util` above 100 were capped at 100.

### Log Transformation

A log-transformed revolving-balance feature was created:

```text
log_revol_bal = log(1 + revol.bal)
```

### Categorical Encoding

- The `purpose` feature was one-hot encoded.
- The custom bin features were label encoded.

### Feature Removal

After creating transformed versions, the original columns below were removed:

- `revol.bal`
- `inq.last.6mths`
- `delinq.2yrs`
- `pub.rec`

## Train-Test Split

The data was divided into:

- **80% training data:** 7,662 records
- **20% testing data:** 1,916 records
- `random_state=42`

Numerical features were standardized using `StandardScaler`, fitted only on the training set.

## Machine Learning Models

Three classification algorithms were compared:

- Logistic Regression
- Random Forest
- XGBoost

Evaluation metrics included:

- Accuracy
- Precision
- Recall
- F1 score
- ROC-AUC
- Confusion matrix

## Results Before SMOTE

| Model | Accuracy | Precision | Recall | F1 Score | ROC-AUC |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 0.8403 | 0.4615 | 0.0197 | 0.0377 | 0.7050 |
| Random Forest | 0.8382 | 0.3684 | 0.0230 | 0.0432 | 0.6672 |
| XGBoost | 0.8205 | 0.3107 | 0.1049 | 0.1569 | 0.6338 |

Although accuracy was relatively high, recall for the minority class was very low. This shows why accuracy alone is not sufficient for evaluating an imbalanced classification problem.

## Handling Class Imbalance

SMOTE was applied only to the training data to generate synthetic samples for the minority class.

## Results After SMOTE

| Model | Accuracy | Precision | Recall | F1 Score | ROC-AUC |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 0.7129 | 0.2631 | 0.4459 | 0.3309 | 0.6665 |
| Random Forest | 0.8043 | 0.2866 | 0.1541 | 0.2004 | 0.6570 |
| XGBoost | 0.8022 | 0.2771 | 0.1508 | 0.1953 | 0.6290 |

After SMOTE, Logistic Regression achieved the highest recall and F1 score for identifying loans that were not fully paid. This improvement came with a reduction in overall accuracy.

## Key Findings

- The target variable is substantially imbalanced.
- High accuracy before resampling hides weak minority-class detection.
- Logistic Regression produced the best ROC-AUC before SMOTE.
- SMOTE greatly improved Logistic Regression recall.
- Model selection should depend on the cost of missing a risky loan versus incorrectly flagging a fully paid loan.

## Technologies Used

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- SciPy
- Scikit-learn
- Imbalanced-learn
- XGBoost
- Jupyter Notebook
- Kaggle

## Repository Structure

```text
loan-credit-analysis/
├── loan-credit-analysis.ipynb
└── README.md
```

## Running the Project

Install the required libraries:

```bash
pip install pandas numpy matplotlib seaborn scipy scikit-learn imbalanced-learn xgboost
```

The notebook was originally developed on Kaggle. When running it locally, update the CSV file path to match the local dataset location.

## Key Learning Outcomes

This project demonstrates how to:

- Inspect and clean structured credit data
- Transform skewed numerical variables
- Bin sparse count features
- Encode categorical variables
- Scale numerical features without fitting on test data
- Train and compare binary classification models
- Evaluate models with metrics appropriate for imbalanced data
- Apply SMOTE only to the training set
- Interpret the trade-off between accuracy, precision, and recall

## Future Improvements

Possible improvements include:

- Using a stratified train-test split
- Creating a preprocessing and modeling pipeline
- Applying cross-validation
- Comparing class weighting with SMOTE
- Tuning the classification threshold
- Reporting precision-recall AUC
- Performing hyperparameter optimization
- Adding feature-importance and model-explanation methods
- Evaluating probability calibration