import { NextResponse } from 'next/server';
import { mockOrder } from '@/mocks/order.mock';
import { OrderDto } from '@/dtos/order.dto';
import { plainToInstance } from 'class-transformer';

export async function GET() {
    // 转换成 OrderDto 实例
    const data = plainToInstance(OrderDto, mockOrder, {
        excludeExtraneousValues: true,
    });

    return NextResponse.json(data);
}
