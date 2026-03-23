import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const session = await auth();
        const userRole = (session?.user as any)?.role;
        if (userRole !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const sessionIdQuery = searchParams.get('sessionId');
        const type = searchParams.get('type');

        if (!sessionIdQuery || !type) {
            return NextResponse.json({ error: 'Missing sessionId or type' }, { status: 400 });
        }

        const sessionId = Number(sessionIdQuery);
        let students: any[] = [];

        if (type === 'assigned') {
            const assignments = await prisma.studentMessAssignment.findMany({
                where: { sessionId },
                include: { student: true, mess: true },
                orderBy: { student: { entryNo: 'asc' } }
            });
            students = assignments.map(a => ({
                id: a.student.id,
                name: a.student.name,
                entryNo: a.student.entryNo,
                hostel: a.student.hostel,
                info: a.mess.name
            }));
        } else if (type === 'left') {
            const lefts = await prisma.studentLeft.findMany({
                where: { sessionId },
                include: { student: true },
                orderBy: { student: { entryNo: 'asc' } }
            });
            students = lefts.map(l => ({
                id: l.student.id,
                name: l.student.name,
                entryNo: l.student.entryNo,
                hostel: l.student.hostel,
                info: `Left on ${new Date(l.leaveDate).toLocaleDateString('en-GB')}`
            }));
        } else if (type === 'total') {
            const allStudents = await prisma.student.findMany({
                orderBy: { entryNo: 'asc' }
            });
            students = allStudents.map(s => ({
                id: s.id,
                name: s.name,
                entryNo: s.entryNo,
                hostel: s.hostel,
                info: s.batch ? `Batch ${s.batch}` : 'Registered'
            }));
        }

        return NextResponse.json(students);
    } catch (error: any) {
        console.error('Dashboard Details Error:', error);
        return NextResponse.json({ error: 'Failed to fetch details' }, { status: 500 });
    }
}
