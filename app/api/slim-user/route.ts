import { NextResponse } from 'next/server';
import { mockUser } from '@/mocks';

export async function GET() {
    const { name, role } = mockUser;

    // 返回裁剪后的字段
    return NextResponse.json({ name, role });
}
