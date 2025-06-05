# 《什么是 BFF？为什么前端需要它》

## 引子：传统接口开发的困境

在现代前端开发中，我们早已告别“只写页面”的年代。尤其在大型系统中，接口不再是后端定义好的“固定资产”，而是一个不断变化、协同演进的产物。

曾几何时，前端常常被卡在两个困境中：后端接口不符合页面需求，却又无权修改结构；想要 mock 数据，又担心最终结构不一致，改动代价巨大。更令人头痛的是，同一个数据接口，多个页面都要调用，结果传来传去，代码臃肿、结构重复、难以维护。

这时，一种更灵活、更贴近前端视角的架构方式开始兴起：**BFF（Backend For Frontend）**。

---

## 什么是 BFF？不是“中间层”那么简单

BFF 的全称是 Backend For Frontend，它是一个位于前端和后端之间的接口层，**由前端团队维护**，服务于前端页面。

BFF 的核心目的不是“再造一个后端”，而是：

* 按照页面需求定制接口结构
* 聚合多个服务端接口
* 统一格式、过滤字段、增强 mock 能力
* 提供灵活性，缓冲前后端的结构不一致

举个例子：

```text
用户页面
   ↓
/api/user-dashboard   ← BFF 接口
   ↓
[聚合后端 user + order + permission 接口]
```

从表面看，它像个“中间层”；但从前端角度看，它是对接口结构的主动掌控。

---

## 为什么前端更需要 BFF？

BFF 的价值，不在于“多一层”，而在于多了这些能力：

### 👩‍🔧 1. 数据裁剪

后端常返回一大堆字段，而页面只用其中几个。BFF 能精准筛选和转换数据，只暴露页面需要的字段。

### 🔗 2. 接口聚合

一个页面需要同时获取订单、用户、权限信息？传统做法是前端多次调用接口。BFF 可以聚合多个服务端接口，一次请求搞定。

### 🛡️ 3. 屏蔽后端变化

通过 DTO（数据转换对象）机制，BFF 可以将服务端的结构映射成前端所需结构。后端字段变化了，前端不需要跟着改。

### 🧪 4. mock 能力

开发阶段，后端接口可能尚未完成。BFF 提供 mock 能力，模拟接口数据，让页面可以提前开发，提升效率。

### ❎（选做）5. 缓存 / 节流

缓存可以提升性能，但也可能带来数据不一致等问题。BFF 可选择实现，但我当前版本中尚未启用，以控制复杂性。

---

## 我亲手实践的 BFF 架构

我基于 Next.js 的 App Router 架构搭建了自己的 BFF 模型，包含以下部分：

* `/app/api/*/route.ts`：BFF 接口定义
* `/mocks`：本地 mock 数据
* `/dtos`：数据转换器，使用 class-transformer 封装 DTO 结构
* `/utils/safeTransformers.ts`：自定义更稳健的转换逻辑，减少判断重复

例如，`/api/order` 的处理流程如下：

```ts
import { rawOrders } from '@/mocks/orders';
import { OrderDto } from '@/dtos/order.dto';
import { plainToInstance } from 'class-transformer';

export async function GET() {
  const orders = plainToInstance(OrderDto, rawOrders, {
    excludeExtraneousValues: true,
  });
  return Response.json(orders);
}
```

在 `OrderDto` 中，我实现了字段过滤、字段重命名、时间格式转化，并使用 `@Transform` 和 `@Expose` 精准控制字段行为：

```ts
@Expose({ name: 'order_id' })
id: string;

@Transform(({ value }) => new Date(value), { toClassOnly: true })
createdAt: Date;

@Transform(({ obj }) => obj?.user_info?.name ?? '', { toClassOnly: true })
userName: string;
```

---

## 总结：前端的边界，正在悄悄扩张

BFF 并不是前端的“额外工作”，而是接口主权的一种回归。

它让我们：

* 拿回接口结构控制权
* 提高页面开发效率与 mock 流畅度
* 应对服务端结构变化，保障前端稳定性

更重要的是，它体现了前端对系统架构的理解与介入能力。

正如我在项目中一步步实现裁剪、聚合、mock、DTO 封装的过程一样，BFF 不只是工具，而是一种前端架构思维的转变。

**下一篇，我会继续写 BFF 的架构组织与最佳实践，敬请期待。**
