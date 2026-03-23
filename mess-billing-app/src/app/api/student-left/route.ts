import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { studentId, sessionId, leaveDate } = await request.json();

        if (!studentId || !sessionId || !leaveDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const record = await prisma.studentLeft.upsert({
            where: {
                studentId_sessionId: {
                    studentId: Number(studentId),
                    sessionId: Number(sessionId)
                }
            },
            update: {
                leaveDate: new Date(leaveDate)
            },
            create: {
                studentId: Number(studentId),
                sessionId: Number(sessionId),
                leaveDate: new Date(leaveDate)
            }
        });

        return NextResponse.json(record);
    } catch (error: any) {
        console.error('StudentLeft error:', error);
        return NextResponse.json({ error: error.message || 'Failed to save' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Missing record id' }, { status: 400 });
        }

        await prisma.studentLeft.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('StudentLeft delete error:', error);
        return NextResponse.json({ error: error.message || 'Failed to delete' }, { status: 500 });
    }
}
