# 📊 Data Science & Machine Learning Portfolio

A collection of end-to-end data science and machine learning projects covering exploratory data analysis, feature engineering, statistical analysis, predictive modeling, explainable AI, model evaluation, and interactive dashboard deployment.

Each project is developed beyond a simple notebook. The goal is to demonstrate the complete data science workflow from raw data exploration to model interpretation and deployment.

---

# 🚀 Projects

| Project | Focus | Highlights | Live Demo |
|---|---|---|---|
| 💊 **Drug Classification** | Multiclass Classification | EDA, Statistical Analysis, Feature Engineering, Decision Tree, Logistic Regression | [Open Dashboard](https://mr-amirasgari.github.io/kaggle-data-science-projects/) |
| 💳 **Loan Credit Analysis** | Imbalanced Binary Classification | Credit Risk, SMOTE, Logistic Regression, Random Forest, XGBoost | [Open Dashboard](https://mr-amirasgari.github.io/kaggle-data-science-projects/loan-credit-analysis/) |
| 🏪 **Retail Store Sales Analysis** | Regression & Business Analytics | EDA, Revenue Analysis, Ridge Regression, Extra Trees, Cross-Validation | [Open Dashboard](https://mr-amirasgari.github.io/kaggle-data-science-projects/retail-store-sales-analysis/) |
| 🏥 **Diabetes Hospital Readmission Prediction** | Healthcare Binary Classification | CRISP-DM, EDA, Feature Engineering, XGBoost, SMOTE, SHAP Explainable AI | [Open Dashboard](https://mr-amirasgari.github.io/kaggle-data-science-projects/diabetes-hospital-readmission-analysis/) |

---

# 🏥 Diabetes Hospital Readmission Prediction

An end-to-end healthcare machine learning project focused on predicting 30-day hospital readmission risk among diabetic patients.

The project follows the **CRISP-DM methodology** and transforms hospital encounter data into an interpretable machine learning pipeline with an interactive dashboard.

## Key Topics

- Healthcare Analytics
- CRISP-DM Methodology
- Exploratory Data Analysis
- Missing Value Analysis
- Feature Engineering
- Binary Classification
- Imbalanced Learning
- SMOTE
- Logistic Regression
- Random Forest
- XGBoost
- Model Evaluation
- Feature Importance
- SHAP Explainable AI
- Interactive Dashboard Deployment


## Modeling Approach

| Model | Role |
|---|---|
| Logistic Regression | Baseline classification model |
| Random Forest | Ensemble learning model |
| XGBoost + SMOTE | Advanced model for imbalanced classification |


## Explainability

Explainable AI techniques are used to understand the main factors affecting readmission risk.

Important factors include:

- Previous inpatient visits
- Emergency visits
- Number of diagnoses
- Medication complexity
- Hospital stay duration


## Project Links

📂 **Project Folder**

[diabetes-hospital-readmission-analysis](./diabetes-hospital-readmission-analysis)


📓 **Kaggle Notebook**

[Kaggle Notebook Link]


🌐 **Live Dashboard**

https://mr-amirasgari.github.io/kaggle-data-science-projects/diabetes-hospital-readmission-analysis/

---
# 💊 Drug Classification

An end-to-end multiclass classification project focused on predicting the appropriate drug class from patient characteristics.

## Key Topics

- Exploratory Data Analysis
- Descriptive Statistics
- Statistical Analysis
- Feature Engineering
- Na/K Ratio Analysis
- Label Encoding
- Feature Scaling
- Decision Tree
- Logistic Regression
- Confusion Matrix
- Classification Report
- Model Comparison


## Performance Snapshot

| Model | Training Accuracy | Test Accuracy |
|---|---:|---:|
| Decision Tree | **100%** | **100%** |
| Logistic Regression | **94%** | **98%** |


## Project Links

📂 **Project Folder**

[drug-classification](./drug-classification)


🌐 **Live Dashboard**

https://mr-amirasgari.github.io/kaggle-data-science-projects/

---

# 💳 Loan Credit Analysis

An end-to-end binary classification project focused on analyzing borrower characteristics and predicting whether a loan will not be fully paid.

A major focus of this project is the effect of class imbalance and why accuracy alone can be misleading when evaluating credit-risk models.

## Key Topics

- Credit Risk Analysis
- Data Cleaning
- Exploratory Data Analysis
- Feature Engineering
- Feature Scaling
- Logistic Regression
- Random Forest
- XGBoost
- Class Imbalance
- SMOTE
- Precision
- Recall
- F1 Score
- ROC AUC
- Confusion Matrices
- Model Comparison


## Key Result

After applying SMOTE, Logistic Regression achieved:

| Metric | Result |
|---|---:|
| Recall | **44.59%** |
| F1 Score | **0.3309** |


The experiment demonstrates the trade-off between overall accuracy and minority-class detection.


## Project Links

📂 **Project Folder**

[loan-credit-analysis](./loan-credit-analysis)


🌐 **Live Dashboard**

https://mr-amirasgari.github.io/kaggle-data-science-projects/loan-credit-analysis/

---

# 🏪 Retail Store Sales Analysis

An end-to-end retail analytics and machine learning project focused on understanding store performance and modeling store revenue.

The project combines business-oriented exploratory analysis with a leakage-aware regression workflow and an interactive revenue estimation dashboard.

## Key Topics

- Retail Business Analytics
- Data Cleaning
- Exploratory Data Analysis
- Store Performance Analysis
- Revenue Analysis
- Revenue per Area
- Feature Engineering
- One-Hot Encoding
- Pipeline-Based Preprocessing
- Linear Regression
- Ridge Regression
- Extra Trees
- Cross-Validation
- MAE
- RMSE
- R²
- Residual Analysis
- Actual vs Predicted Analysis


## Model Comparison

| Model | Cross-Validated R² |
|---|---:|
| **Ridge Regression** | **0.572** |
| Extra Trees | **0.546** |
| Linear Regression | **0.545** |


The interactive dashboard also includes a browser-based revenue scenario estimator derived from the trained Ridge Regression model.


## Project Links

📂 **Project Folder**

[retail-store-sales-analysis](./retail-store-sales-analysis)


🌐 **Live Dashboard**

https://mr-amirasgari.github.io/kaggle-data-science-projects/retail-store-sales-analysis/

---
# 🧠 Skills Demonstrated

Across these projects, this repository demonstrates practical experience with:

- Data Cleaning
- Data Preparation
- Exploratory Data Analysis
- Descriptive Statistics
- Statistical Testing
- Feature Engineering
- Classification
- Regression
- Imbalanced Learning
- SMOTE
- Model Evaluation
- Cross-Validation
- Feature Scaling
- One-Hot Encoding
- Label Encoding
- Data Leakage Prevention
- Business-Oriented Interpretation
- Explainable Machine Learning
- SHAP Analysis
- Interactive Data Visualization
- Browser-Side Model Demonstrations
- Reproducible Machine Learning Workflows
- Dashboard Development
- GitHub Pages Deployment
- CI/CD with GitHub Actions

---

# 🛠 Technology Stack

## Data Science

`Python`  
`Pandas`  
`NumPy`  
`SciPy`  
`Scikit-learn`  
`XGBoost`  
`imbalanced-learn`  
`SHAP`

## Data Visualization

`Matplotlib`  
`Seaborn`  
`Recharts`

## Dashboard Development

`React`  
`TypeScript`  
`Vite`  
`Tailwind CSS`

## Deployment

`GitHub Pages`  
`GitHub Actions`

---

# 📁 Repository Structure

```text
kaggle-data-science-projects/

│
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
│
├── drug-classification/
│   ├── src/
│   ├── README.md
│   ├── package.json
│   ├── vite.config.ts
│   ├── *.ipynb
│   └── ...
│
├── loan-credit-analysis/
│   ├── src/
│   ├── README.md
│   ├── package.json
│   ├── vite.config.ts
│   ├── *.ipynb
│   └── ...
│
├── retail-store-sales-analysis/
│   ├── src/
│   ├── README.md
│   ├── package.json
│   ├── vite.config.ts
│   ├── *.ipynb
│   └── ...
│
├── diabetes-hospital-readmission-analysis/
│   ├── dashboard/
│   ├── diabetes-hospital-readmission.ipynb
│   ├── README.md
│   └── requirements.txt
│
└── README.md
# 🌐 Interactive Portfolio

All dashboards are automatically built and deployed through GitHub Actions.

## 💊 Drug Classification

https://mr-amirasgari.github.io/kaggle-data-science-projects/


## 💳 Loan Credit Analysis

https://mr-amirasgari.github.io/kaggle-data-science-projects/loan-credit-analysis/


## 🏪 Retail Store Sales Analysis

https://mr-amirasgari.github.io/kaggle-data-science-projects/retail-store-sales-analysis/


## 🏥 Diabetes Hospital Readmission Prediction

https://mr-amirasgari.github.io/kaggle-data-science-projects/diabetes-hospital-readmission-analysis/

---

# 🎯 Repository Goal

The goal of this repository is to build a growing collection of portfolio-grade data science projects that demonstrate not only model training, but the complete workflow from raw data exploration to evaluation, interpretation, visualization, and deployment.

Future projects will progressively introduce more advanced topics such as:

- High-Dimensional Data
- Feature Selection
- Dimensionality Reduction
- PCA
- Advanced Imbalanced Learning
- Explainable Machine Learning
- Threshold Optimization
- Hyperparameter Optimization
- Larger Real-World Datasets
- More Advanced Interactive Dashboards

---

# 👤 Author

**Amir Asgari**

GitHub:

https://github.com/mr-amirasgari


---

⭐ If you find these projects useful, consider starring the repository.