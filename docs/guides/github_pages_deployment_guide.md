# Vite SPA GitHub Pages Deployment Guide

Guide to configuring automated CI/CD to build and deploy the Vanilla Web Book Tracker (Vite + TypeScript) to GitHub Pages via GitHub Actions.

---

## 1. Prerequisites

Navigate to **Settings** ➔ **Pages** in your GitHub repository:
- **Source**: Select **GitHub Actions** (instead of *Deploy from a branch*).

---

## 2. Vite Configuration (`vite.config.ts`)

Set `base: './'` so static assets are loaded correctly using relative paths (preventing blank page / 404 errors):

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Relative path ensures static assets load correctly on GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

---

## 3. GitHub Actions Configuration (`.github/workflows/deploy.yml`)

Create or update the `.github/workflows/deploy.yml` file:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
    paths:
      - 'src/**'
      - 'public/**'
      - 'index.html'
      - 'package.json'
      - 'package-lock.json'
      - 'vite.config.ts'
      - 'tsconfig.json'
      - '.github/workflows/deploy.yml'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm

      - name: Install and build
        run: |
          npm ci
          npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 4. Troubleshooting Common Issues

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **Blank page / Asset 404 error** | Missing `base: './'` in `vite.config.ts` | Add `base: './'` to `vite.config.ts` |
| **403 Error / Permission denied** | Missing `permissions` block in `deploy.yml` or Source not set to GitHub Actions | Update `permissions` in `deploy.yml` and check GitHub Settings ➔ Pages |
| **Build failure at `npm run build`** | TypeScript / typecheck errors | Run `npm run typecheck` locally to fix errors before pushing |
| **Workflow does not trigger automatically** | Branch mismatch (`master`/`main`) or pushed files not matching `paths` filter | Check your primary branch name and the `paths` list in `deploy.yml` |
