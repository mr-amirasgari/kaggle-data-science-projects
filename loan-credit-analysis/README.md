# Loan Credit Analysis

An end-to-end machine learning project for analyzing borrower characteristics and predicting whether a loan will **not be fully paid**.

The project focuses on **imbalanced binary classification**, model comparison, class-imbalance handling with SMOTE, and minority-class evaluation.

## 🌐 Live Demo

👉 **[Open Interactive Loan Credit Analysis Dashboard](https://mr-amirasgari.github.io/kaggle-data-science-projects/loan-credit-analysis/)**

The dashboard provides an interactive, portfolio-ready interface for exploring the project, model results, class-imbalance strategy, and credit-risk scenarios.

---

## Project Overview

Loan default prediction is an imbalanced classification problem in which the positive/default class is typically much less frequent than the negative class.

Because of this imbalance, overall accuracy alone may provide a misleading picture of model performance.

This project therefore focuses on metrics such as:

- Recall
- F1 Score
- Minority-class performance
- Model behavior before and after imbalance handling

The workflow includes:

1. Data loading and inspection
2. Data cleaning
3. Exploratory data analysis
4. Feature transformation
5. Train/test preparation
6. Baseline classification
7. Model comparison
8. Class-imbalance analysis
9. SMOTE oversampling
10. Final evaluation

---

## Machine Learning Models

Three classification algorithms are investigated:

### Logistic Regression

Used as an interpretable baseline classifier and later retrained after applying SMOTE.

### Random Forest

Used as a non-linear tree-based ensemble model capable of capturing more complex relationships between borrower features.

### XGBoost

Used as a boosted-tree model for comparison with Logistic Regression and Random Forest.

---

## Class Imbalance

One of the central challenges of the dataset is the imbalance between the two target classes.

A model can obtain relatively high accuracy simply by favoring the majority class while performing poorly on the minority class.

To address this issue, the project applies:

### SMOTE — Synthetic Minority Over-sampling Technique

SMOTE generates synthetic examples of the minority class in the training data.

The objective is to provide the classifier with a more balanced training signal and improve its ability to identify minority-class observations.

---

## Key Result

The Logistic Regression model after applying SMOTE achieved:

| Metric | Result |
|---|---:|
| Recall | **44.59%** |
| F1 Score | **0.3309** |

The result demonstrates the importance of evaluating an imbalanced classification problem using metrics beyond simple accuracy.

---

## Interactive Dashboard

The project includes a responsive dashboard built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-inspired UI
- Recharts
- Vitest
- GitHub Pages

### Dashboard Sections

#### Overview

Provides a high-level summary of the machine learning project, models, reported metrics, and analysis workflow.

#### Credit Risk Scenario Analyzer

An interactive interface for exploring how common lending-related variables can affect a transparent risk scenario.

Inputs include:

- Annual income
- Loan amount
- Loan term
- Debt-to-income ratio
- Credit history
- Employment duration

The analyzer provides:

- Risk score
- Risk band
- Contributing risk factors
- Transparent explanation of the result

> **Important:** The interactive scenario analyzer is an educational browser-side scoring tool. It is not the fitted machine learning model from the notebook and is not presented as a real credit-scoring system.

#### Model Lab

Presents the machine learning algorithms evaluated in the project:

- Logistic Regression
- Random Forest
- XGBoost

Only metrics explicitly reported by the project are displayed.

#### Class Imbalance

Explains:

- Majority vs minority classes
- Why accuracy may be misleading
- How SMOTE works
- Why Recall and F1 Score matter

#### About

Provides information about the project methodology, technologies, repository, and deployment architecture.

---

## Repository Structure

```text
loan-credit-analysis/
│
├── loan-credit-analysis.ipynb
├── README.md
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
│
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   └── ui/
│   │
│   ├── lib/
│   │   ├── riskAnalyzer.ts
│   │   └── utils.ts
│   │
│   └── test/
│       └── riskAnalyzer.test.ts
│
└── docs/
```

---

## Run the Dashboard Locally

Clone the repository:

```bash
git clone https://github.com/mr-amirasgari/kaggle-data-science-projects.git
```

Navigate to the project:

```bash
cd kaggle-data-science-projects/loan-credit-analysis
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Tests

The frontend contains automated tests for the Credit Risk Scenario Analyzer.

The tests cover:

- Low-risk scenarios
- High-risk scenarios
- Invalid input handling

Run them with:

```bash
npm test
```

---

## Deployment

The dashboard is deployed using **GitHub Pages** and **GitHub Actions**.

Live version:

**https://mr-amirasgari.github.io/kaggle-data-science-projects/loan-credit-analysis/**

The repository uses a multi-dashboard deployment workflow so that individual data science projects can be exposed through separate paths under the same GitHub Pages site.

---

## Technologies

### Data Science

- Python
- Pandas
- NumPy
- Scikit-learn
- Logistic Regression
- Random Forest
- XGBoost
- SMOTE
- Jupyter Notebook

### Dashboard

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Vitest
- GitHub Actions
- GitHub Pages

---

## Disclaimer

This project is developed for **educational, analytical, and portfolio purposes only**.

Neither the machine learning analysis nor the interactive dashboard should be used as the sole basis for:

- Lending decisions
- Credit approval
- Financial decisions
- Real-world credit scoring

The interactive Credit Risk Scenario Analyzer is a demonstration tool and does not represent a production lending model.

---

## Source Code

GitHub Repository:

**https://github.com/mr-amirasgari/kaggle-data-science-projects**

Project Folder:

**https://github.com/mr-amirasgari/kaggle-data-science-projects/tree/main/loan-credit-analysis**

---

## Related Projects

This repository also includes additional end-to-end data science projects covering:

- Drug Classification
- Retail Store Sales Analysis
- Regression
- Classification
- Exploratory Data Analysis
- Imbalanced Learning

---

⭐ If you find this project useful, consider starring the repository.