import { NextResponse } from 'next/server';
import { MOCK_TRENCHES } from '@/lib/mockData';

export async function GET() {
    // In a real app, fetch from DB
    return NextResponse.json({
        data: Object.values(MOCK_TRENCHES),
        meta: {
            updatedAt: new Date().toISOString()
        }
    });
}
