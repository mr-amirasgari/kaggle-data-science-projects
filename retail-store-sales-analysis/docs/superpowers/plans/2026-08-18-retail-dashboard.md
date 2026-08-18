# Retail Store Sales Dashboard Implementation Plan

**Goal:** Ship a tested Vite/React dashboard and polished notebook for the retail-store-sales-analysis folder.

**Architecture:** Bundle the cleaned 118-store dataset as static JSON, compute charts entirely in the browser, and export a fitted Ridge model into a small JSON parameter file for deterministic browser-side estimation. Deploy as a nested GitHub Pages route.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Recharts, Vitest, Python, scikit-learn.

- Build polished notebook with leakage-safe pipelines and CV.
- Export cleaned dataset and Ridge parameters.
- Build responsive dashboard views.
- Add model unit tests.
- Verify npm test and npm build.
- Publish under `/retail-store-sales-analysis/` via the root Pages workflow.
