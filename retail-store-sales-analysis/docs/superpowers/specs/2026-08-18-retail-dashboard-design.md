# Retail Store Sales Dashboard Design

## Goal
Present the 118-store retail analysis as a portfolio-grade interactive product while keeping all model claims grounded in the supplied Stores.csv data.

## Structure
- Overview: core KPIs and category summaries.
- Store Explorer: client-side search and filters over the bundled dataset.
- Performance: revenue/area relationships, top stores, and efficiency.
- Revenue Model: cross-validation comparison and browser-side Ridge estimator.
- About: methodology, limitations, GitHub/Kaggle links.

## Data Integrity
Categorical whitespace is normalized. Revenue is parsed numerically. RevToArea is never used as a predictive feature. The estimator uses exported parameters from a Ridge pipeline fit on the cleaned dataset and is labeled as an educational portfolio estimator.
