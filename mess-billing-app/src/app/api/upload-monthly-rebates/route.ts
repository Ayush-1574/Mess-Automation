import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

// POST /api/upload-monthly-rebates
// Form fields: sessionId, month, year, hostelId ("any" | number), messId ("any" | number)
// Excel columns: RollNo, StudentName, RebateDays, MessRate, GSTPercentage
//   + Mess (required when messId="any")
//   + Hostel (required when hostelId="any")
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file      = formData.get('file') as File;
        const sessionId = Number(formData.get('sessionId'));
        const month     = Number(formData.get('month'));
        const year      = Number(formData.get('year'));
        const rawMessId   = formData.get('messId')   as string | null;
        const rawHostelId = formData.get('hostelId') as string | null;

        const anyMess   = rawMessId   === 'any' || !rawMessId;
        const anyHostel = rawHostelId === 'any' || !rawHostelId;
        const formMessId   = anyMess   ? null : Number(rawMessId);
        const formHostelId = anyHostel ? null : Number(rawHostelId);

        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        if (!sessionId || !month || !year)
            return NextResponse.json({ error: 'sessionId, month, and year are required' }, { status: 400 });
        if (month < 1 || month > 12)
            return NextResponse.json({ error: 'month must be between 1 and 12' }, { status: 400 });

        // Fetch mess name map for "any mess" mode
        const allMesses = await prisma.mess.findMany();
        const messByName = new Map(allMesses.map(m => [m.name.toLowerCase().trim(), m.id]));

        // Fetch hostel name map for "any hostel" mode
        const allHostels = await prisma.hostel.findMany();
        const hostelByName = new Map(allHostels.map(h => [h.name.toLowerCase().trim(), h.id]));

        const buffer   = new Uint8Array(await file.arrayBuffer());
        const workbook = XLSX.read(buffer, { type: 'array' });
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[];

        let success = 0;
        const errors: string[] = [];

        for (const row of jsonData) {
            const rollNo     = String(row.RollNo ?? '').trim();
            const rebateDays = Number(row.RebateDays);
            const messRate   = row.MessRate     != null ? Number(row.MessRate)     : null;
            const gstPct     = row.GSTPercentage != null ? Number(row.GSTPercentage) : null;

            if (!rollNo || isNaN(rebateDays)) {
                errors.push(`Row missing or invalid: ${JSON.stringify(row)}`);
                continue;
            }

            const student = await prisma.student.findUnique({
                where: { rollNo },
                include: { course: true },
            });
            if (!student) { errors.push(`Student not found: ${rollNo}`); continue; }

            // ── Resolve mess ───────────────────────────────────────────────
            let resolvedMessId: number | null = formMessId;
            if (anyMess) {
                const messName = String(row.Mess ?? '').trim();
                if (!messName) {
                    errors.push(`${rollNo}: Mess column missing (required when "Any Mess" selected)`);
                    continue;
                }
                // Upsert mess in case it's new
                const messRec = await prisma.mess.upsert({
                    where: { name: messName },
                    update: {},
                    create: { name: messName },
                });
                resolvedMessId = messRec.id;
            }

            // ── Resolve & update hostel ────────────────────────────────────
            let resolvedHostelId: number | null = formHostelId;
            if (anyHostel) {
                const hostelName = String(row.Hostel ?? '').trim();
                if (!hostelName) {
                    errors.push(`${rollNo}: Hostel column missing (required when "Any Hostel" selected)`);
                    continue;
                }
                const hostelRec = await prisma.hostel.upsert({
                    where: { name: hostelName },
                    update: {},
                    create: { name: hostelName },
                });
                resolvedHostelId = hostelRec.id;
                // Update student hostel
                await prisma.student.update({
                    where: { id: student.id },
                    data: { hostelId: hostelRec.id, hostel: hostelName },
                });
            } else if (formHostelId) {
                // Specific hostel selected — update student hostelId if not already set
                const hostelRec = await prisma.hostel.findUnique({ where: { id: formHostelId } });
                if (hostelRec) {
                    await prisma.student.update({
                        where: { id: student.id },
                        data: { hostelId: hostelRec.id, hostel: hostelRec.name },
                    });
                }
            }

            // ── Upsert MonthlyRebate ───────────────────────────────────────
            await prisma.monthlyRebate.upsert({
                where: { studentId_sessionId_month_year: { studentId: student.id, sessionId, month, year } },
                update: { rebateDays },
                create: { studentId: student.id, sessionId, month, year, rebateDays },
            });
            success++;

            // ── Upsert StudentMessAssignment ───────────────────────────────
            if (resolvedMessId) {
                await prisma.studentMessAssignment.upsert({
                    where: { studentId_sessionId: { studentId: student.id, sessionId } },
                    update: {},   // don't overwrite existing assignment's mess
                    create: { studentId: student.id, messId: resolvedMessId, sessionId },
                });
            }

            // ── Upsert MessRate if provided ────────────────────────────────
            if ((messRate != null || gstPct != null) && student.courseId && resolvedMessId) {
                await prisma.messRate.upsert({
                    where: {
                        messId_courseId_sessionId_month: {
                            messId: resolvedMessId,
                            courseId: student.courseId,
                            sessionId,
                            month,
                        },
                    },
                    update: {
                        ...(messRate != null ? { monthlyRate: messRate } : {}),
                        ...(gstPct   != null ? { gstPercentage: gstPct } : {}),
                    },
                    create: {
                        messId: resolvedMessId,
                        courseId: student.courseId,
                        sessionId,
                        month,
                        monthlyRate:   messRate ?? 0,
                        gstPercentage: gstPct   ?? 0,
                    },
                });
            } else if ((messRate != null || gstPct != null) && !resolvedMessId) {
                errors.push(`${rollNo}: no mess resolved — MessRate not saved`);
            }
        }

        return NextResponse.json({ message: `Processed ${success} rebate entries`, errors }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
