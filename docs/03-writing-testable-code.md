# 编写可测试的 JavaScript 代码：原则与实战

在构建现代 Web 应用时，**可测试性**不仅是代码质量的体现，更是团队协作与长期维护的基石。本文结合实践项目，讲解如何编写可测试的 JavaScript（尤其是 React + Redux）代码。

---

## 为什么关注可测试性？

可测试的代码意味着：

* ✅ 容易被验证：能通过自动化测试快速反馈正确性
* ✅ 容易被重构：结构清晰、耦合度低
* ✅ 容易被协作：他人更容易理解与接手你的代码

> 🧠 关键词：**可观察性（Observability）**、**可控制性（Controllability）**、**可隔离性（Isolation）**

---

## 可测试代码的五大原则

### 1. 分离逻辑与视图（Separation of Concerns）

**错误示范：**

```tsx
// 逻辑和视图紧耦合，难以单独测试
const LoginButton = () => {
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    const user = await loginApi();
    store.dispatch(login(user.name));
    setLoading(false);
  }
  return <button onClick={handleLogin}>Login</button>;
}
```

**优化方式：**
将逻辑抽离成独立模块或 hook：

```ts
// useLogin.ts
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const loginHandler = async () => {
    const user = await loginApi();
    dispatch(login(user.name));
  }
  return { loginHandler };
};
```

```tsx
// LoginButton.tsx
const LoginButton = () => {
  const { loginHandler } = useLogin();
  return <button onClick={loginHandler}>Login</button>;
};
```

---

### 2. 使用纯函数处理状态

将副作用隔离，使得 reducer / logic 层具备稳定输入输出。

```ts
// userSlice.ts
const initialState = { name: '', isLoggedIn: false };

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
  }
});
```

这些 reducer 是 **纯函数**，天然可测试。

---

### 3. 明确依赖注入（Dependency Injection）

不要在模块内部直接调用外部服务，应当将依赖作为参数传入：

```ts
// Bad: 直接耦合 API
const fetchUser = () => loginApi();

// Good: 注入依赖，便于 mock
const fetchUser = (api: () => Promise<User>) => api();
```

---

### 4. 使用 Mock + 单元测试验证边界行为

```ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { login, logout } from '@/store/userSlice';

describe('User Store', () => {
  const store = configureStore({ reducer: { user: userReducer } });

  it('logs in user', () => {
    store.dispatch(login('Taylor'));
    expect(store.getState().user.isLoggedIn).toBe(true);
  });
});
```

---

### 5. 保持单一职责（Single Responsibility Principle）

一个函数 / 模块只做一件事。例如不要在一个组件里同时管理状态、处理请求、操作 UI。

---

## 项目中的实例应用

在 [my-nextjs-demo](https://github.com/taylor111111/my-nextjs-demo) 项目中，我们遵循了以上原则：

* `store/` 中的 slice 均为纯函数
* 使用 `tests/store.test.ts` 单元测试 Redux 逻辑
* 将异步操作拆分成 hook 并注入依赖
* UI 组件保持职责单一，仅进行渲染

---

## 总结

可测试性不是结果，而是设计策略。每一次“提取副作用”、“拆分逻辑”、“注入依赖”的动作，都是为了让代码更稳定、更可靠、更易被信任。

🧪 **下一篇预告**：《如何测试异步 Thunk 与 API 调用》

---

📎 示例项目地址：[https://github.com/taylor111111/my-nextjs-demo](https://github.com/taylor111111/my-nextjs-demo)
📎 本文部分理念参考自《Writing Testable JavaScript Code》
