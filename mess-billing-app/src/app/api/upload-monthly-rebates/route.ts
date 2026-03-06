import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

// POST /api/upload-monthly-rebates
// Form fields: sessionId, month, year, messId (optional)
// Excel columns: RollNo, RebateDays, MessRate (optional), GSTPercentage (optional)
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const sessionId = Number(formData.get('sessionId'));
        const month = Number(formData.get('month'));
        const year = Number(formData.get('year'));
        const formMessId = formData.get('messId') ? Number(formData.get('messId')) : null;

        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        if (!sessionId || !month || !year) return NextResponse.json({ error: 'sessionId, month, and year are required' }, { status: 400 });
        if (month < 1 || month > 12) return NextResponse.json({ error: 'month must be between 1 and 12' }, { status: 400 });

        const buffer = new Uint8Array(await file.arrayBuffer());
        const workbook = XLSX.read(buffer, { type: 'array' });
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[];

        const allStudents = await prisma.student.findMany({ select: { id: true, rollNo: true, courseId: true } });
        const studentMap = new Map(allStudents.map(s => [s.rollNo.toLowerCase(), s]));

        let imported = 0;
        const errorRows: any[] = [];
        const validRows: any[] = [];

        for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];
            const issues: string[] = [];

            const rollNo = String(row.RollNo ?? '').trim();
            const rebateDays = Number(row.RebateDays);
            const messRate = row.MessRate != null ? Number(row.MessRate) : null;
            const gstPercentage = row.GSTPercentage != null ? Number(row.GSTPercentage) : null;

            if (!rollNo) issues.push('RollNo is missing');
            if (!row.RebateDays && row.RebateDays !== 0) issues.push('RebateDays is missing');
            else if (isNaN(rebateDays) || rebateDays < 0) issues.push(`RebateDays "${row.RebateDays}" is invalid (must be 0 or more)`);

            const student = rollNo ? studentMap.get(rollNo.toLowerCase()) : undefined;
            if (rollNo && !student) issues.push(`Student with RollNo "${rollNo}" not found`);

            if (issues.length > 0) {
                errorRows.push({
                    _rowNum: i + 2, _issues: issues,
                    RollNo: rollNo,
                    RebateDays: row.RebateDays ?? '',
                    MessRate: row.MessRate ?? '',
                    GSTPercentage: row.GSTPercentage ?? '',
                });
            } else {
                validRows.push({ rollNo, student: student!, rebateDays, messRate, gstPercentage });
            }
        }

        // Process valid rows
        for (const r of validRows) {
            await prisma.monthlyRebate.upsert({
                where: { studentId_sessionId_month_year: { studentId: r.student.id, sessionId, month, year } },
                update: { rebateDays: r.rebateDays },
                create: { studentId: r.student.id, sessionId, month, year, rebateDays: r.rebateDays },
            });
            imported++;

            // Ensure mess assignment
            let resolvedMessId: number | null = null;
            if (formMessId) {
                const assignment = await prisma.studentMessAssignment.upsert({
                    where: { studentId_sessionId: { studentId: r.student.id, sessionId } },
                    update: {},
                    create: { studentId: r.student.id, messId: formMessId, sessionId },
                });
                resolvedMessId = assignment.messId;
            } else {
                const assignment = await prisma.studentMessAssignment.findUnique({
                    where: { studentId_sessionId: { studentId: r.student.id, sessionId } }
                });
                resolvedMessId = assignment?.messId ?? null;
            }

            // Upsert MessRate if columns provided
            if ((r.messRate != null || r.gstPercentage != null) && r.student.courseId && resolvedMessId) {
                await prisma.messRate.upsert({
                    where: { messId_courseId_sessionId_month: { messId: resolvedMessId, courseId: r.student.courseId, sessionId, month } },
                    update: {
                        ...(r.messRate != null ? { monthlyRate: r.messRate } : {}),
                        ...(r.gstPercentage != null ? { gstPercentage: r.gstPercentage } : {}),
                    },
                    create: { messId: resolvedMessId, courseId: r.student.courseId, sessionId, month, monthlyRate: r.messRate ?? 0, gstPercentage: r.gstPercentage ?? 0 },
                });
            }
        }

        return NextResponse.json({ imported, skipped: errorRows.length, errorRows }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
