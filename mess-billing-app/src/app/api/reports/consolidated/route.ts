import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
        const sessionId = searchParams.get('sessionId');
        const colsParam = searchParams.get('cols');
        const allowedCols = colsParam ? new Set(colsParam.split(',')) : null;

        if (!sessionId) {
            return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
        }

        const sessionIdNum = Number(sessionId);
        const session = await prisma.session.findUnique({ where: { id: sessionIdNum } });

        const messRates = await prisma.messRate.findMany({
            where: { sessionId: sessionIdNum },
        });

        // Compute distinct months from both rebates and mess rates
        const distinctRebates = await prisma.monthlyRebate.findMany({
            where: { sessionId: sessionIdNum },
            distinct: ['month', 'year'],
            select: { month: true, year: true },
        });

        const monthsSet = new Set<string>();
        distinctRebates.forEach(r => monthsSet.add(`${r.month}-${r.year}`));
        messRates.forEach(mr => {
            const year = session ? getYearForMonth(mr.month, session.startYear, session.semester) : new Date().getFullYear();
            monthsSet.add(`${mr.month}-${year}`);
        });

        const distinctMonths = Array.from(monthsSet).map(s => {
            const [m, y] = s.split('-');
            return { month: Number(m), year: Number(y) };
        }).sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.month - b.month;
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
                feesDeposited: {
                    where: { sessionId: sessionIdNum },
                },
                refunds: {
                    where: { sessionId: sessionIdNum },
                },
                leftRecords: {
                    where: { sessionId: sessionIdNum },
                },
            },
            orderBy: { entryNo: 'asc' },
        });



        const data = students.map((student) => {
            const assignment = student.messAssignments[0];
            const totalFees = student.feesDeposited.reduce((sum, f) => sum + f.amount, 0);
            const totalRefunds = student.refunds.reduce((sum, r) => sum + r.amount, 0);

            const row: any = {
                'Entry No': student.entryNo,
                'Name': student.name,
            };

            if (!allowedCols || allowedCols.has('Course')) row['Course'] = student.course?.name ?? '-';
            if (!allowedCols || allowedCols.has('Batch')) row['Batch'] = student.batch ?? '-';
            if (!allowedCols || allowedCols.has('Hostel')) row['Hostel'] = student.hostel ?? '-';
            if (!allowedCols || allowedCols.has('Mess')) row['Mess'] = assignment?.mess?.name ?? '-';
            if (!allowedCols || allowedCols.has('Mess Security')) row['Mess Security'] = student.messSecurity;
            if (!allowedCols || allowedCols.has('Address')) row['Address'] = student.address ?? '-';
            if (!allowedCols || allowedCols.has('Gender')) row['Gender'] = student.gender ?? '-';
            if (!allowedCols || allowedCols.has('Mobile No')) row['Mobile No'] = student.mobileNo ?? '-';
            if (!allowedCols || allowedCols.has('Name in Bank')) row['Name in Bank'] = student.nameInBank ?? '-';
            if (!allowedCols || allowedCols.has('JoSAA Roll No')) row['JoSAA Roll No'] = student.josaaRollNo ?? '-';
            if (!allowedCols || allowedCols.has('Department')) row['Department'] = student.department ?? '-';
            if (!allowedCols || allowedCols.has('Parent Mobile No')) row['Parent Mobile No'] = student.parentMobileNo ?? '-';
            if (!allowedCols || allowedCols.has('Date of Joining')) row['Date of Joining'] = student.dateOfJoining ? new Date(student.dateOfJoining).toLocaleDateString('en-GB') : '-';
            if (!allowedCols || allowedCols.has('Date of Leaving')) row['Date of Leaving'] = student.dateOfLeaving ? new Date(student.dateOfLeaving).toLocaleDateString('en-GB') : '-';
            if (!allowedCols || allowedCols.has('Left Date')) row['Left Date'] = student.leftRecords?.[0]?.leaveDate ? new Date(student.leftRecords[0].leaveDate).toLocaleDateString('en-GB') : '-';
            if (!allowedCols || allowedCols.has('Bank Account No')) row['Bank Account No'] = student.bankAccountNo ?? '-';
            if (!allowedCols || allowedCols.has('Bank Name')) row['Bank Name'] = student.bankName ?? '-';
            if (!allowedCols || allowedCols.has('IFSC')) row['IFSC'] = student.ifsc ?? '-';

            let totalAmount = 0;

            // Add a column per (month, year) pair found in this session
            for (const { month, year } of distinctMonths) {
                let days = daysInMonth(month, year);
                const rebate = student.monthlyRebates.find((r) => r.month === month && r.year === year);
                let rebateDays = rebate?.rebateDays ?? 0;

                const leftRecord = student.leftRecords?.[0];
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
                if (!allowedCols || allowedCols.has('Rebate Days')) {
                    row[`${label} Rebate Days`] = rebateDays;
                }
                row[`${label} Amount (₹)`] = parseFloat(amount.toFixed(2));
            }

            row['Total Amount (₹)'] = parseFloat(totalAmount.toFixed(2));
            row['Total Fees Deposited (₹)'] = parseFloat(totalFees.toFixed(2));
            row['Total Refunds (₹)'] = parseFloat(totalRefunds.toFixed(2));
            row['Net Balance (₹)'] = parseFloat((totalFees - (totalAmount + totalRefunds)).toFixed(2));
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
