import { NextResponse } from 'next/server';
import { mockUser, mockProducts } from '@/mocks';

export async function GET() {
    // 模拟聚合接口：用户信息 + 商品列表
    const data = {
        user: {
            name: mockUser.name,
            role: mockUser.role,
        },
        products: mockProducts.map(({ id, name }) => ({ id, name })),
    };

    return NextResponse.json(data);
}
