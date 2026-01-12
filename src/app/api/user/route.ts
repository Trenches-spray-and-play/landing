import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get('handle');

    // Mock Data
    const mockProfile = {
        handle: handle || '@user',
        beliefScore: 850,
        stats: {
            sprays: 12,
            exits: 4,
            earnings: '2.4k'
        },
        wallet: '0x71C...9A21',
        socials: {
            twitter: true,
            telegram: false
        }
    };

    return NextResponse.json({ data: mockProfile });
}

export async function POST(request: Request) {
    // Update user profile (e.g. wallet address)
    const body = await request.json();

    return NextResponse.json({
        success: true,
        message: 'Profile updated',
        data: body
    });
}
