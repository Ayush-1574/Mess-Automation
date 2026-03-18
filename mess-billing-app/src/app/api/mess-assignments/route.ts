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

        const assignments = await prisma.studentMessAssignment.findMany({
            where,
            include: {
                student: { select: { id: true, entryNo: true, name: true } },
                mess: true,
                session: true,
            },
            orderBy: { id: 'desc' }
        });
        return NextResponse.json(assignments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch mess assignments' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { entryNo, messId, sessionId } = await request.json();
        if (!entryNo || !messId || !sessionId) {
            return NextResponse.json({ error: 'entryNo, messId and sessionId are required' }, { status: 400 });
        }

        const student = await prisma.student.findUnique({ where: { entryNo } });
        if (!student) return NextResponse.json({ error: `Student ${entryNo} not found` }, { status: 404 });

        const assignment = await prisma.studentMessAssignment.upsert({
            where: { studentId_sessionId: { studentId: student.id, sessionId: Number(sessionId) } },
            update: { messId: Number(messId) },
            create: { studentId: student.id, messId: Number(messId), sessionId: Number(sessionId) },
            include: { student: true, mess: true, session: true }
        });
        return NextResponse.json(assignment, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create mess assignment' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await prisma.studentMessAssignment.delete({ where: { id: Number(id) } });
        return NextResponse.json({ message: 'Assignment deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete assignment' }, { status: 500 });
    }
}
