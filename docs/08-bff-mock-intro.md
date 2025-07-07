## 《构建 BFF Mock 层：前端独立开发的起点》

在现代前端开发中，等待后端接口往往是效率杀手。BFF（Backend For Frontend）作为前端独立性的重要一环，让我们能够更早地启动开发节奏。本篇文章将从实际项目出发，展示如何用 Next.js 构建一个完整的 Mock 层，让前端“动起来”，不再等接口。

---

### 🗂 项目目录结构

```bash
my-nextjs-demo/
├── mocks/
│   └── order.mock.ts               # 放 rawOrder 模拟数据
├── dtos/
│   └── order.dto.ts                # DTO 转换器（已写好）
├── utils/
│   └── safeTransformers.ts         # 工具函数（已写好）
├── app/
│   └── api/
│       └── order/
│           └── route.ts            # 接口处理逻辑
```

---

### 🧪 Step 1：构建 Mock 数据源

我们在 `/mocks/order.mock.ts` 中维护原始 mock 数据，例如：

```ts
export const rawOrders = [
  {
    id: '123',
    customerName: 'Alice',
    status: 'pending',
    items: [{ name: 'Product A', quantity: 2 }],
  },
  {
    id: '124',
    customerName: 'Bob',
    status: 'completed',
    items: [{ name: 'Product B', quantity: 1 }],
  },
];
```

---

### 🔀 Step 2：DTO 转换 - 用于解耦与字段收敛

`/dtos/order.dto.ts` 中使用 `class-transformer` 将原始数据转为前端友好的格式，字段清晰、类型安全，便于维护：

```ts
import { Expose, plainToInstance } from 'class-transformer';

export class OrderDTO {
  @Expose() id: string;
  @Expose() customerName: string;
  @Expose() status: string;
}

export function toOrderDTO(raw: any) {
  return plainToInstance(OrderDTO, raw, {
    excludeExtraneousValues: true,
  });
}
```

---

### 🛯 Step 3：安全转换（防御式编码）

为了避免原始数据中的字段缺失或类型错误，我们在 `/utils/safeTransformers.ts` 中封装了安全转换函数：

```ts
export function safeGet<T>(transformFn: () => T, fallback: T): T {
  try {
    return transformFn();
  } catch (e) {
    console.warn('SafeGet failed:', e);
    return fallback;
  }
}
```

---

### 🚀 Step 4：构建 API 接口（App Router + API Route）

在 `/app/api/order/route.ts` 中使用 Next.js 的 App Router 能力，快速实现服务端接口：

```ts
import { NextResponse } from 'next/server';
import { rawOrders } from '@/mocks/order.mock';
import { toOrderDTO } from '@/dtos/order.dto';
import { safeGet } from '@/utils/safeTransformers';

export async function GET() {
  const orders = rawOrders.map((raw) =>
    safeGet(() => toOrderDTO(raw), { id: '', customerName: '', status: '' })
  );

  return NextResponse.json({ data: orders });
}
```

---

### 💡 小结

BFF Mock 层的引入，不仅让前端可以在没有后端支持的情况下独立开发，更关键的是：

* **更快启动开发节奏**：告别“等接口”的低效期
* **更强数据掌控权**：自己定义字段与结构，避免后端字段污染
* **更强可维护性**：通过 DTO 和 safeGet，让接口输出更稳定

---

如果你也想重塑前端与后端的边界，Mock 层就是最佳起点。下一篇我们将讲讲：**DTO 的设计如何进一步守护接口质量**，让 BFF 不止于“能跑”，而是“可控”。
