# 使用 Styled-Components 实现可维护的样式管理

在本架构中，我们采用 `styled-components` 来处理样式，兼顾了组件化、可维护性与良好的开发体验。相比传统的 CSS Modules 或全局样式，`styled-components` 提供了更自然的 **CSS-in-JS** 体验，使得样式更贴近逻辑、组件更加内聚。

---

## 为什么选择 styled-components？

* ✅ **作用域隔离**：样式默认作用于当前组件，无需担心全局污染。
* ✅ **支持主题**：配合 `ThemeProvider` 实现主题定制。
* ✅ **样式逻辑可编程**：支持条件语句、变量、函数等。
* ✅ **SSR 友好**：支持 Next.js 服务端渲染。
* ✅ **TypeScript 支持良好**：类型推导自然，开发体验顺畅。

---

## 安装和配置

```bash
yarn add styled-components

# 配合 TypeScript 和 SSR 需要这些依赖
yarn add -D @types/styled-components babel-plugin-styled-components
```

### 配置 Babel（用于 SSR 和 className 美化）

创建或修改 `.babelrc`：

```json
{
  "presets": ["next/babel"],
  "plugins": [
    ["babel-plugin-styled-components", { "ssr": true, "displayName": true }]
  ]
}
```

⚠️ 如果你使用的是 Next.js 默认启用的 Turbopack，请注意 **暂时不支持 Babel**。建议切回 Webpack 模式以兼容 styled-components。

---

## 示例组件：StyledButton

```tsx
// components/StyledButton.tsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0059c1;
  }
`;

export default StyledButton;
```

在页面中使用：

```tsx
import StyledButton from '@/components/StyledButton';

export default function HomePage() {
  return <StyledButton>点击我</StyledButton>;
}
```

---

## 结合 ThemeProvider 使用

在 `_app.tsx` 中提供主题：

```tsx
import { ThemeProvider } from 'styled-components';

const theme = {
  primary: '#0070f3',
  danger: '#e00',
};

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

组件中访问主题：

```tsx
const StyledBox = styled.div`
  background-color: ${({ theme }) => theme.primary};
`;
```

---

## 测试支持

由于样式逻辑内聚，测试组件不再依赖外部 CSS 文件。只需渲染组件并断言其行为即可。

```tsx
// __tests__/StyledButton.test.tsx
import { render, screen } from '@testing-library/react';
import StyledButton from '../StyledButton';

test('renders StyledButton with text', () => {
  render(<StyledButton>测试按钮</StyledButton>);
  expect(screen.getByText('测试按钮')).toBeInTheDocument();
});
```

---

## 小结

通过引入 `styled-components`，我们使样式更加局部化、可编程、支持主题，且测试友好。这种方式非常适合中大型项目，能够有效提升开发效率与可维护性。

> ✅ 示例代码详见项目仓库：[GitHub/my-nextjs-demo](https://github.com/taylor111111/my-nextjs-demo)
