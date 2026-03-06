import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

// POST /api/upload-monthly-rebates
// Form fields: sessionId, month, year, hostel, messId
// Excel columns: RollNo, StudentName, RebateDays, MessRate, GSTPercentage
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const sessionId = Number(formData.get('sessionId'));
        const month = Number(formData.get('month'));
        const year = Number(formData.get('year'));
        const formMessId = formData.get('messId') ? Number(formData.get('messId')) : null;

        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        if (!sessionId || !month || !year) {
            return NextResponse.json({ error: 'sessionId, month, and year are required' }, { status: 400 });
        }
        if (month < 1 || month > 12) {
            return NextResponse.json({ error: 'month must be between 1 and 12' }, { status: 400 });
        }

        const buffer = new Uint8Array(await file.arrayBuffer());
        const workbook = XLSX.read(buffer, { type: 'array' });
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[];

        let success = 0;
        const errors: string[] = [];

        for (const row of jsonData) {
            const rollNo = String(row.RollNo ?? '').trim();
            const rebateDays = Number(row.RebateDays);
            const messRate = row.MessRate != null ? Number(row.MessRate) : null;
            const gstPercentage = row.GSTPercentage != null ? Number(row.GSTPercentage) : null;

            if (!rollNo || isNaN(rebateDays)) {
                errors.push(`Row missing or invalid: ${JSON.stringify(row)}`);
                continue;
            }

            const student = await prisma.student.findUnique({
                where: { rollNo },
                include: { course: true }
            });
            if (!student) { errors.push(`Student not found: ${rollNo}`); continue; }

            // Upsert the monthly rebate
            await prisma.monthlyRebate.upsert({
                where: { studentId_sessionId_month_year: { studentId: student.id, sessionId, month, year } },
                update: { rebateDays },
                create: { studentId: student.id, sessionId, month, year, rebateDays },
            });
            success++;

            // Ensure the student has a mess assignment for this session.
            // If one doesn't exist and a messId was selected in the form, create it.
            let resolvedMessId: number | null = null;
            if (formMessId) {
                const assignment = await prisma.studentMessAssignment.upsert({
                    where: { studentId_sessionId: { studentId: student.id, sessionId } },
                    update: {},   // don't overwrite an existing assignment's mess
                    create: { studentId: student.id, messId: formMessId, sessionId },
                });
                resolvedMessId = assignment.messId;
            } else {
                const assignment = await prisma.studentMessAssignment.findUnique({
                    where: { studentId_sessionId: { studentId: student.id, sessionId } }
                });
                resolvedMessId = assignment?.messId ?? null;
            }

            // Upsert MessRate if MessRate or GSTPercentage column is provided in Excel
            if ((messRate != null || gstPercentage != null) && student.courseId && resolvedMessId) {
                await prisma.messRate.upsert({
                    where: {
                        messId_courseId_sessionId_month: {
                            messId: resolvedMessId,
                            courseId: student.courseId,
                            sessionId,
                            month,
                        }
                    },
                    update: {
                        ...(messRate != null ? { monthlyRate: messRate } : {}),
                        ...(gstPercentage != null ? { gstPercentage } : {}),
                    },
                    create: {
                        messId: resolvedMessId,
                        courseId: student.courseId,
                        sessionId,
                        month,
                        monthlyRate: messRate ?? 0,
                        gstPercentage: gstPercentage ?? 0,
                    },
                });
            } else if ((messRate != null || gstPercentage != null) && !resolvedMessId) {
                errors.push(`${rollNo}: no mess selected or assigned — MessRate not saved`);
            }
        }

        return NextResponse.json({ message: `Processed ${success} rebate entries`, errors }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
