# Drug Classification Dashboard

A portfolio-ready React dashboard for the Drug200 machine-learning project.

## What is included

- shadcn-style component structure under `src/components/ui`
- React + TypeScript + Vite
- Tailwind CSS v4 integration
- Radix UI primitives
- Recharts visualizations
- Full 200-row Drug200 dataset bundled locally
- Browser-side Decision Tree predictor
- Responsive sidebar and mobile navigation
- GitHub Pages workflow
- Unit tests for the predictor

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm test
npm run build
npm run preview
```

## Put it into your repository

Copy this folder to:

```text
kaggle-data-science-projects/
└── drug-classification/
    ├── README.md
    ├── drug-classification.ipynb
    └── dashboard/          ← copy the dashboard files here
```

Move the included workflow file to the **repository root**:

```text
kaggle-data-science-projects/.github/workflows/deploy-pages.yml
```

Do not leave the workflow inside `drug-classification/dashboard/.github`.

## Enable GitHub Pages

On GitHub:

1. Repository → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push to `main`
4. Open the Actions tab and wait for `Deploy Drug Dashboard to Pages` to finish

Expected URL:

```text
https://mr-amirasgari.github.io/kaggle-data-science-projects/
```

## Important: Vite base path

`vite.config.ts` is already configured for this repository:

```ts
base: "/kaggle-data-science-projects/"
```

If you rename the repository, change that value to `/<NEW_REPO_NAME>/`.

## Predictor

The dashboard uses a compact browser-side representation of the decision tree. It requires no Python server, which is why it works on GitHub Pages.

## Medical disclaimer

This is an educational portfolio project only. It is not medical advice, a clinical decision-support system, or a prescription tool.
