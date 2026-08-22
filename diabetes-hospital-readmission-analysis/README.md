# 🏥 Diabetes Hospital Readmission Analysis

An end-to-end machine learning project for predicting early hospital readmission among diabetic patients using the **CRISP-DM methodology**.

The objective is to identify patients who are likely to be readmitted within 30 days after discharge and analyze the main factors influencing readmission risk using explainable machine learning techniques.

---

# 🌐 Project Demo

## Interactive Dashboard

🔗 Live Dashboard:

https://mr-amirasgari.github.io/kaggle-data-science-projects/diabetes-hospital-readmission-analysis/


## Kaggle Notebook

🔗 Kaggle:

[Kaggle Notebook Link]

---

# 📌 Project Overview

Hospital readmission prediction is an important healthcare analytics problem.

This project focuses on:

- Early readmission prediction
- Binary classification of hospital encounters
- Imbalanced medical data analysis
- Feature engineering
- Model comparison
- Explainable machine learning

## Target Definition

The original target variable is transformed into a binary classification problem:

| Original Value | New Label |
|---|---:|
| `<30` | 1 (Early Readmission) |
| `NO` | 0 |
| `>30` | 0 |

---

# 🔄 CRISP-DM Workflow

## 1. Business Understanding

The goal is to predict patients at higher risk of early hospital readmission and identify the variables associated with readmission risk.

---

## 2. Data Understanding

Performed analyses:

- Target distribution analysis
- Missing value analysis
- Admission patterns
- Discharge patterns
- Diagnosis code analysis
- Healthcare utilization analysis
- Encounter complexity analysis
- Correlation analysis

---

## 3. Data Preparation

Processing steps:

- Identifier removal
- Target transformation
- Missing value handling
- Feature engineering
- Encoding categorical variables
- Feature scaling

---

# 🤖 Machine Learning Models

Three classification approaches were evaluated:

## Logistic Regression

Interpretable baseline classifier.

## Random Forest

Tree-based ensemble model capable of capturing non-linear relationships.

## XGBoost

Gradient boosting model optimized for structured healthcare data.

---

# ⚖️ Imbalanced Learning

Hospital readmission data contains class imbalance.

Techniques applied:

- Class weighting
- SMOTE oversampling

Evaluation metrics:

- Accuracy
- Precision
- Recall
- F1-score
- ROC-AUC
- Confusion Matrix

---

# 🔍 Explainable AI

To improve model interpretability, the project includes:

- Feature Importance
- SHAP analysis

These techniques help identify the main variables contributing to model predictions.

Examples of important factors:

- Previous inpatient visits
- Emergency visits
- Number of diagnoses
- Medication complexity
- Hospital stay duration

---

# 🛠 Technologies

## Data Science

- Python
- Pandas
- NumPy
- Scikit-learn
- XGBoost
- Imbalanced-learn
- SHAP

## Visualization

- Matplotlib
- Seaborn

## Development

- Jupyter Notebook
- React
- TypeScript
- Vite

## Deployment

- GitHub Pages
- GitHub Actions

---

# 📁 Project Structure

```text
diabetes-hospital-readmission-analysis/

│
├── dashboard/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── diabetes-hospital-readmission.ipynb
│
├── README.md
│
└── requirements.txt
````markdown
# ▶️ Run Locally

## Dashboard

Navigate to the dashboard directory:

```bash
cd dashboard
````

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Notebook

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Launch Jupyter Notebook:

```bash
jupyter notebook
```

---

# ⚠️ Disclaimer

This project is developed for educational and analytical purposes only.

The model is not intended to be used as a standalone clinical decision system.

```
```
