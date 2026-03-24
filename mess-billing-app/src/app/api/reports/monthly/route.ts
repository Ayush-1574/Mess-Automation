import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

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
        const sessionId = searchParams.get('sessionId');
        const monthParam = searchParams.get('month'); // number 1-12 or "all"
        const yearParam = searchParams.get('year');
        const colsParam = searchParams.get('cols');
        const allowedCols = colsParam ? new Set(colsParam.split(',')) : null;

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

        const session = await prisma.session.findUnique({ where: { id: sessionIdNum } });
        const messRates = await prisma.messRate.findMany({
            where: { sessionId: sessionIdNum },
        });

        // Determine which months to include
        let months: number[];
        if (isAllMonths) {
            const monthsSet = new Set<number>();
            const distinctRebates = await prisma.monthlyRebate.findMany({
                where: { sessionId: sessionIdNum },
                distinct: ['month'],
                select: { month: true },
            });
            distinctRebates.forEach(r => monthsSet.add(r.month));
            messRates.forEach(mr => monthsSet.add(mr.month));
            
            months = Array.from(monthsSet).sort((a, b) => a - b);
            if (months.length === 0) {
                return NextResponse.json({ error: 'No billing data found for this session' }, { status: 404 });
            }
        } else {
            months = [singleMonth!];
        }

        // Fetch all students with their mess assignment, course, rebates, fees and refunds for this session
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

        const totalFeesMap = new Map<number, number>();
        const totalRefundsMap = new Map<number, number>();
        students.forEach((s) => {
            totalFeesMap.set(s.id, s.feesDeposited.reduce((sum, f) => sum + f.amount, 0));
            totalRefundsMap.set(s.id, s.refunds.reduce((sum, r) => sum + r.amount, 0));
        });

        const workbook = XLSX.utils.book_new();

        for (const month of months) {
            const monthYear = isAllMonths
                ? (session ? getYearForMonth(month, session.startYear, session.semester) : year)
                : (session ? getYearForMonth(month, session.startYear, session.semester) : year);

            const globalDays = daysInMonth(month, monthYear);

            const rows = students.map((student) => {
                const assignment = student.messAssignments[0];
                const rebate = student.monthlyRebates.find((r) => r.month === month);
                let rebateDays = rebate?.rebateDays ?? 0;
                let studentDays = globalDays;

                const leftRecord = student.leftRecords?.[0];
                if (leftRecord) {
                    const lDate = new Date(leftRecord.leaveDate);
                    const lMonth = lDate.getMonth() + 1;
                    const lYear = lDate.getFullYear();

                    if (monthYear > lYear || (monthYear === lYear && month > lMonth)) {
                        studentDays = 0;
                        rebateDays = 0;
                    } else if (monthYear === lYear && month === lMonth) {
                        studentDays = lDate.getDate();
                    }
                }

                const chargeableDays = Math.max(0, studentDays - rebateDays);

                // Find the rate for this student's mess, course, session, month
                const rate = messRates.find(
                    (mr) =>
                        mr.messId === assignment?.messId &&
                        mr.sessionId === sessionIdNum &&
                        mr.month === month
                );

                const dailyRate = rate?.monthlyRate ?? 0; // field is named monthlyRate but is actually daily rate
                const gst = rate?.gstPercentage ?? 0;
                const amount = chargeableDays * dailyRate * (1 + gst / 100);
                const totalFees = totalFeesMap.get(student.id) ?? 0;
                const totalRefunds = totalRefundsMap.get(student.id) ?? 0;

                const row: any = {
                    'Entry No': student.entryNo,
                    'Name': student.name,
                };

                if (!allowedCols || allowedCols.has('Gender')) row['Gender'] = student.gender ?? '-';
                if (!allowedCols || allowedCols.has('Mobile No')) row['Mobile No'] = student.mobileNo ?? '-';
                if (!allowedCols || allowedCols.has('Name in Bank')) row['Name in Bank'] = student.nameInBank ?? '-';
                if (!allowedCols || allowedCols.has('JoSAA Roll No')) row['JoSAA Roll No'] = student.josaaRollNo ?? '-';
                if (!allowedCols || allowedCols.has('Department')) row['Department'] = student.department ?? '-';
                if (!allowedCols || allowedCols.has('Parent Mobile No')) row['Parent Mobile No'] = student.parentMobileNo ?? '-';
                if (!allowedCols || allowedCols.has('Date of Joining')) row['Date of Joining'] = student.dateOfJoining ? new Date(student.dateOfJoining).toLocaleDateString('en-GB') : '-';
                if (!allowedCols || allowedCols.has('Date of Leaving')) row['Date of Leaving'] = student.dateOfLeaving ? new Date(student.dateOfLeaving).toLocaleDateString('en-GB') : '-';
                if (!allowedCols || allowedCols.has('Left Date')) row['Left Date'] = student.leftRecords?.[0]?.leaveDate ? new Date(student.leftRecords[0].leaveDate).toLocaleDateString('en-GB') : '-';
                if (!allowedCols || allowedCols.has('Course')) row['Course'] = student.course?.name ?? '-';
                if (!allowedCols || allowedCols.has('Batch')) row['Batch'] = student.batch ?? '-';
                if (!allowedCols || allowedCols.has('Hostel')) row['Hostel'] = student.hostel ?? '-';
                if (!allowedCols || allowedCols.has('Mess')) row['Mess'] = assignment?.mess?.name ?? '-';

                row['Month'] = MONTH_NAMES[month - 1];
                row['Year'] = monthYear;
                row['Days in Month'] = studentDays;
                if (!allowedCols || allowedCols.has('Rebate Days')) row['Rebate Days'] = rebateDays;
                row['Chargeable Days'] = chargeableDays;
                row['Daily Rate (₹)'] = dailyRate;
                row['GST (%)'] = gst;
                row['Amount (₹)'] = parseFloat(amount.toFixed(2));
                row['Total Fees Deposited (₹)'] = parseFloat(totalFees.toFixed(2));
                row['Total Refunds (₹)'] = parseFloat(totalRefunds.toFixed(2));
                row['Net Balance (₹)'] = parseFloat((totalFees - (amount + totalRefunds)).toFixed(2));

                return row;
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
