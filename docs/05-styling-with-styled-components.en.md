### 📄 **04 - Maintainable Styling with Styled-Components**

In this architecture, we use `styled-components` for styling, achieving a balance between componentization, maintainability, and developer experience. Compared to traditional CSS Modules or global styles, `styled-components` provides a natural **CSS-in-JS** approach that keeps styles close to logic and enhances component cohesion.

---

## Why styled-components?

* ✅ **Scoped styles**: Styles are scoped by default, avoiding global conflicts.
* ✅ **Theming support**: Seamlessly integrates with `ThemeProvider` for custom themes.
* ✅ **Programmable styles**: Allows conditions, variables, and functions in styles.
* ✅ **SSR friendly**: Fully compatible with Next.js server-side rendering.
* ✅ **TypeScript ready**: Great type inference and DX out of the box.

---

## Installation and Configuration

```bash
yarn add styled-components

# Required for TypeScript + SSR support
yarn add -D @types/styled-components babel-plugin-styled-components
```

### Babel Setup (for SSR and readable classNames)

Create or update `.babelrc`:

```json
{
  "presets": ["next/babel"],
  "plugins": [
    ["babel-plugin-styled-components", { "ssr": true, "displayName": true }]
  ]
}
```

⚠️ If you’re using the default Next.js **Turbopack**, note that **Babel is currently not supported**. You should switch back to Webpack for styled-components compatibility.

---

## Example Component: `StyledButton`

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

Usage in a page:

```tsx
import StyledButton from '@/components/StyledButton';

export default function HomePage() {
  return <StyledButton>Click Me</StyledButton>;
}
```

---

## Using ThemeProvider

In `_app.tsx`, provide the theme:

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

Access the theme in components:

```tsx
const StyledBox = styled.div`
  background-color: ${({ theme }) => theme.primary};
`;
```

---

## Test Support

Because styles are co-located with components, there's no dependency on external CSS files. You can simply render the component and assert behavior.

```tsx
// __tests__/StyledButton.test.tsx
import { render, screen } from '@testing-library/react';
import StyledButton from '../StyledButton';

test('renders StyledButton with text', () => {
  render(<StyledButton>Test Button</StyledButton>);
  expect(screen.getByText('Test Button')).toBeInTheDocument();
});
```

---

## Summary

With `styled-components`, styles become localized, programmable, themeable, and test-friendly. This approach is ideal for medium to large-scale projects, improving both developer productivity and code maintainability.

> ✅ Example code: [GitHub/my-nextjs-demo](https://github.com/taylor111111/my-nextjs-demo)
