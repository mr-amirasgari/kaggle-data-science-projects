# Kaggle Data Science Projects

A collection of three end-to-end data science projects developed in Python and Kaggle.  
The repository covers exploratory data analysis, data cleaning, feature engineering, statistical analysis, classification, regression, and model evaluation.

## Projects

| Project | Problem Type | Main Methods | Key Result |
|---|---|---|---|
| [Drug Classification](./drug-classification) | Multiclass classification | EDA, statistical tests, feature engineering, Decision Tree, Logistic Regression | Decision Tree: 100% test accuracy; Logistic Regression: 98% test accuracy |
| [Loan Credit Analysis](./loan-credit-analysis) | Imbalanced binary classification | Data cleaning, feature transformation, Logistic Regression, Random Forest, XGBoost, SMOTE | Logistic Regression after SMOTE achieved 44.59% recall and 0.3309 F1 score |
| [Retail Store Sales Analysis](./retail-store-sales-analysis) | Regression and business analysis | Data cleaning, KPI creation, EDA, Linear Regression | Linear Regression achieved an R² score of 0.3639 |

## Repository Structure

```text
kaggle-data-science-projects/
├── drug-classification/
│   ├── drug-classification.ipynb
│   └── README.md
├── loan-credit-analysis/
│   ├── loan-credit-analysis.ipynb
│   └── README.md
├── retail-store-sales-analysis/
│   ├── retail-store-sales-analysis.ipynb
│   └── README.md
├── .gitignore
└── README.md
```

## 1. Drug Classification

A multiclass machine learning project for predicting one of five drug categories using patient-related features.

### Main Steps

- Data inspection and descriptive statistics
- Exploratory data analysis
- Correlation analysis
- Pearson, Spearman, and chi-square tests
- Categorical encoding
- Sodium-to-potassium ratio feature engineering
- Feature scaling
- Decision Tree classification
- Logistic Regression classification
- Confusion matrix and classification report analysis

### Main Results

- Decision Tree training accuracy: **100%**
- Decision Tree testing accuracy: **100%**
- Logistic Regression training accuracy: **94%**
- Logistic Regression testing accuracy: **98%**

Because the dataset is small and the results are based on a single train-test split, these scores should not be interpreted as real-world clinical performance.

### Dataset

[Drug Classification Dataset on Kaggle](https://www.kaggle.com/datasets/mramirasgari/introds)

### Project Files

- [Notebook](./drug-classification/drug-classification.ipynb)
- [Detailed README](./drug-classification/README.md)

## 2. Loan Credit Analysis

A binary classification project for predicting whether a loan will be not fully paid.

### Main Steps

- Missing-value and duplicate checks
- Numerical and categorical exploratory analysis
- Feature binning
- Log transformation
- One-hot and label encoding
- Feature scaling
- Logistic Regression
- Random Forest
- XGBoost
- Class imbalance treatment with SMOTE
- Evaluation using accuracy, precision, recall, F1 score, ROC-AUC, and confusion matrices

### Main Results

Before SMOTE, Logistic Regression achieved the highest ROC-AUC:

- ROC-AUC: **0.7050**
- Recall: **0.0197**
- F1 score: **0.0377**

After SMOTE, Logistic Regression achieved the strongest minority-class detection:

- Accuracy: **0.7129**
- Precision: **0.2631**
- Recall: **0.4459**
- F1 score: **0.3309**
- ROC-AUC: **0.6665**

The results demonstrate why accuracy alone is not sufficient for imbalanced classification problems.

### Dataset

[Loan Dataset on Kaggle](https://www.kaggle.com/datasets/mramirasgari/loan-data)

### Project Files

- [Notebook](./loan-credit-analysis/loan-credit-analysis.ipynb)
- [Detailed README](./loan-credit-analysis/README.md)

## 3. Retail Store Sales Analysis

A retail analytics and regression project focused on store performance and revenue prediction.

### Main Steps

- Data inspection and cleaning
- Missing-value treatment
- Revenue type conversion
- Categorical frequency analysis
- Revenue distribution analysis
- Revenue-per-area KPI creation
- Store ranking and comparison
- Linear Regression modeling
- Model coefficient interpretation

### Main Results

A Linear Regression model was trained using:

- Store area
- Number of checkout counters

The model achieved:

- Test R²: **0.3639**

This indicates that the selected features explain approximately 36.4% of the variation in store revenue.

### Dataset

[Retail Store Dataset on Kaggle](https://www.kaggle.com/datasets/mramirasgari/stores)

### Project Files

- [Notebook](./retail-store-sales-analysis/retail-store-sales-analysis.ipynb)
- [Detailed README](./retail-store-sales-analysis/README.md)

## Technologies Used

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- SciPy
- Scikit-learn
- XGBoost
- Imbalanced-learn
- Graphviz
- Jupyter Notebook
- Kaggle
- Git and GitHub

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/kaggle-data-science-projects.git
cd kaggle-data-science-projects
```

Install the main dependencies:

```bash
pip install pandas numpy matplotlib seaborn scipy scikit-learn xgboost imbalanced-learn graphviz jupyter
```

Open Jupyter Notebook:

```bash
jupyter notebook
```

Then open the desired notebook from its project folder.

## Data Paths

The notebooks were originally developed on Kaggle and may contain paths such as:

```text
/kaggle/input/...
```

For local execution, download the related dataset and update the CSV path inside the notebook.

## Skills Demonstrated

This repository demonstrates experience with:

- Exploratory data analysis
- Data cleaning and preprocessing
- Statistical analysis
- Feature engineering
- Categorical encoding
- Feature scaling
- Classification and regression
- Imbalanced-data handling
- Model evaluation
- Data visualization
- Notebook documentation
- Git and GitHub project organization

## Important Notes

- The projects are educational portfolio projects.
- Model results are based on the current notebook configurations and train-test splits.
- The drug classification project must not be used for medical decisions.
- The loan analysis project must not be used as the sole basis for real lending decisions.
- Dataset usage should follow the terms and licenses provided on Kaggle.

## Author

**Amir Asgari**

- [Kaggle Profile](https://www.kaggle.com/mramirasgari)
- [GitHub Profile](https://github.com/mr-amirasgari)