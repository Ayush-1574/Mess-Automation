import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');
        const month = searchParams.get('month') ? parseInt(searchParams.get('month')!) : null;
        const year = searchParams.get('year') ? parseInt(searchParams.get('year')!) : null;

        // Fetch mess assignments (these link student→mess per session)
        const assignments = await prisma.studentMessAssignment.findMany({
            where: sessionId ? { sessionId: Number(sessionId) } : {},
            include: {
                student: {
                    include: {
                        course: true,
                        monthlyRebates: {
                            where: {
                                ...(month ? { month } : {}),
                                ...(year ? { year } : {}),
                            }
                        }
                    }
                },
                mess: true,
                session: true,
            }
        });

        // Group by mess
        const messGrouping: Record<string, { totalRebateDays: number, students: any[] }> = {};

        assignments.forEach((a: any) => {
            const messName = a.mess.name;
            if (!messGrouping[messName]) {
                messGrouping[messName] = { totalRebateDays: 0, students: [] };
            }
            const rebateDays = a.student.monthlyRebates.reduce((sum: number, r: any) => sum + r.rebateDays, 0);
            messGrouping[messName].totalRebateDays += rebateDays;
            messGrouping[messName].students.push({
                RollNo: a.student.rollNo,
                Name: a.student.name,
                Course: a.student.course?.name || '-',
                Hostel: a.student.hostel || '-',
                Session: a.session.name,
                'Rebate Days': rebateDays,
            });
        });

        const workbook = XLSX.utils.book_new();

        const summaryData = Object.keys(messGrouping).map(mess => ({
            Mess: mess,
            'Total Rebate Days': messGrouping[mess].totalRebateDays,
            'Student Count': messGrouping[mess].students.length,
        }));
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryData), 'Summary');

        Object.keys(messGrouping).forEach(mess => {
            XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(messGrouping[mess].students), mess.substring(0, 31));
        });

        const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        return new Response(buf, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="mess_wise_report.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });
    } catch (error) {
        console.error('Hostel-wise report error:', error);
        return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
    }
}
