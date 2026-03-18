import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

// POST /api/upload-mess-assignments
// Excel columns: EntryNo, MessName, SessionName
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
            const entryNo = String(row.EntryNo ?? '').trim();
            const messName = String(row.MessName ?? '').trim();
            const sessionName = String(row.SessionName ?? '').trim();

            if (!entryNo || !messName || !sessionName) {
                errors.push(`Row missing fields: ${JSON.stringify(row)}`);
                continue;
            }

            let messId = messMap.get(messName.toLowerCase());
            const sessionId = sessionMap.get(sessionName.toLowerCase());

            if (!sessionId) { errors.push(`Session not found: ${sessionName}`); continue; }

            // Create mess if it doesn't exist
            if (!messId) {
                const newMess = await prisma.mess.upsert({
                    where: { name: messName },
                    update: {},
                    create: { name: messName },
                });
                messId = newMess.id;
                messMap.set(messName.toLowerCase(), messId);
            }

            const student = await prisma.student.findUnique({ where: { entryNo } });
            if (!student) { errors.push(`Student not found: ${entryNo}`); continue; }

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
