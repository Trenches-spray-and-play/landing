import { prisma } from '@/lib/db';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const supabaseId = searchParams.get('supabaseId');

    if (!supabaseId) {
        return NextResponse.json({ error: 'Missing supabaseId' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { supabaseId },
            include: {
                participants: true,
            }
        });

        if (user) {
            // Calculate queue position (users created before this user)
            const position = await prisma.user.count({
                where: {
                    createdAt: { lte: user.createdAt }
                }
            });

            // Get boost points from participants
            const boostPoints = user.participants.reduce((sum, p) => sum + (p.boostPoints || 0), 0);

            // Format joined date
            const joinedAt = user.createdAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });

            // Calculate referral count
            const referralCount = await prisma.user.count({
                where: { referredById: user.id }
            });

            return NextResponse.json({
                exists: true,
                user: {
                    ...user,
                    position,
                    boostPoints,
                    joinedAt,
                    referralCount,
                }
            });
        }

        return NextResponse.json({ exists: false });
    } catch (error) {
        console.error('Sync error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

    if (authError || !authUser) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { handle, email, walletSol, walletEvm, referredByCode } = body;

        // Check if user already exists
        let user = await prisma.user.findUnique({
            where: { supabaseId: authUser.id }
        });

        // Determine referrer if code provided
        let referrerId: string | null = null;
        if (referredByCode) {
            const referrer = await prisma.user.findUnique({
                where: { referralCode: referredByCode.toUpperCase() },
                select: { id: true }
            });
            if (referrer) {
                referrerId = referrer.id;
            }
        }

        if (user) {
            // Update existing user
            user = await prisma.user.update({
                where: { id: user.id },
                data: {
                    handle: handle || user.handle,
                    email: email || authUser.email,
                    walletSol: walletSol || user.walletSol,
                    walletEvm: walletEvm || user.walletEvm,
                    // Only set referrer if not already set
                    ...(referrerId && !user.referredById ? { referredById: referrerId } : {})
                }
            });
        } else {
            // Create new user (automatically joining waitlist)
            const generatedCode = Math.random().toString(36).substring(2, 10).toUpperCase();

            user = await prisma.user.create({
                data: {
                    supabaseId: authUser.id,
                    handle: handle || `@user_${authUser.id.slice(0, 8)}`,
                    email: email || authUser.email,
                    walletSol,
                    walletEvm,
                    referralCode: generatedCode,
                    referredById: referrerId,
                    beliefScore: 0,
                }
            });

            // Optional: If you want to award the "Instant BP" for referral here too:
            if (referrerId) {
                await prisma.user.update({
                    where: { id: referrerId },
                    data: { beliefScore: { increment: 50 } }
                });
            }
        }

        // Calculate position for new user (rank = how many users joined before or at same time)
        const position = await prisma.user.count({
            where: {
                createdAt: { lte: user.createdAt }
            }
        });

        // Get boost points
        const participants = await prisma.participant.findMany({
            where: { userId: user.id }
        });
        const boostPoints = participants.reduce((sum, p) => sum + (p.boostPoints || 0), 0);

        // Format joined date
        const joinedAt = user.createdAt.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        // Calculate referral count
        const referralCount = await prisma.user.count({
            where: { referredById: user.id }
        });

        return NextResponse.json({
            success: true,
            user: {
                ...user,
                position,
                boostPoints,
                joinedAt,
                referralCount,
            }
        });
    } catch (error) {
        console.error('Create/Update user error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
