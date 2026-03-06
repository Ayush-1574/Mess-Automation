import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

// POST /api/upload-mess-assignments
// Excel columns: RollNo, MessName, SessionName
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

        const buffer = new Uint8Array(await file.arrayBuffer());
        const workbook = XLSX.read(buffer, { type: 'array' });
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[];

        // Pre-fetch lookup maps
        const [allSessions, allMesses] = await Promise.all([
            prisma.session.findMany(),
            prisma.mess.findMany(),
        ]);
        const sessionMap = new Map(allSessions.map(s => [s.name.toLowerCase(), s.id]));
        const messMap = new Map(allMesses.map(m => [m.name.toLowerCase(), m.id]));

        let success = 0;
        const errors: string[] = [];

        for (const row of jsonData) {
            const rollNo = String(row.RollNo ?? '').trim();
            const messName = String(row.MessName ?? '').trim();
            const sessionName = String(row.SessionName ?? '').trim();

            if (!rollNo || !messName || !sessionName) {
                errors.push(`Row missing fields: ${JSON.stringify(row)}`);
                continue;
            }

            const messId = messMap.get(messName.toLowerCase());
            const sessionId = sessionMap.get(sessionName.toLowerCase());

            if (!messId) { errors.push(`Mess not found: ${messName}`); continue; }
            if (!sessionId) { errors.push(`Session not found: ${sessionName}`); continue; }

            const student = await prisma.student.findUnique({ where: { rollNo } });
            if (!student) { errors.push(`Student not found: ${rollNo}`); continue; }

            await prisma.studentMessAssignment.upsert({
                where: { studentId_sessionId: { studentId: student.id, sessionId } },
                update: { messId },
                create: { studentId: student.id, messId, sessionId },
            });
            success++;
        }

        return NextResponse.json({ message: `Processed ${success} assignments`, errors }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
