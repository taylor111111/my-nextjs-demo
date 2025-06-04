# Testing Redux Store with Jest + Testing Library: Decoupling Logic from UI

In modern frontend development, **decoupling business logic from UI components** is a key strategy for enhancing maintainability and testability. This post demonstrates how to use **Jest + Testing Library** to test a Redux store independently of the UI, laying the foundation for a robust architecture.

## Motivation

Many teams using Redux focus testing on the UI layer (component tests) and neglect direct testing of **Redux actions, reducers, and store behavior**. This leads to redundant tests and leaves logical edge cases uncovered. In the architecture used in this project, Redux logic is organized independently, making it naturally testable in isolation.

## Tech Stack

* [Jest](https://jestjs.io/): A powerful testing framework supporting unit testing, mocking, coverage, and more
* [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/): While mainly for component testing, it complements Jest well
* Redux Toolkit: The official toolset for Redux, providing simplified reducer creation and store configuration

## File Structure Overview

```bash
src/
├── store/
│   ├── index.ts        # store instance definition
│   └── userSlice.ts    # example business slice
└── tests/
    └── store.test.ts   # logic layer test cases
```

## Example: Testing `userSlice`

### userSlice.ts

```ts
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  name: '',
  isLoggedIn: false,
};

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

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
```

### store.test.ts

```ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { login, logout } from '@/store/userSlice';

describe('Redux Store - User Slice', () => {
  const store = configureStore({
    reducer: { user: userReducer },
  });

  it('should login user with name', () => {
    store.dispatch(login('Taylor'));
    const state = store.getState().user;
    expect(state.name).toBe('Taylor');
    expect(state.isLoggedIn).toBe(true);
  });

  it('should logout user', () => {
    store.dispatch(logout());
    const state = store.getState().user;
    expect(state.name).toBe('');
    expect(state.isLoggedIn).toBe(false);
  });
});
```

## Benefits of Logic-UI Decoupling

* ✅ **Easier Testing**: You can validate logic without relying on UI rendering
* ✅ **Maintainability**: Clean separation of responsibilities
* ✅ **Team Collaboration**: Business logic is readable and reusable across developers and roles

## Next Steps

The next article will cover how to integrate Redux store with React components and test UI behavior using Testing Library, including strategies for testing async thunks.

> 📌 You can explore the full source code in the `tests/` directory of this project: [GitHub Repository](https://github.com/taylor111111/my-nextjs-demo)
