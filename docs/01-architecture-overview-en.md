# 01 - Architecture Overview

This project demonstrates a production-level frontend architecture built with **Next.js 15 App Router**, aimed at showcasing senior-level engineering standards. It integrates TypeScript, Redux Toolkit, Tailwind CSS, and Testing Library, and is compatible with Vercel CI/CD pipelines.

## Goals

- Ensure clear modularity and scalability.
- Decouple logic and UI for testability.
- Enable unit testing and automation pipelines from day one.
- Provide readable and maintainable folder structure.
- Build with industry-standard ESLint rules and CI checks.

## Tech Stack

| Area            | Tool                      | Purpose                                           |
|-----------------|---------------------------|---------------------------------------------------|
| Framework       | Next.js 15 (App Router)   | Routing, SSR, file-based structure                |
| Language        | TypeScript                | Static typing, better maintainability             |
| State Management| Redux Toolkit             | Scalable state handling, RTK best practices       |
| Styling         | Tailwind CSS              | Utility-first responsive styling                  |
| Testing         | Jest + Testing Library    | Unit + UI testing                                 |
| Linting         | ESLint                    | Code quality enforcement                          |
| CI/CD           | GitHub Actions + Vercel   | Auto test/build/deploy on push                    |

## Folder Structure
```bash
my-nextjs-demo/
├── app/ # Next.js app directory (routing, layout)
├── components/ # Reusable UI components
├── store/ # Redux slices & store configuration
├── tests/ # Unit test files
├── docs/ # Documentation markdown files
├── public/ # Static assets
├── styles/ # Tailwind CSS config or global styles
├── .github/workflows/ # GitHub CI workflows
├── next.config.ts # Next.js config
├── tsconfig.json # TS config with aliases
├── package.json
└── yarn.lock
```


## Redux Structure

Redux Toolkit is used to handle state management. Slices are kept modular.

```ts
// store/userSlice.ts
const userSlice = createSlice({
  name: 'user',
  initialState: { isLoggedIn: false },
  reducers: {
    login: (state) => { state.isLoggedIn = true },
    logout: (state) => { state.isLoggedIn = false }
  }
});
```
Slices are combined into a store and provided globally in store/index.tsx.

## Testing Strategy
1. All reducers and logic are tested in isolation.
2. UI testing uses @testing-library/react for black-box verification.
3. Tests run in CI via GitHub Actions on every push to main.

## CI/CD
The project uses a GitHub Actions pipeline to:

1. Lint the code (yarn lint)
2. Run tests (yarn test)
3. Build the app (yarn build)
4. Auto-deploy to Vercel on success
5. This ensures code quality and fast feedback for every commit.



