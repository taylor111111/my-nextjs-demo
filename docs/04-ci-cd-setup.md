# 03 - CI/CD 设置指南

在本篇文档中，我们将介绍如何为你的 Next.js 应用配置完整的 CI/CD 流程，包括自动测试、构建和部署。该流程基于 GitHub Actions 与 Vercel 实现。

---

## 📦 技术栈

* Next.js
* GitHub Actions（用于 CI）
* Vercel（用于自动部署）
* Jest + Testing Library（用于测试）

---

## ⚙️ GitHub Actions 配置

我们在 `.github/workflows/ci.yml` 中创建了如下工作流文件：

```yml
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
      - name: Checkout 代码
        uses: actions/checkout@v3

      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: 安装依赖
        run: yarn install --frozen-lockfile

      - name: 运行 ESLint
        run: yarn lint || true  # 若不想因 lint 阻塞测试，可忽略错误

      - name: 运行测试
        run: yarn test

      - name: 构建项目
        run: yarn build
```

---

## 🚀 自动部署到 Vercel

当你将项目部署到 Vercel 并绑定 GitHub 仓库后，Vercel 会自动在：

* 每次 `main` 分支 push 时
* 每次 PR 合并到 `main` 分支时

触发部署流程。

你可以在 [Vercel Dashboard](https://vercel.com/dashboard) 查看每次部署详情。

---

## ✅ 成果展示

设置完成后，每次提交都会自动：

1. 安装依赖
2. 运行 ESLint
3. 运行 Jest 测试
4. 构建项目
5. 自动部署（由 Vercel 接管）

---

## 📁 文件结构建议

将 CI/CD 相关文件放置于如下结构：

```
.github/
└── workflows/
    └── ci.yml
```

---

## 总结

配置好 CI/CD 后，你的项目将变得更加自动化与可靠：

* 防止错误代码被合入主干
* 自动执行测试保障质量
* 保持线上版本最新

下一篇将介绍如何测试 Redux 异步逻辑，并 mock API 请求。
