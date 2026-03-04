import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
        const month = searchParams.get('month'); // Optional: specific month report

        const whereClause: any = { year: year };
        if (month) whereClause.month = month;

        // Fetch all bills matching criteria with student info
        const bills = await prisma.bill.findMany({
            where: whereClause,
            include: {
                student: {
                    select: {
                        hostel: true,
                        mess: true,
                        name: true,
                        rollNo: true
                    }
                }
            }
        });

        // Group data by Mess (or Hostel)
        // User asked: "hostel wise data for thee mess rebate like anusha mess total bill"
        // Usually Messes serve Hostels. Let's group by Mess first.

        const messGrouping: Record<string, { totalBill: number, totalStudents: number, students: any[] }> = {};

        bills.forEach((bill: any) => {
            const messName = bill.student.mess || 'Unknown Mess';
            if (!messGrouping[messName]) {
                messGrouping[messName] = { totalBill: 0, totalStudents: 0, students: [] };
            }

            messGrouping[messName].totalBill += bill.totalAmount;
            // Count unique students? Since search could be whole year, one student has multiple bills. 
            // For line items, we can just list them.
            messGrouping[messName].students.push({
                RollNo: bill.student.rollNo,
                Name: bill.student.name,
                Hostel: bill.student.hostel,
                Month: bill.month,
                Amount: bill.totalAmount
            });
        });

        const workbook = XLSX.utils.book_new();

        // Summary Sheet
        const summaryData = Object.keys(messGrouping).map(mess => ({
            Mess: mess,
            'Total Bill Amount': messGrouping[mess].totalBill,
            'Bill Count': messGrouping[mess].students.length
        }));
        const summaryWS = XLSX.utils.json_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(workbook, summaryWS, "Summary");

        // Detail Sheets for each Mess
        Object.keys(messGrouping).forEach(mess => {
            const ws = XLSX.utils.json_to_sheet(messGrouping[mess].students);
            XLSX.utils.book_append_sheet(workbook, ws, mess.substring(0, 31)); // Sheet name max length 31
        });

        const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        return new Response(buf, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="mess_wise_report_${year}.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

    } catch (error) {
        console.error('Report generation error:', error);
        return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
    }
}
