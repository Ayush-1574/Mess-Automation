import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    try {
        const students = await prisma.student.findMany({
            include: {
                course: true,
                messAssignments: {
                    include: { mess: true, session: true },
                    ...(sessionId ? { where: { sessionId: Number(sessionId) } } : {})
                },
                monthlyRebates: {
                    include: { session: true },
                    ...(sessionId ? { where: { sessionId: Number(sessionId) } } : {})
                },
                feesDeposited: {
                    include: { session: true },
                    ...(sessionId ? { where: { sessionId: Number(sessionId) } } : {})
                },
            },
            orderBy: { rollNo: 'asc' }
        });

        const reportData = students.map(s => {
            const totalFees = s.feesDeposited.reduce((sum, f) => sum + f.amount, 0);
            const totalRebateDays = s.monthlyRebates.reduce((sum, r) => sum + r.rebateDays, 0);
            const currentAssignment = s.messAssignments[0];

            return {
                id: s.id,
                rollNo: s.rollNo,
                name: s.name,
                batch: s.batch,
                course: s.course?.name,
                mess: currentAssignment?.mess?.name || '-',
                hostel: s.hostel,
                bankAccountNo: s.bankAccountNo,
                bankName: s.bankName,
                ifsc: s.ifsc,
                messSecurity: s.messSecurity,
                totalFeesDeposited: totalFees,
                totalRebateDays,
                monthlyRebates: s.monthlyRebates,
                feesDeposited: s.feesDeposited,
            };
        });

        return NextResponse.json(reportData);
    } catch (error) {
        console.error('Consolidated view error:', error);
        return NextResponse.json({ error: 'Failed to fetch report data' }, { status: 500 });
    }
}
