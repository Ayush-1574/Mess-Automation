import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

function daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');
        const monthParam = searchParams.get('month'); // number 1-12 or "all"
        const yearParam = searchParams.get('year');

        if (!sessionId) {
            return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
        }

        const sessionIdNum = Number(sessionId);
        const isAllMonths = !monthParam || monthParam === 'all';
        const singleMonth = isAllMonths ? null : parseInt(monthParam!);
        const year = yearParam ? parseInt(yearParam) : new Date().getFullYear();

        const assignments = await prisma.studentMessAssignment.findMany({
            where: { sessionId: sessionIdNum },
            include: {
                student: {
                    include: {
                        course: true,
                        monthlyRebates: {
                            where: {
                                sessionId: sessionIdNum,
                                ...(isAllMonths ? {} : { month: singleMonth!, year }),
                            },
                        },
                        feesDeposited: {
                            where: { sessionId: sessionIdNum },
                        },
                        refunds: {
                            where: { sessionId: sessionIdNum },
                        },
                    },
                },
                mess: true,
                session: true,
            },
        });

        const messRates = await prisma.messRate.findMany({
            where: { sessionId: sessionIdNum },
        });

        // Determine months to show
        let months: { month: number; year: number }[];
        if (isAllMonths) {
            const distinct = await prisma.monthlyRebate.findMany({
                where: { sessionId: sessionIdNum },
                distinct: ['month', 'year'],
                select: { month: true, year: true },
                orderBy: [{ year: 'asc' }, { month: 'asc' }],
            });
            months = distinct;
        } else {
            months = [{ month: singleMonth!, year }];
        }

        // Group by mess
        const messGrouping: Record<string, { totalAmount: number; students: any[] }> = {};

        assignments.forEach((a) => {
            const messName = a.mess.name;
            if (!messGrouping[messName]) {
                messGrouping[messName] = { totalAmount: 0, students: [] };
            }

            const student = a.student;
            const totalFees = student.feesDeposited.reduce((sum, f) => sum + f.amount, 0);
            const totalRefunds = student.refunds.reduce((sum, r) => sum + r.amount, 0);
            let totalAmount = 0;

            const monthBreakdown: any = {};
            for (const { month, year: y } of months) {
                const days = daysInMonth(month, y);
                const rebate = student.monthlyRebates.find((r) => r.month === month && r.year === y);
                const rebateDays = rebate?.rebateDays ?? 0;
                const chargeableDays = days - rebateDays;

                const rate = messRates.find(
                    (mr) =>
                        mr.messId === a.messId &&
                        mr.sessionId === sessionIdNum &&
                        mr.month === month
                );

                const dailyRate = rate?.monthlyRate ?? 0;
                const gst = rate?.gstPercentage ?? 0;
                const amount = chargeableDays * dailyRate * (1 + gst / 100);
                totalAmount += amount;

                const label = `${MONTH_NAMES[month - 1].substring(0, 3)} ${y}`;
                monthBreakdown[`${label} Rebate`] = rebateDays;
                monthBreakdown[`${label} Amount`] = parseFloat(amount.toFixed(2));
            }

            messGrouping[messName].totalAmount += totalAmount;
            messGrouping[messName].students.push({
                'Entry No': student.entryNo,
                'Name': student.name,
                'Course': student.course?.name ?? '-',
                'Hostel': student.hostel ?? '-',
                'Session': a.session.name,
                ...monthBreakdown,
                'Total Amount (₹)': parseFloat(totalAmount.toFixed(2)),
                'Total Fees Deposited (₹)': parseFloat(totalFees.toFixed(2)),
                'Total Refunds (₹)': parseFloat(totalRefunds.toFixed(2)),
                'Net Balance (₹)': parseFloat((totalFees - (totalAmount + totalRefunds)).toFixed(2)),
            });
        });

        const workbook = XLSX.utils.book_new();

        // Summary sheet
        const summaryData = Object.keys(messGrouping).map((mess) => ({
            Mess: mess,
            'Student Count': messGrouping[mess].students.length,
            'Total Amount (₹)': parseFloat(messGrouping[mess].totalAmount.toFixed(2)),
        }));
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryData), 'Summary');

        // Per-mess sheets
        Object.keys(messGrouping).forEach((mess) => {
            XLSX.utils.book_append_sheet(
                workbook,
                XLSX.utils.json_to_sheet(messGrouping[mess].students),
                mess.substring(0, 31)
            );
        });

        const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        const label = isAllMonths ? 'all_months' : `${MONTH_NAMES[singleMonth! - 1]}_${year}`;

        return new Response(buf, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="mess_wise_report_${label}.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });
    } catch (error) {
        console.error('Hostel-wise report error:', error);
        return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
    }
}
