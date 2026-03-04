import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());

        // Fetch all students with their rebates and bills for the given year
        const students = await prisma.student.findMany({
            include: {
                rebates: {
                    where: {
                        startDate: {
                            gte: new Date(`${year}-01-01`),
                        },
                        endDate: {
                            lte: new Date(`${year}-12-31`),
                        }
                    }
                },
                bills: {
                    where: {
                        year: year
                    }
                }
            },
            orderBy: {
                rollNo: 'asc'
            }
        });

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const data = students.map((student: any) => {
            const row: any = {
                RollNo: student.rollNo,
                Name: student.name,
                Hostel: student.hostel,
                Mess: student.mess,
            };

            let totalRebateAmount = 0;
            let totalBillAmount = 0;

            months.forEach(month => {
                // Find bill for this month
                const bill = student.bills.find((b: any) => b.month === month);

                // Calculate rebate details/days for this month
                // This is a bit complex accurately splitting rebates across months if backend didn't store it pre-calculated
                // For this report, we'll try to estimate or use bill data if available.
                // If bill exists, we can reverse calculate rebate? 
                // Or re-calculate rebate days for the month from Rebate records.

                // Let's re-calculate rebate days for this month for reporting accuracy
                const monthIndex = months.indexOf(month);
                const startDateOfMonth = new Date(year, monthIndex, 1);
                const endDateOfMonth = new Date(year, monthIndex + 1, 0);

                let daysRebated = 0;
                student.rebates.forEach((rebate: any) => {
                    const start = rebate.startDate < startDateOfMonth ? startDateOfMonth : rebate.startDate;
                    const end = rebate.endDate > endDateOfMonth ? endDateOfMonth : rebate.endDate;

                    if (start <= end) {
                        const diffTime = Math.abs(end.getTime() - start.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                        daysRebated += diffDays;
                    }
                });

                row[`${month} Rebate Days`] = daysRebated;

                // Ideally we need rate per day to calculate amount, getting it from bill if exists, else assume 150 or fetch from Mess?
                // Let's assume rate from bill if exists, else 0 (or N/A)
                const rate = bill ? bill.ratePerDay : 0;
                const rebateAmount = daysRebated * rate; // Approximation if bill doesn't exist

                row[`${month} Rebate Amt`] = bill ? (bill.totalDays * bill.ratePerDay) - bill.totalAmount : rebateAmount; // or calculate explicitly

                totalRebateAmount += row[`${month} Rebate Amt`];

                if (bill) {
                    row[`${month} Bill Amt`] = bill.totalAmount;
                    totalBillAmount += bill.totalAmount;
                } else {
                    row[`${month} Bill Amt`] = 0;
                }
            });

            row['Total Rebate Amount'] = totalRebateAmount;
            row['Total Bill Amount'] = totalBillAmount;

            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Consolidated Report");

        const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        return new Response(buf, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="consolidated_report_${year}.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

    } catch (error) {
        console.error('Report generation error:', error);
        return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
    }
}
