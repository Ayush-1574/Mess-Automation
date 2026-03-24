import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

function daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

function getYearForMonth(month: number, startYear: number, semester: string): number {
    if (semester === 'I') return month >= 7 ? startYear : startYear + 1;
    return month <= 6 ? startYear : startYear - 1;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get('studentId');
        const sessionId = searchParams.get('sessionId');

        if (!studentId || !sessionId) {
            return NextResponse.json({ error: 'studentId and sessionId are required' }, { status: 400 });
        }

        const session = await auth();
        const userRole = (session?.user as any)?.role;
        const userId = (session?.user as any)?.id;

        // Students can only access their own billing
        if (userRole === 'student' && String(userId) !== String(studentId)) {
            return NextResponse.json({ error: 'Access denied' }, { status: 403 });
        }

        const studentIdNum = Number(studentId);
        const sessionIdNum = Number(sessionId);

        const sessionRecord = await prisma.session.findUnique({ where: { id: sessionIdNum } });
        if (!sessionRecord) {
            return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        const assignment = await prisma.studentMessAssignment.findFirst({
            where: { studentId: studentIdNum, sessionId: sessionIdNum },
            include: { mess: true },
        });

        const messRates = await prisma.messRate.findMany({
            where: { sessionId: sessionIdNum, ...(assignment ? { messId: assignment.messId } : {}) },
        });

        const rebates = await prisma.monthlyRebate.findMany({
            where: { studentId: studentIdNum, sessionId: sessionIdNum },
            orderBy: [{ year: 'asc' }, { month: 'asc' }],
        });

        const leftRecord = await prisma.studentLeft.findFirst({
            where: { studentId: studentIdNum, sessionId: sessionIdNum },
        });

        // Compute distinct months from mess rates
        const monthsSet = new Set<string>();
        messRates.forEach(mr => {
            const year = getYearForMonth(mr.month, sessionRecord.startYear, sessionRecord.semester);
            monthsSet.add(`${mr.month}-${year}`);
        });
        rebates.forEach(r => monthsSet.add(`${r.month}-${r.year}`));

        const months = Array.from(monthsSet).map(s => {
            const [m, y] = s.split('-');
            return { month: Number(m), year: Number(y) };
        }).sort((a, b) => a.year !== b.year ? a.year - b.year : a.month - b.month);

        const bills = months.map(({ month, year }) => {
            let days = daysInMonth(month, year);
            const rebate = rebates.find(r => r.month === month && r.year === year);
            let rebateDays = rebate?.rebateDays ?? 0;

            if (leftRecord) {
                const lDate = new Date(leftRecord.leaveDate);
                const lMonth = lDate.getMonth() + 1;
                const lYear = lDate.getFullYear();
                if (year > lYear || (year === lYear && month > lMonth)) {
                    days = 0;
                    rebateDays = 0;
                } else if (year === lYear && month === lMonth) {
                    days = lDate.getDate();
                }
            }

            const chargeableDays = Math.max(0, days - rebateDays);
            const rate = messRates.find(mr => mr.month === month);
            const dailyRate = rate?.monthlyRate ?? 0;
            const gst = rate?.gstPercentage ?? 0;
            const amount = chargeableDays * dailyRate * (1 + gst / 100);

            return {
                month: MONTH_NAMES[month - 1],
                year,
                daysInMonth: days,
                rebateDays,
                chargeableDays,
                dailyRate,
                gst,
                amount: parseFloat(amount.toFixed(2)),
            };
        });

        return NextResponse.json({
            messName: assignment?.mess?.name ?? 'Not Assigned',
            sessionName: sessionRecord.name,
            bills,
            totalAmount: parseFloat(bills.reduce((s, b) => s + b.amount, 0).toFixed(2)),
        });
    } catch (error) {
        console.error('Student billing error:', error);
        return NextResponse.json({ error: 'Failed to compute billing' }, { status: 500 });
    }
}
