import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');

        const students = await prisma.student.findMany({
            include: {
                course: true,
                messAssignments: {
                    include: { mess: true },
                    ...(sessionId ? { where: { sessionId: Number(sessionId) } } : {})
                },
                monthlyRebates: {
                    ...(sessionId ? { where: { sessionId: Number(sessionId) } } : {})
                },
                feesDeposited: {
                    ...(sessionId ? { where: { sessionId: Number(sessionId) } } : {})
                },
            },
            orderBy: { rollNo: 'asc' }
        });

        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const data = students.map((student: any) => {
            const row: any = {
                RollNo: student.rollNo,
                Name: student.name,
                Course: student.course?.name || '-',
                Hostel: student.hostel || '-',
                Mess: student.messAssignments[0]?.mess?.name || '-',
                'Mess Security': student.messSecurity,
            };

            let totalRebateDays = 0;
            let totalFees = 0;

            months.forEach((m, idx) => {
                const rebate = student.monthlyRebates.find((r: any) => r.month === m);
                row[`${monthNames[idx]} Rebate Days`] = rebate ? rebate.rebateDays : 0;
                totalRebateDays += rebate ? rebate.rebateDays : 0;
            });

            student.feesDeposited.forEach((f: any) => { totalFees += f.amount; });

            row['Total Rebate Days'] = totalRebateDays;
            row['Total Fees Deposited'] = totalFees;

            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Consolidated Report');
        const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        return new Response(buf, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="consolidated_report.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

    } catch (error) {
        console.error('Report generation error:', error);
        return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
    }
}
