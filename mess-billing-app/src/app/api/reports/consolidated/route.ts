import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
        }

        const sessionIdNum = Number(sessionId);

        // All months that have rebate data in this session
        const distinctMonths = await prisma.monthlyRebate.findMany({
            where: { sessionId: sessionIdNum },
            distinct: ['month', 'year'],
            select: { month: true, year: true },
            orderBy: [{ year: 'asc' }, { month: 'asc' }],
        });

        const students = await prisma.student.findMany({
            include: {
                course: true,
                messAssignments: {
                    where: { sessionId: sessionIdNum },
                    include: { mess: true },
                },
                monthlyRebates: {
                    where: { sessionId: sessionIdNum },
                },
            },
            orderBy: { rollNo: 'asc' },
        });

        const messRates = await prisma.messRate.findMany({
            where: { sessionId: sessionIdNum },
        });

        const session = await prisma.session.findUnique({ where: { id: sessionIdNum } });

        const data = students.map((student) => {
            const assignment = student.messAssignments[0];
            const totalFees = assignment?.amount ?? 0;

            const row: any = {
                'Roll No': student.rollNo,
                'Name': student.name,
                'Course': student.course?.name ?? '-',
                'Hostel': student.hostel ?? '-',
                'Mess': assignment?.mess?.name ?? '-',
                'Mess Security': student.messSecurity,
            };

            let totalAmount = 0;

            // Add a column per (month, year) pair found in this session
            for (const { month, year } of distinctMonths) {
                const days = daysInMonth(month, year);
                const rebate = student.monthlyRebates.find((r) => r.month === month && r.year === year);
                const rebateDays = rebate?.rebateDays ?? 0;
                const chargeableDays = days - rebateDays;

                const rate = messRates.find(
                    (mr) =>
                        mr.messId === assignment?.messId &&
                        mr.courseId === student.courseId &&
                        mr.sessionId === sessionIdNum &&
                        mr.month === month
                );

                const dailyRate = rate?.monthlyRate ?? 0;
                const gst = rate?.gstPercentage ?? 0;
                const amount = chargeableDays * dailyRate * (1 + gst / 100);
                totalAmount += amount;

                const label = `${MONTH_NAMES[month - 1]} ${year}`;
                row[`${label} Rebate Days`] = rebateDays;
                row[`${label} Amount (₹)`] = parseFloat(amount.toFixed(2));
            }

            row['Total Amount (₹)'] = parseFloat(totalAmount.toFixed(2));
            row['Fees Deposited (₹)'] = parseFloat(totalFees.toFixed(2));
            row['Balance (₹)'] = parseFloat((totalFees - totalAmount).toFixed(2));
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, `${session?.name ?? 'Session'}`);
        const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        return new Response(buf, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="consolidated_${session?.name ?? sessionId}.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });
    } catch (error) {
        console.error('Consolidated report error:', error);
        return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
    }
}
