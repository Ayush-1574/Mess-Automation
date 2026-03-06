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
        if (!monthParam) {
            return NextResponse.json({ error: 'month is required' }, { status: 400 });
        }

        const sessionIdNum = Number(sessionId);
        const isAllMonths = monthParam === 'all';
        const singleMonth = isAllMonths ? null : parseInt(monthParam);
        const year = yearParam ? parseInt(yearParam) : new Date().getFullYear();

        if (!isAllMonths && (singleMonth! < 1 || singleMonth! > 12)) {
            return NextResponse.json({ error: 'Invalid month' }, { status: 400 });
        }

        // Determine which months to include
        let months: number[];
        if (isAllMonths) {
            // Find all months that have rebate data in this session
            const distinctMonths = await prisma.monthlyRebate.findMany({
                where: { sessionId: sessionIdNum },
                distinct: ['month'],
                select: { month: true },
                orderBy: { month: 'asc' },
            });
            months = distinctMonths.map((r) => r.month);
            if (months.length === 0) {
                return NextResponse.json({ error: 'No rebate data found for this session' }, { status: 404 });
            }
        } else {
            months = [singleMonth!];
        }

        // Fetch all students with their mess assignment, course, rebates and fees for this session
        const students = await prisma.student.findMany({
            include: {
                course: true,
                messAssignments: {
                    where: { sessionId: sessionIdNum },
                    include: { mess: true },
                },
                monthlyRebates: {
                    where: {
                        sessionId: sessionIdNum,
                        month: isAllMonths ? { in: months } : singleMonth!,
                        ...(isAllMonths ? {} : { year }),
                    },
                },
            },
            orderBy: { rollNo: 'asc' },
        });

        // Fetch all MessRates for this session at once
        const messRates = await prisma.messRate.findMany({
            where: { sessionId: sessionIdNum },
        });

        const workbook = XLSX.utils.book_new();

        for (const month of months) {
            const monthYear = isAllMonths
                ? (await prisma.monthlyRebate.findFirst({ where: { sessionId: sessionIdNum, month }, select: { year: true } }))?.year ?? year
                : year;

            const days = daysInMonth(month, monthYear);

            const rows = students.map((student) => {
                const assignment = student.messAssignments[0];
                const rebate = student.monthlyRebates.find((r) => r.month === month);
                const rebateDays = rebate?.rebateDays ?? 0;
                const chargeableDays = days - rebateDays;

                // Find the rate for this student's mess, course, session, month
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
                const feesDeposited = assignment?.amount ?? 0;

                return {
                    'Roll No': student.rollNo,
                    'Name': student.name,
                    'Course': student.course?.name ?? '-',
                    'Hostel': student.hostel ?? '-',
                    'Mess': assignment?.mess?.name ?? '-',
                    'Month': MONTH_NAMES[month - 1],
                    'Year': monthYear,
                    'Days in Month': days,
                    'Rebate Days': rebateDays,
                    'Chargeable Days': chargeableDays,
                    'Daily Rate (₹)': dailyRate,
                    'GST (%)': gst,
                    'Amount (₹)': parseFloat(amount.toFixed(2)),
                    'Fees Deposited (₹)': parseFloat(feesDeposited.toFixed(2)),
                    'Balance (₹)': parseFloat((feesDeposited - amount).toFixed(2)),
                };
            });

            const sheetName = isAllMonths
                ? `${MONTH_NAMES[month - 1].substring(0, 3)} ${monthYear}`.substring(0, 31)
                : `${MONTH_NAMES[month - 1]} ${monthYear}`.substring(0, 31);

            XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), sheetName);
        }

        const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        const label = isAllMonths ? 'all_months' : `${MONTH_NAMES[singleMonth! - 1]}_${year}`;

        return new Response(buf, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="monthly_report_${label}.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });
    } catch (error) {
        console.error('Monthly report error:', error);
        return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
    }
}
