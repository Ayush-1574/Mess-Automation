import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');
        const studentId = searchParams.get('studentId');

        const where: any = {};
        if (sessionId) where.sessionId = Number(sessionId);
        if (studentId) where.studentId = Number(studentId);

        const payments = await prisma.feesDeposited.findMany({
            where,
            include: {
                student: { select: { id: true, entryNo: true, name: true } },
                session: true,
            },
            orderBy: { paymentDate: 'desc' }
        });
        return NextResponse.json(payments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { entryNo, sessionId, amount, paymentDate } = await request.json();
        if (!entryNo || !sessionId || amount == null || !paymentDate) {
            return NextResponse.json({ error: 'entryNo, sessionId, amount and paymentDate are required' }, { status: 400 });
        }

        const student = await prisma.student.findUnique({ where: { entryNo } });
        if (!student) return NextResponse.json({ error: `Student ${entryNo} not found` }, { status: 404 });

        const payment = await prisma.feesDeposited.create({
            data: {
                studentId: student.id,
                sessionId: Number(sessionId),
                amount: Number(amount),
                paymentDate: new Date(paymentDate),
            },
            include: { student: true, session: true }
        });
        return NextResponse.json(payment, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await prisma.feesDeposited.delete({ where: { id: Number(id) } });
        return NextResponse.json({ message: 'Payment deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete payment' }, { status: 500 });
    }
}
