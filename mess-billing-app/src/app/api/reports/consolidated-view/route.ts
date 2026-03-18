import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json([]); // Return empty if no session selected
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
                hostelRef: true,
                messAssignments: {
                    where: { sessionId: sessionIdNum },
                    include: { mess: true },
                },
                monthlyRebates: {
                    where: { sessionId: sessionIdNum },
                },
                feesDeposited: {
                    where: { sessionId: sessionIdNum },
                },
                refunds: {
                    where: { sessionId: sessionIdNum },
                },
            },
            orderBy: { entryNo: 'asc' },
        });

        const messRates = await prisma.messRate.findMany({
            where: { sessionId: sessionIdNum },
        });

        const data = students.map((student) => {
            const assignment = student.messAssignments[0];
            const totalFees = student.feesDeposited.reduce((sum, f) => sum + f.amount, 0);
            const totalRefunds = student.refunds.reduce((sum, r) => sum + r.amount, 0);

            const row: any = {
                id: student.id,
                'Entry No': student.entryNo,
                'Name': student.name,
                'Course': student.course?.name ?? '-',
                'Hostel': student.hostelRef?.name ?? student.hostel ?? '-',
                'Mess': assignment?.mess?.name ?? '-',
                'Mess Security': student.messSecurity,
                'Address': student.address ?? '-',
                'Bank Account No': student.bankAccountNo ?? '-',
                'Bank Name': student.bankName ?? '-',
                'IFSC': student.ifsc ?? '-',
            };

            let totalAmount = 0;

            // Add dynamic columns per (month, year) pair found in this session
            for (const { month, year } of distinctMonths) {
                const days = daysInMonth(month, year);
                const rebate = student.monthlyRebates.find((r) => r.month === month && r.year === year);
                const rebateDays = rebate?.rebateDays ?? 0;
                const chargeableDays = days - rebateDays;

                const rate = messRates.find(
                    (mr) =>
                        mr.messId === assignment?.messId &&
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
            row['Total Fees Deposited (₹)'] = parseFloat(totalFees.toFixed(2));
            row['Total Refunds (₹)'] = parseFloat(totalRefunds.toFixed(2));
            row['Net Balance (₹)'] = parseFloat((totalFees - (totalAmount + totalRefunds)).toFixed(2));
            
            return row;
        });

        // Also return the column list so the UI knows exactly what to render in order
        const columns = ['Entry No', 'Name', 'Course', 'Hostel', 'Mess', 'Mess Security', 'Address', 'Bank Account No', 'Bank Name', 'IFSC'];
        for (const { month, year } of distinctMonths) {
            const label = `${MONTH_NAMES[month - 1]} ${year}`;
            columns.push(`${label} Rebate Days`);
            columns.push(`${label} Amount (₹)`);
        }
        columns.push('Total Amount (₹)', 'Total Fees Deposited (₹)', 'Total Refunds (₹)', 'Net Balance (₹)');

        return NextResponse.json({ data, columns });
    } catch (error) {
        console.error('Consolidated report view error:', error);
        return NextResponse.json({ error: 'Failed to generate report schema' }, { status: 500 });
    }
}
