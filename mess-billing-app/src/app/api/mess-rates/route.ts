import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');
        const messId = searchParams.get('messId');

        const where: any = {};
        if (sessionId) where.sessionId = Number(sessionId);
        if (messId) where.messId = Number(messId);

        const rates = await prisma.messRate.findMany({
            where,
            include: { mess: true, course: true, session: true },
            orderBy: { id: 'desc' }
        });
        return NextResponse.json(rates);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch mess rates' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { messId, courseId, sessionId, monthlyRate } = await request.json();
        if (!messId || !courseId || !sessionId || monthlyRate == null) {
            return NextResponse.json({ error: 'messId, courseId, sessionId and monthlyRate are required' }, { status: 400 });
        }

        const rate = await prisma.messRate.upsert({
            where: {
                messId_courseId_sessionId: {
                    messId: Number(messId),
                    courseId: Number(courseId),
                    sessionId: Number(sessionId),
                }
            },
            update: { monthlyRate: Number(monthlyRate) },
            create: {
                messId: Number(messId),
                courseId: Number(courseId),
                sessionId: Number(sessionId),
                monthlyRate: Number(monthlyRate),
            },
            include: { mess: true, course: true, session: true }
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
