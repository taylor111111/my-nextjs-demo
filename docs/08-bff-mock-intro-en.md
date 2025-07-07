## Building a BFF Mock Layer: The Starting Point of Frontend Independence

In modern frontend development, waiting for backend APIs is often a major bottleneck. The concept of BFF (Backend For Frontend) gives frontend teams the autonomy to move faster. In this article, we’ll walk through how to build a complete BFF mock layer using Next.js, enabling frontend development without waiting on the backend.

---

### 🗂 Project Directory Structure

```bash
my-nextjs-demo/
├── mocks/
│   └── order.mock.ts               # Raw mock data
├── dtos/
│   └── order.dto.ts                # DTO converter
├── utils/
│   └── safeTransformers.ts         # Utility functions
├── app/
│   └── api/
│       └── order/
│           └── route.ts            # API handler
```

---

### 🧪 Step 1: Build the Mock Data Source

We maintain raw mock data in `/mocks/order.mock.ts`:

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

### 🔀 Step 2: DTO Transformation - Decoupling and Field Management

In `/dtos/order.dto.ts`, we use `class-transformer` to convert raw data into a clean, typed DTO for frontend consumption:

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

### 🛯 Step 3: Safe Transformation (Defensive Coding)

To guard against missing fields or type mismatches in raw data, we define a safe transformer in `/utils/safeTransformers.ts`:

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

### 🚀 Step 4: Building the API (App Router + API Route)

Using Next.js App Router, we quickly set up an API route in `/app/api/order/route.ts`:

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

### 💡 Summary

Adding a BFF mock layer enables the frontend to move forward independently of backend progress. More importantly, it brings:

* **Faster Development Cycles**: Say goodbye to "waiting on APIs"
* **Better Data Control**: Define your own data contracts
* **Improved Maintainability**: Use DTOs and safeGet to ensure stability and clarity

---

If you're looking to reshape the boundaries between frontend and backend, the mock layer is a great place to start. In the next post, we’ll explore how DTO design helps enforce and protect the quality of your APIs — moving from merely "runnable" to truly "robust."
