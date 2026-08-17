# GitHub Pages: Drug + Loan Dashboards

Your Drug dashboard currently owns the repository Pages root:

```text
https://mr-amirasgari.github.io/kaggle-data-science-projects/
```

This Loan dashboard is configured for:

```text
https://mr-amirasgari.github.io/kaggle-data-science-projects/loan-credit-analysis/
```

Replace the repository-root workflow with the included:

```text
.github/workflows/deploy-pages.yml
```

The workflow:
1. builds/tests `drug-classification`
2. builds/tests `loan-credit-analysis`
3. publishes Drug at the Pages root
4. publishes Loan at `/loan-credit-analysis/`

This preserves the existing Drug live demo while adding the second dashboard.
