import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
        const month = searchParams.get('month'); // e.g., 'January'

        if (!month) {
            return NextResponse.json({ error: 'Month is required' }, { status: 400 });
        }

        // Fetch students and their specific bill for that month/year
        const students = await prisma.student.findMany({
            include: {
                bills: {
                    where: {
                        month: month,
                        year: year
                    }
                }
            },
            orderBy: {
                rollNo: 'asc'
            }
        });

        // Also fetch rebates that overlap with this month to calculate rebate days even if bill not generated?
        // Or just rely on Bill? 
        // If "Month wise data", user probably wants to see the Bill status. 
        // Let's include Rebate calculation for that month dynamically too.

        const monthIndex = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ].indexOf(month);

        if (monthIndex === -1) {
            return NextResponse.json({ error: 'Invalid Month' }, { status: 400 });
        }

        const startDateOfMonth = new Date(year, monthIndex, 1);
        const endDateOfMonth = new Date(year, monthIndex + 1, 0);

        // We need rebates to calculate rebate days if bill doesn't exist or to verify
        const rebates = await prisma.rebate.findMany({
            where: {
                // Find rebates that overlap with this month
                OR: [
                    {
                        startDate: { lte: endDateOfMonth },
                        endDate: { gte: startDateOfMonth }
                    }
                ]
            }
        });

        const data = students.map((student: any) => {
            const bill = student.bills[0]; // Should be only one due to unique constraint

            // Calculate rebate days for this student in this month
            const studentRebates = rebates.filter((r: any) => r.studentId === student.id);
            let rebateDays = 0;
            studentRebates.forEach((rebate: any) => {
                const start = rebate.startDate < startDateOfMonth ? startDateOfMonth : rebate.startDate;
                const end = rebate.endDate > endDateOfMonth ? endDateOfMonth : rebate.endDate;
                if (start <= end) {
                    const diffTime = Math.abs(end.getTime() - start.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                    rebateDays += diffDays;
                }
            });

            return {
                RollNo: student.rollNo,
                Name: student.name,
                Batch: student.batch,
                Mess: student.mess,
                Hostel: student.hostel,
                'Rebate Days': rebateDays,
                'Total Days in Month': endDateOfMonth.getDate(),
                'Billable Days': bill ? bill.totalDays - rebateDays : endDateOfMonth.getDate() - rebateDays, // Approximation
                'Rate Per Day': bill ? bill.ratePerDay : 'N/A',
                'Total Bill Amount': bill ? bill.totalAmount : 'Not Generated',
                'Status': bill ? (bill.isPaid ? 'Paid' : 'Unpaid') : 'N/A'
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, `${month} ${year}`);

        const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        return new Response(buf, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="monthly_report_${month}_${year}.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

    } catch (error) {
        console.error('Monthly report error:', error);
        return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
    }
}
