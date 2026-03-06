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

        const rebates = await prisma.monthlyRebate.findMany({
            where,
            include: {
                student: { select: { id: true, rollNo: true, name: true } },
                session: true,
            },
            orderBy: [{ year: 'desc' }, { month: 'desc' }]
        });
        return NextResponse.json(rebates);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch rebates' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { rollNo, sessionId, month, year, rebateDays } = await request.json();
        if (!rollNo || !sessionId || !month || !year || rebateDays == null) {
            return NextResponse.json({ error: 'rollNo, sessionId, month, year and rebateDays are required' }, { status: 400 });
        }
        if (month < 1 || month > 12) {
            return NextResponse.json({ error: 'month must be between 1 and 12' }, { status: 400 });
        }

        const student = await prisma.student.findUnique({ where: { rollNo } });
        if (!student) return NextResponse.json({ error: `Student ${rollNo} not found` }, { status: 404 });

        const rebate = await prisma.monthlyRebate.upsert({
            where: {
                studentId_sessionId_month_year: {
                    studentId: student.id,
                    sessionId: Number(sessionId),
                    month: Number(month),
                    year: Number(year),
                }
            },
            update: { rebateDays: Number(rebateDays) },
            create: {
                studentId: student.id,
                sessionId: Number(sessionId),
                month: Number(month),
                year: Number(year),
                rebateDays: Number(rebateDays),
            },
            include: { student: true, session: true }
        });
        return NextResponse.json(rebate, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create rebate' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await prisma.monthlyRebate.delete({ where: { id: Number(id) } });
        return NextResponse.json({ message: 'Rebate deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete rebate' }, { status: 500 });
    }
}
