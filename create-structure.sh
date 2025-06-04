#!/bin/bash

echo "📁 正在创建扩展目录结构..."

mkdir -p app/products/[id]
mkdir -p app/dashboard
mkdir -p app/auth
mkdir -p components
mkdir -p lib
mkdir -p hooks
mkdir -p store
mkdir -p styles
mkdir -p tests
mkdir -p e2e

# 创建核心文件
touch app/layout.tsx
touch app/page.tsx
touch app/products/page.tsx
touch app/products/[id]/page.tsx
touch app/dashboard/page.tsx
touch app/auth/page.tsx
touch app/error.tsx

touch components/.gitkeep
touch lib/.gitkeep
touch hooks/.gitkeep
touch store/index.ts
touch styles/globals.css
touch styles/Home.module.css
touch tests/.gitkeep
touch e2e/.gitkeep

echo "✅ 目录结构创建完成！"

