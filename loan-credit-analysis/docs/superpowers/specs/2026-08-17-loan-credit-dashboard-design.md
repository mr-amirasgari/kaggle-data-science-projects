# Loan Credit Analysis Dashboard Design

## Goal
Turn the existing loan-credit-analysis notebook project into a responsive FinTech portfolio dashboard without overwriting the already deployed Drug dashboard.

## Confirmed project facts
- Problem type: imbalanced binary classification.
- Models listed by the project: Logistic Regression, Random Forest, XGBoost.
- Imbalance handling: SMOTE.
- Explicitly reported result: Logistic Regression after SMOTE reached 44.59% recall and 0.3309 F1.

## UI
shadcn-inspired neutral interface with a fixed sidebar, subtle borders, compact cards, restrained typography, and responsive mobile navigation.

## Views
1. Overview — problem statement, model count, reported recall/F1, pipeline.
2. Risk Analyzer — transparent scenario scorer for common lending factors.
3. Model Lab — model comparison with only source-supported metrics populated.
4. Class Imbalance — visual explanation of SMOTE and minority-sensitive evaluation.
5. About — project scope, stack, repo and live links.

## Predictor integrity rule
The browser analyzer must never claim to be the fitted project model unless fitted coefficients/model artifacts and exact preprocessing are available. It is labeled a scenario analyzer and exposes its scoring factors.

## Deployment
- Drug remains at `/kaggle-data-science-projects/`.
- Loan is served at `/kaggle-data-science-projects/loan-credit-analysis/`.
- One Pages workflow builds both apps and assembles one artifact.
