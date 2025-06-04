# 项目架构概览：从状态管理到部署

本篇文档概述了 `my-nextjs-demo` 项目的整体技术架构，涵盖状态管理、测试体系、持续集成与部署等核心模块，帮助读者了解现代中大型前端项目的标准实践流程。

---

## 📦 技术栈概览

| 模块            | 技术                                                                           | 说明                         |
| ------------- | ---------------------------------------------------------------------------- | -------------------------- |
| 框架            | [Next.js 15](https://nextjs.org/)                                            | 应用于全栈 Web 开发，支持 App Router |
| 状态管理          | [Redux Toolkit](https://redux-toolkit.js.org/)                               | 推荐的 Redux 写法，简洁高效          |
| UI 组件库        | [Ant Design](https://ant.design/)                                            | 企业级 React UI 库             |
| 测试            | [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) | 单元测试、组件测试                  |
| Lint & Format | ESLint + Prettier                                                            | 保持代码规范一致                   |
| 包管理           | Yarn                                                                         | 快速稳定的依赖管理                  |
| 持续集成          | GitHub Actions                                                               | 自动测试 + 构建流程                |
| 部署            | Vercel                                                                       | 与 Next.js 高度集成的云部署平台       |

---

## 🧩 项目结构设计

```bash
my-nextjs-demo/
├── app/                # Next.js App Router 页面
├── store/              # Redux store 与各模块 slice
├── tests/              # 测试文件目录
├── public/             # 静态资源
├── docs/               # 项目文档目录
├── .github/workflows/  # GitHub Actions 配置
├── tsconfig.json       # TypeScript 配置
├── jest.config.ts      # Jest 测试配置
└── package.json
```

---

## 🏗️ 架构亮点

### 1. 逻辑与 UI 解耦

* Redux store 中抽离业务逻辑和状态，组件只负责 UI。
* store 可测试、可复用、易维护。

### 2. 完整的测试体系

* 使用 Testing Library 实现以用户为中心的测试。
* 单元测试覆盖 store 中的每个 slice reducer 行为。

### 3. TypeScript 强类型保证

* 使用严格的 TypeScript 配置，避免运行时错误。
* `createSlice` 自动推导类型，提升开发体验。

### 4. CI/CD 自动化流程

* 使用 GitHub Actions 实现：

    * Push 或 PR 到 main 分支时自动触发
    * 自动执行 lint + test + build
* 与 Vercel 集成，构建成功后自动部署到生产环境

---

## 🧪 示例代码片段

### `store/userSlice.ts`

```ts
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { isLoggedIn: false },
  reducers: {
    login: (state) => { state.isLoggedIn = true; },
    logout: (state) => { state.isLoggedIn = false; },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
```

### `tests/store.test.ts`

```ts
import { store } from '@/store';
import { login, logout } from '@/store/userSlice';

test('should handle login and logout', () => {
  store.dispatch(login());
  expect(store.getState().user.isLoggedIn).toBe(true);

  store.dispatch(logout());
  expect(store.getState().user.isLoggedIn).toBe(false);
});
```

---

## 🔚 小结

通过模块化、自动化、类型安全与可测试性的多重保障，该架构不仅适用于个人项目，也可平滑迁移到团队协作与中型企业级应用中。后续将继续拓展文档细节，详解测试策略与部署优化。

> 📚 下一篇推荐阅读： [Redux Toolkit 与 Testing Library 实践](./02-redux-testing.md)
