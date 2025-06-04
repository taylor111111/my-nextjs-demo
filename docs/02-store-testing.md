# 使用 Jest + Testing Library 测试 Redux Store：逻辑与 UI 的解耦

在现代前端开发中，**保持业务逻辑与 UI 解耦**是提升可维护性与可测试性的关键策略。本篇文章将展示如何结合 **Jest + Testing Library** 对 Redux Store 进行逻辑层测试，从而构建稳定且健壮的前端架构。

## 背景与动机

许多团队在使用 Redux 时，测试往往集中在 UI 层（组件测试），而忽略了对 Redux 的 **Action / Reducer / Store 行为** 的直接测试。这不仅导致测试冗余，还难以覆盖逻辑边界。本项目采用的架构中，Redux Store 独立组织，天然适配逻辑层单元测试。

## 技术栈说明

* [Jest](https://jestjs.io/)：作为主力测试框架，支持单元测试、Mock、覆盖率等功能
* [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)：组件测试工具，但在本篇不涉及 UI 部分
* Redux Toolkit：官方推荐的 Redux 工具集，封装了简洁的 reducer 创建与 store 配置

## 文件结构概览

```bash
src/
├── store/
│   ├── index.ts     # store 实例定义
│   └── userSlice.ts # 业务 slice 示例
└── tests/
    └── store.test.ts # 逻辑层测试用例
```

## 示例：对 userSlice 的测试

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

## Tips：逻辑与 UI 解耦的优势

* ✅ **易于测试**：逻辑行为可以在不依赖组件的情况下验证
* ✅ **便于维护**：更清晰地分离 UI 层与状态层的职责
* ✅ **增强协作**：逻辑代码更容易被后端、测试同事阅读与复用

## 后续

下一篇将介绍如何将 Redux store 与组件层结合并使用 Testing Library 对 UI 层进行集成测试，并探索异步 thunk 的测试方式。

> 📌 你也可以在本项目的 `tests/` 目录下查看完整源码： [GitHub 项目地址](https://github.com/taylor111111/my-nextjs-demo)
