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

        if (!sessionIdQuery) {
            return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
        }

        const sessionId = Number(sessionIdQuery);

        // A student is "in" a session if they have a mess assignment for it
        const totalAssigned = await prisma.studentMessAssignment.count({
            where: { sessionId }
        });

        const leftCount = await prisma.studentLeft.count({
            where: { sessionId }
        });

        // Other generic stats for the dashboard
        const totalStudents = await prisma.student.count();
        const totalPendingRebates = await prisma.monthlyRebate.count(); // Just a dummy metric for now, or total records

        return NextResponse.json({
            sessionStudents: totalAssigned,
            sessionLeft: leftCount,
            totalStudents,
            totalPendingRebates
        });
    } catch (error: any) {
        console.error('Dashboard Stats Error:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
