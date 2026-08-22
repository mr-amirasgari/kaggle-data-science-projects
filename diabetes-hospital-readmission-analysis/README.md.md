# Diabetes Hospital Readmission Analysis

An end-to-end machine learning project for predicting early hospital readmission among diabetic patients using the CRISP-DM methodology.

The objective is to identify patients who are likely to be readmitted within 30 days after discharge.

---

## Project Overview

Hospital readmission prediction is an important healthcare analytics problem.

This project focuses on:

- Binary classification of early readmission
- Imbalanced medical data analysis
- Feature engineering
- Model comparison
- Explainable machine learning

Target transformation:

- `<30` → 1 (Early Readmission)
- `NO` and `>30` → 0 (No Early Readmission)

---

# CRISP-DM Workflow

## Business Understanding

The goal is to predict early hospital readmission risk and understand the factors associated with future readmission.

## Data Understanding

Performed analysis:

- Target distribution
- Missing values
- Admission and discharge patterns
- Diagnosis codes
- Healthcare utilization
- Encounter complexity
- Correlation analysis

## Data Preparation

Steps:

- Identifier removal
- Target transformation
- Missing value handling
- Feature engineering
- Encoding
- Scaling

---

# Machine Learning Models

Implemented models:

## Logistic Regression

Interpretable baseline classifier.

## Random Forest

Tree-based ensemble model for non-linear patterns.

## XGBoost

Gradient boosting model for structured healthcare data.

---

# Imbalanced Learning

The project handles class imbalance using:

- Class weighting
- SMOTE oversampling

Evaluation metrics:

- Precision
- Recall
- F1-score
- ROC-AUC

---

# Explainability

Included:

- Feature Importance
- SHAP explanations

These methods help understand which variables influence model predictions.

---

# Technologies

- Python
- Pandas
- NumPy
- Scikit-learn
- XGBoost
- Imbalanced-learn
- SHAP
- Matplotlib
- Seaborn
- Jupyter Notebook

---

# Disclaimer

This project is developed for educational and analytical purposes only.

The model should not be used as a standalone clinical decision system.
