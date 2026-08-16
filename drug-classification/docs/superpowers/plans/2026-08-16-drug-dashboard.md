# Drug Classification Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive shadcn-style Drug200 ML dashboard that runs entirely in the browser and deploys to GitHub Pages.

**Architecture:** A Vite React/TypeScript app bundles the Drug200 data and a compact Decision Tree inference function. UI components follow shadcn conventions, Recharts handles visualization, and GitHub Actions publishes `dist/`.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Radix UI, Recharts, Vitest, GitHub Pages.

## Global Constraints
- Static hosting only; no backend.
- GitHub Pages base path is `/kaggle-data-science-projects/`.
- Medical disclaimer is visible in the Predictor and README.

---

### Task 1: Predictor behavior
- [x] Add failing tests for the five Drug200 decision outcomes.
- [x] Implement input validation and compact decision rules.
- [x] Keep the function pure and browser-safe.

### Task 2: Dashboard shell and shadcn components
- [x] Add Button, Card, Input, Label, Badge, and Select components.
- [x] Build responsive sidebar and header.
- [x] Add the five navigation views.

### Task 3: Data and visualization
- [x] Bundle the 200-row dataset.
- [x] Compute class/BP counts at runtime.
- [x] Add bar, donut, histogram, scatter, and class table views.

### Task 4: Predictor UI
- [x] Bind form inputs to the predictor function.
- [x] Surface validation errors.
- [x] Display predicted class and decision path.

### Task 5: GitHub Pages delivery
- [x] Configure Vite base path.
- [x] Add Pages workflow.
- [x] Add local run/build/deploy instructions.
