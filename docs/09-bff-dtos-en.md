## Using DTOs to Isolate Backend Chaos: Building Maintainable BFF APIs

When frontend developers face inconsistent, verbose, or deeply nested backend data, productivity and maintainability suffer. This is where DTO (Data Transfer Object) comes in. In a BFF (Backend For Frontend) architecture, DTOs serve as a powerful shield — filtering and transforming backend data into clean, frontend-ready contracts.

In this article, we’ll explore how to use `class-transformer` and defensive programming in a real-world Next.js BFF setup to build robust, predictable APIs.

---

### 🧩 Why Use DTOs in BFF?

#### ✅ 1. Field Filtering: Take Only What Frontend Needs

Backends often return verbose payloads with dozens of fields. With DTOs, you can explicitly define only the data your frontend actually uses:

```ts
@Expose({ name: 'order_id' })
id: string;
```

By combining `@Expose` and `plainToInstance()`, your BFF output is clean and minimal — no more polluted interfaces.

---

#### 🔀 2. Structural Transformation: Make Complex Data Usable

Nested fields, misleading naming, and inconsistent formats are common in real-world APIs. DTOs allow you to restructure data for clarity:

```ts
@Transform(({ obj }) => safeGet(obj, ['user_info', 'name'], 'Anonymous'))
@Expose()
userName: string;
```

This extracts and flattens a deeply nested `user_info.name` into a flat `userName`, with fallback handling if the path is broken.

---

#### 🧯 3. Defensive Coding with Safe Transformers

The `safeTransformers.ts` utility introduces reusable patterns to safely parse data. Whether parsing strings, dates, booleans or arrays, these helpers prevent runtime crashes:

```ts
export const toBooleanSafe = (path: string, fallback = false) =>
  transformSafe(({ obj }) => {
    const value = path.split('.').reduce((o, key) => o?.[key], obj);
    return value === 'true' || value === true || value === 1 || value === '1';
  }, fallback);
```

---

#### ⛓ 4. Type Correction: From Broken Strings to Real Booleans

Many backends represent booleans as strings like `'1'`, `'0'`, `'true'`. You can safely coerce these using `@Transform`:

```ts
@Transform(({ value }) => value === '1')
@Expose()
isPaid: boolean;
```

---

#### 🛡 5. Resilience Against Backend Evolution

Even if backend fields change, your DTO ensures your frontend interface remains stable. If new fields are added or structures change, only the DTO layer needs adjustment — not your UI.

---

### 📁 Example Walkthrough

#### Mock Input

```ts
const mockOrder = {
  order_id: 'A001',
  createdAt: 1717435800000,
  isPaid: '1',
  user_info: {
    name: 'Taylor',
  },
};
```

#### DTO Definition

```ts
export class OrderDto {
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @Expose()
  createdAt: Date;

  @Expose({ name: 'order_id' })
  id: string;

  @Transform(({ obj }) => safeGet(obj, ['user_info', 'name'], 'Anonymous'))
  @Expose()
  userName: string;

  @Transform(({ value }) => value === '1')
  @Expose()
  isPaid: boolean;
}
```

#### API Output

```ts
export async function GET() {
  const data = plainToInstance(OrderDto, mockOrder, {
    excludeExtraneousValues: true,
  });
  return NextResponse.json(data);
}
```

---

### 💡 Summary

DTOs in the BFF layer are more than just data mappers. They:

* 🧹 **Filter fields** to expose only what the frontend cares about
* 🔄 **Transform structure** into clean, flat, and usable objects
* 🧯 **Guard against malformed data** via fallback defaults
* 🔗 **Uncouple frontend contracts** from backend inconsistencies

By treating BFF as a boundary, and DTO as its gatekeeper, you can write APIs that are safe, semantic, and stable — even when your backend is not.

---

In the next post, we’ll explore how to further modularize this approach using adapters and versioned DTOs to handle complex real-world data flows.
