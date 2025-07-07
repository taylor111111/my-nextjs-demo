## 使用 DTO 隔离后端混乱数据：打造可维护的 BFF 接口

当前端开发者面对不一致、冗余或嵌套层级极深的后端数据时，开发效率与代码可维护性都会大打折扣。这时，DTO（数据传输对象）就成为前端的守护盾。在 BFF（Backend For Frontend）架构中，DTO 能将后端数据进行过滤与转化，变成前端可控、干净的数据契约。

本文将结合真实的 Next.js BFF 项目，介绍如何使用 `class-transformer` 与防御式编程，构建稳定、可预测的接口输出。

---

### 🧩 为什么 BFF 中需要 DTO？

#### ✅ 1. 字段过滤：前端只拿需要的字段

后端接口通常字段繁杂，而前端往往只需其中一部分。通过 DTO，我们可以精确声明前端真正关心的字段：

```ts
@Expose({ name: 'order_id' })
id: string;
```

结合 `@Expose` 和 `plainToInstance()` 使用，BFF 输出结构就能变得干净且最小化，不再“接口污染 UI”。

---

#### 🔀 2. 结构转化：让复杂结构变得好用

真实接口中常常字段命名混乱、层级嵌套，DTO 可以帮我们结构扁平化、语义清晰：

```ts
@Transform(({ obj }) => safeGet(obj, ['user_info', 'name'], 'Anonymous'))
@Expose()
userName: string;
```

将嵌套字段 `user_info.name` 转化为扁平字段 `userName`，即使路径不存在也有默认值兜底。

---

#### 🧯 3. 防御式编程：安全转换器封装

我们在 `safeTransformers.ts` 中封装了通用转换器，可安全地解析字符串、布尔、时间等字段，避免运行时出错：

```ts
export const toBooleanSafe = (path: string, fallback = false) =>
  transformSafe(({ obj }) => {
    const value = path.split('.').reduce((o, key) => o?.[key], obj);
    return value === 'true' || value === true || value === 1 || value === '1';
  }, fallback);
```

---

#### ⛓ 4. 类型修正：修正错误的布尔值

很多后端接口用 `'1'` / `'0'` 表示布尔值，通过 `@Transform` 可安全转换为真正的 `true` / `false`：

```ts
@Transform(({ value }) => value === '1')
@Expose()
isPaid: boolean;
```

---

#### 🛡 5. 抵抗后端结构变动

即使后端结构发生变化，DTO 依然能保证前端输出不受影响。如果后端字段增加或嵌套方式变化，只需在 DTO 层维护即可，UI 层无需修改。

---

### 📁 示例拆解

#### Mock 数据输入

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

#### DTO 定义

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

#### 接口输出

```ts
export async function GET() {
  const data = plainToInstance(OrderDto, mockOrder, {
    excludeExtraneousValues: true,
  });
  return NextResponse.json(data);
}
```

---

### 💡 总结

DTO 在 BFF 层不仅仅是数据转换工具，更是接口设计的核心组成部分：

* 🧹 **字段过滤**：只暴露前端真正需要的字段
* 🔄 **结构转化**：让数据更简洁、更语义化
* 🧯 **防御式容错**：统一 fallback，避免接口报错
* 🔗 **前后端解耦**：前端契约可控，不依赖后端结构

当我们把 BFF 看作边界层，DTO 就是它的守门员。即使后端混乱，前端依然可以稳定、安全、高效地运行。

---

下一篇文章我们将继续深入，介绍如何引入 Adapter 模式与版本化 DTO，进一步应对复杂数据流场景。
