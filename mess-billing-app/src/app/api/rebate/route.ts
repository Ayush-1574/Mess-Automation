import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studentId, startDate, endDate, reason } = body;

        // studentId here is actually the Roll No string passed from frontend
        const rollNo = studentId;

        if (!rollNo || !startDate || !endDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const student = await prisma.student.findUnique({
            where: { rollNo }
        });

        if (!student) {
            return NextResponse.json({ error: `Student with Roll No ${rollNo} not found` }, { status: 404 });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            return NextResponse.json({ error: 'Start date must be before end date' }, { status: 400 });
        }

        // Check for overlaps
        const existingRebate = await prisma.rebate.findFirst({
            where: {
                studentId: student.id,
                OR: [
                    {
                        startDate: { lte: end },
                        endDate: { gte: start }
                    }
                ]
            }
        });

        if (existingRebate) {
            return NextResponse.json({ error: 'Rebate overlaps with an existing period' }, { status: 409 });
        }

        const rebate = await prisma.rebate.create({
            data: {
                studentId: student.id,
                startDate: start,
                endDate: end,
                reason,
                status: 'APPROVED', // Auto-approve as per user request
            },
        });

        return NextResponse.json(rebate, { status: 201 });
    } catch (error) {
        console.error('Rebate creation error:', error);
        return NextResponse.json({ error: 'Failed to create rebate' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get('studentId');

        if (studentId) {
            const rebates = await prisma.rebate.findMany({
                where: { studentId: Number(studentId) },
                orderBy: { startDate: 'desc' }
            });
            return NextResponse.json(rebates);
        }

        const rebates = await prisma.rebate.findMany({
            include: { student: true },
            orderBy: { startDate: 'desc' }
        });
        return NextResponse.json(rebates);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch rebates' }, { status: 500 });
    }
}
