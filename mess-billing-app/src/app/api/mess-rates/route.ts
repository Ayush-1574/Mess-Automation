import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');
        const messId = searchParams.get('messId');
        const month = searchParams.get('month');

        const where: any = {};
        if (sessionId) where.sessionId = Number(sessionId);
        if (messId) where.messId = Number(messId);
        if (month) where.month = Number(month);

        const rates = await prisma.messRate.findMany({
            where,
            include: { mess: true, session: true },
            orderBy: [{ sessionId: 'desc' }, { month: 'asc' }]
        });
        return NextResponse.json(rates);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch mess rates' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { messId, sessionId, month, monthlyRate, gstPercentage } = await request.json();
        if (!messId || !sessionId || !month || monthlyRate == null) {
            return NextResponse.json({ error: 'messId, sessionId, month and monthlyRate are required' }, { status: 400 });
        }
        if (month < 1 || month > 12) {
            return NextResponse.json({ error: 'month must be between 1 and 12' }, { status: 400 });
        }

        const rate = await prisma.messRate.upsert({
            where: {
                messId_sessionId_month: {
                    messId: Number(messId),
                    sessionId: Number(sessionId),
                    month: Number(month),
                }
            },
            update: { monthlyRate: Number(monthlyRate), gstPercentage: gstPercentage != null ? Number(gstPercentage) : 0 },
            create: {
                messId: Number(messId),
                sessionId: Number(sessionId),
                month: Number(month),
                monthlyRate: Number(monthlyRate),
                gstPercentage: gstPercentage != null ? Number(gstPercentage) : 0,
            },
            include: { mess: true, session: true }
        });
        return NextResponse.json(rate, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to set mess rate' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await prisma.messRate.delete({ where: { id: Number(id) } });
        return NextResponse.json({ message: 'Rate deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete rate' }, { status: 500 });
    }
}
