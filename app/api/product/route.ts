import { NextResponse } from 'next/server';
import { mockProducts } from '@/mocks';

export async function GET() {
    return NextResponse.json(mockProducts);
}
