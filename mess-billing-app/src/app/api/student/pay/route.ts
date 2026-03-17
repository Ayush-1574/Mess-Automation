import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { studentId, sessionId, amount, paymentDate } = await req.json();

        if (!studentId || !sessionId || !amount || !paymentDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const feeRecord = await prisma.feesDeposited.create({
            data: {
                studentId: parseInt(studentId),
                sessionId: parseInt(sessionId),
                amount: parseFloat(amount),
                paymentDate: new Date(paymentDate),
            },
        });

        return NextResponse.json({ message: 'Payment recorded successfully', record: feeRecord }, { status: 201 });
    } catch (error) {
        console.error('Error recording payment:', error);
        return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 });
    }
}
