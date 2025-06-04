# CI/CD Setup for a Scalable Frontend Architecture

In this article, we’ll walk through how the `my-nextjs-demo` project integrates CI/CD to ensure reliable testing, linting, and automated deployment to Vercel.

## Why CI/CD Matters

CI/CD pipelines:

* 🚦 Catch bugs early with automated tests
* 🧹 Maintain code quality with lint checks
* 🚀 Deploy safely and efficiently with every push

---

## 1. CI/CD Flow Overview

Every time code is pushed to the `main` branch (or a PR is created), GitHub Actions automatically:

1. Installs dependencies
2. Runs ESLint for code style checking
3. Executes Jest tests
4. Builds the Next.js project
5. (Optional) Deploys to Vercel

---

## 2. GitHub Actions Configuration

File: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Run ESLint
        run: yarn lint || true

      - name: Run Jest tests
        run: yarn test

      - name: Build Next.js app
        run: yarn build
```

✅ You can enforce lint to fail CI by removing `|| true`.

---

## 3. Vercel Deployment

Our project is connected to Vercel. Each push to `main` triggers an auto-deployment.

### Steps to Connect:

1. Sign in to [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Link to `main` branch
4. Vercel will auto-detect Next.js and handle the rest

---

## 4. Tips & Best Practices

* Use `yarn build` locally before pushing to avoid CI surprises
* Keep test coverage > 80% to trust automation
* Use `.env.production` to test real backend before deploy
* Cache dependencies in GitHub Actions to speed up build

```yaml
      - name: Cache node_modules
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-modules-${{ hashFiles('**/yarn.lock') }}
```

---

## Summary

CI/CD is not just about automation—it's about creating a reliable, scalable, and professional workflow. With GitHub Actions + Vercel, our architecture supports:

* Early bug detection
* Consistent quality
* Zero-click deployment

> ✅ This setup works out of the box for most Next.js + Yarn monorepos.
