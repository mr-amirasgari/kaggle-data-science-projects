# Drug Classification Dashboard Design

## Goal
Turn the Drug200 notebook project into a real, responsive portfolio dashboard that can be published from GitHub Pages.

## Architecture
- React + TypeScript + Vite frontend.
- Tailwind CSS and shadcn-style local UI components.
- Full Drug200 dataset bundled as static TypeScript data.
- Recharts for charts.
- Decision Tree inference represented as browser-side TypeScript rules.
- GitHub Actions builds `dist/` and publishes to GitHub Pages.

## Views
1. Overview: project summary, KPI cards, class distribution, BP distribution.
2. Predictor: patient form, validation, result card, decision path.
3. Data Explorer: age histogram, age-vs-Na/K scatter, class table.
4. Models: model comparison and deployment architecture.
5. About: dataset, stack, source links, disclaimer.

## Visual language
Neutral shadcn-like palette, subtle borders, rounded cards, compact typography, responsive sidebar, no decorative gradients.

## Constraints
- Static hosting only; no backend.
- Must work under `/kaggle-data-science-projects/` on GitHub Pages.
- Must not present itself as medical advice.
