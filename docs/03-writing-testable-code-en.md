# Writing Testable JavaScript Code: Principles and Practice

In modern frontend development, ensuring that your code is **testable** is just as important as writing functionality that works. This article will guide you through the principles of writing testable JavaScript code and provide concrete examples using the architecture from the `my-nextjs-demo` project.

## Why Testable Code Matters

Testable code enables:

* ✅ **Automation**: Ensures code reliability via CI/CD pipelines
* ✅ **Confidence**: Allows developers to refactor code without fear
* ✅ **Collaboration**: Makes it easier for team members to understand and verify code behavior

Poorly structured or tightly coupled code is difficult to test, leading to fragile applications and low developer productivity.

## Core Principles of Testable Code

### 1. **Keep Functions Pure Whenever Possible**

Pure functions have no side effects and always return the same output for the same input.

```ts
// ✅ Good
function add(a, b) {
  return a + b;
}

// ❌ Bad
function addWithLog(a, b) {
  console.log(a + b); // Side effect
  return a + b;
}
```

### 2. **Decouple Logic from Side Effects (like UI or I/O)**

Move business logic out of components, services, or event handlers. Keep them in testable units like reducers or pure helpers.

```ts
// src/utils/calc.ts
export function calcTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// src/components/Cart.tsx
import { calcTotal } from '@/utils/calc';
```

### 3. **Single Responsibility Principle**

Each module or function should do one thing. This makes unit testing simpler and reduces unexpected bugs.

### 4. **Avoid Global State and Implicit Dependencies**

Pass dependencies explicitly rather than accessing globals or hidden context.

```ts
// ✅ Pass dependency
function fetchData(apiClient) {
  return apiClient.get('/user');
}
```

## Real-World Application: Testing Redux Logic

In our architecture, Redux slices encapsulate the core logic of the application, and we test them separately from the UI.

```ts
// userSlice.ts
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.name = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.name = '';
      state.isLoggedIn = false;
    },
  },
});
```

```ts
// store.test.ts
it('should login user with name', () => {
  store.dispatch(login('Taylor'));
  const state = store.getState().user;
  expect(state.name).toBe('Taylor');
  expect(state.isLoggedIn).toBe(true);
});
```

## Bonus: Folder Structure Helps Testing

We use a folder layout like:

```
src/
├── store/         # Logic layer
├── components/    # UI layer
├── utils/         # Pure helper functions
└── tests/         # All unit/integration tests
```

This encourages writing small, independent units that are easy to test.

## Summary

Writing testable JavaScript code is not just about tests—it's about design. By applying clear principles—**pure functions**, **separation of concerns**, and **explicit dependencies**—you create code that's easier to maintain, scale, and trust.

> 🧪 Full code examples are available in the [GitHub repository](https://github.com/taylor111111/my-nextjs-demo)

## Coming Up Next

In the next article, we’ll demonstrate how to test async logic using Redux thunks and mocking API requests.
