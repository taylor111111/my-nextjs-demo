# my-nextjs-demo

A production-ready **Next.js 15 (App Router)** demo showcasing modular frontend architecture, CI/CD, type safety, and testability — built for engineers aiming at mid-to-senior level excellence.

## 🔧 Tech Stack

| Category         | Stack                        |
| ---------------- | ---------------------------- |
| Framework        | Next.js 15 (App Router)      |
| Language         | TypeScript                   |
| State Management | Redux Toolkit                |
| Styling          | Tailwind CSS                 |
| Testing          | Jest + React Testing Library |
| CI/CD            | GitHub Actions + Vercel      |
| Linting & Format | ESLint, Prettier             |

## 📁 Project Structure

```bash
my-nextjs-demo/
├── app/                    # Next.js App Router pages/layouts
├── components/             # Reusable UI components
├── store/                  # Redux store and slices
├── tests/                  # Unit and integration tests
├── docs/                   # Architecture and design documentation
├── .github/workflows/      # CI pipelines (lint, test, build)
├── public/                 # Static assets
├── tsconfig.json           # TypeScript config (with path aliases)
└── ...
```

## 🚀 Scripts

| Command      | Description          |
| ------------ | -------------------- |
| `yarn dev`   | Run local dev server |
| `yarn lint`  | Run ESLint check     |
| `yarn test`  | Run unit tests       |
| `yarn build` | Build the app        |

## ✅ Features

* ✅ **App Router Architecture** — Clean modular file-based routing
* ✅ **Global State** — Scalable Redux Toolkit with logic/UI separation
* ✅ **Full CI Pipeline** — GitHub Actions auto-test/build/deploy
* ✅ **Test Coverage** — Isolated logic + UI testing with RTL
* ✅ **Clean Lint & Type Checks** — Ensures consistency and correctness

## 📄 Documentation

Architecture and technical explanation are documented under the [`/docs`](./docs/) folder. Recommended reading:

* [`docs/01-architecture-overview.md`](./docs/01-architecture-overview.md)
* [`docs/02-store-testing.md`](./docs/02-store-testing.md) 
* [`docs/03-writing-testable-code.md`](./docs/03-writing-testable-code.md)
* [`docs/04-ci-cd-setup.md`](./docs/04-ci-cd-setup.md)

## 🛆 Deployment

This project is auto-deployed to [Vercel](https://vercel.com/) via GitHub Actions when pushing to `main`.

## 🧪 CI Status

![CI](https://github.com/your-username/my-nextjs-demo/actions/workflows/ci.yml/badge.svg)

## 👤 Author

Taylor / [@taylor111111](https://github.com/taylor111111)

---

Feel free to fork, use, or reference this project in job applications, blogs, or tech talks.
