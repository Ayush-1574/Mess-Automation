import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const monthParam = searchParams.get('month');
        const yearParam = searchParams.get('year');
        const sessionId = searchParams.get('sessionId');

        if (!monthParam || !yearParam) {
            return NextResponse.json({ error: 'month and year are required' }, { status: 400 });
        }

        const month = parseInt(monthParam);
        const year = parseInt(yearParam);

        if (month < 1 || month > 12) {
            return NextResponse.json({ error: 'Invalid month' }, { status: 400 });
        }

        const students = await prisma.student.findMany({
            include: {
                course: true,
                messAssignments: {
                    include: { mess: true },
                    ...(sessionId ? { where: { sessionId: Number(sessionId) } } : {})
                },
                monthlyRebates: {
                    where: { month, year }
                },
            },
            orderBy: { rollNo: 'asc' }
        });

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

        const data = students.map((student: any) => {
            const rebate = student.monthlyRebates[0];
            const rebateDays = rebate ? rebate.rebateDays : 0;

            return {
                RollNo: student.rollNo,
                Name: student.name,
                Course: student.course?.name || '-',
                Hostel: student.hostel || '-',
                Mess: student.messAssignments[0]?.mess?.name || '-',
                'Rebate Days': rebateDays,
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, `${monthNames[month - 1]} ${year}`);
        const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        return new Response(buf, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="monthly_report_${monthNames[month - 1]}_${year}.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });
    } catch (error) {
        console.error('Monthly report error:', error);
        return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
    }
}
