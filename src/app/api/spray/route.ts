import { NextResponse } from 'next/server';
import { createPendingTransaction } from '@/services/transaction.service';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { trenchId, amount, userHandle, targetAddress } = body;

        // Validation
        if (!trenchId || !amount || !userHandle || !targetAddress) {
            return NextResponse.json(
                { error: 'Missing required fields: trenchId, amount, userHandle, targetAddress' },
                { status: 400 }
            );
        }

        // Validate amount is positive
        if (amount <= 0) {
            return NextResponse.json(
                { error: 'Amount must be positive' },
                { status: 400 }
            );
        }

        // Find or create user by handle
        let user = await prisma.user.findUnique({
            where: { handle: userHandle },
        });

        if (!user) {
            // Create user if doesn't exist (should happen during onboarding)
            user = await prisma.user.create({
                data: {
                    handle: userHandle,
                    beliefScore: 0,
                },
            });
        }

        // Verify trench exists and is active
        const trench = await prisma.trench.findUnique({
            where: { id: trenchId },
        });

        if (!trench) {
            return NextResponse.json(
                { error: 'Trench not found' },
                { status: 404 }
            );
        }

        if (!trench.active) {
            return NextResponse.json(
                { error: 'Trench is not active' },
                { status: 400 }
            );
        }

        // Create pending transaction
        const transaction = await createPendingTransaction({
            userId: user.id,
            trenchId: trench.id,
            amount: Number(amount),
            targetAddress,
        });

        return NextResponse.json({
            success: true,
            data: {
                id: transaction.id,
                status: transaction.status,
                createdAt: transaction.createdAt.toISOString(),
                deadline: transaction.deadline.toISOString(),
            },
        });
    } catch (error) {
        console.error('Error creating spray transaction:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
