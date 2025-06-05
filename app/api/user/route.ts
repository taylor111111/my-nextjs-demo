import { NextResponse } from 'next/server';
import { mockUser } from "@/mocks";

export async function GET() {
    return NextResponse.json(mockUser);
}
