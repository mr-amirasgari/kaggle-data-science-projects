# Loan Credit Analysis Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a shadcn-style interactive Loan Credit Analysis dashboard and deploy it beside the existing Drug dashboard.

**Architecture:** A React/TypeScript Vite application presents source-supported project metrics and a transparent browser-side risk scenario analyzer. A repository-root GitHub Pages workflow builds the existing Drug app at the site root and the new Loan app under `/loan-credit-analysis/`.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Recharts, Vitest, GitHub Pages.

## Global Constraints
- Do not invent model metrics not explicitly available from the project.
- Do not present the scenario analyzer as the fitted ML model.
- Preserve the existing Drug dashboard at the Pages root.
- Loan Vite base path is `/kaggle-data-science-projects/loan-credit-analysis/`.

---

### Task 1: Risk analyzer behavior
**Files:**
- Create: `src/lib/riskAnalyzer.ts`
- Test: `src/test/riskAnalyzer.test.ts`

**Interfaces:**
- Consumes: applicant scenario fields.
- Produces: `analyzeCreditRisk(input): RiskResult`.

- [x] Write tests for low-risk, high-risk, and invalid scenarios.
- [x] Implement validation and deterministic transparent scoring.
- [x] Return score, risk band, and factor breakdown.

### Task 2: Dashboard shell
**Files:**
- Create: `src/App.tsx`
- Create: `src/components/ui/*`
- Create: `src/components/dashboard/StatCard.tsx`

**Interfaces:**
- Consumes: project constants and analyzer result.
- Produces: responsive five-view dashboard.

- [x] Build responsive sidebar/header.
- [x] Add Overview, Risk Analyzer, Model Lab, Class Imbalance, About.
- [x] Use neutral shadcn-style visual language.

### Task 3: Project-grounded metrics
**Files:**
- Modify: `src/App.tsx`

- [x] Display 44.59% recall and 0.3309 F1 only for Logistic Regression after SMOTE.
- [x] List Random Forest and XGBoost without fabricated metric values.
- [x] Visualize the project workflow and imbalance treatment.

### Task 4: GitHub Pages multi-dashboard deployment
**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Create: `vite.config.ts`
- Create: `MULTI_DASHBOARD_DEPLOY_INSTRUCTIONS.md`

- [x] Build/test both Drug and Loan apps.
- [x] Assemble Drug at site root.
- [x] Assemble Loan under `/loan-credit-analysis/`.
- [x] Deploy the combined Pages artifact.

### Task 5: README live-demo snippet
**Files:**
- Create: `README_DASHBOARD_SECTION.md`

- [x] Add Loan live-demo URL.
- [x] Document dashboard features.
- [x] Clarify scenario analyzer limitations.
