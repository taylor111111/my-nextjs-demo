import { Expose, Transform, Type } from 'class-transformer';
import { safeGet } from '@/utils/transformers/safeTransformers';

export class OrderDto {
    // ✅ 过滤掉非 @Expose 字段（默认 class-transformer 不过滤）
    @Expose()

    // ✅ 格式转化：时间戳 → Date 对象
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt: Date;

    // ✅ 重命名：从 order_id → id
    @Expose({ name: 'order_id' })
    id: string;

    // ✅ 复杂路径提取 + 容错：obj?.user_info?.name
    @Transform(({ obj }) => safeGet(obj, ['user_info', 'name'], 'Anonymous'))
    @Expose()
    userName: string;

    // ✅ 布尔值转化：'1' | '0' → true | false
    @Transform(({ value }) => value === '1')
    @Expose()
    isPaid: boolean;
}
