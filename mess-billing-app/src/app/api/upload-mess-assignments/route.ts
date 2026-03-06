import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

// POST /api/upload-mess-assignments
// Excel columns: RollNo, MessName, SessionName, Amount (optional)
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

        const buffer = new Uint8Array(await file.arrayBuffer());
        const workbook = XLSX.read(buffer, { type: 'array' });
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[];

        // Pre-fetch lookup maps
        const [allSessions, allMesses, allStudents] = await Promise.all([
            prisma.session.findMany(),
            prisma.mess.findMany(),
            prisma.student.findMany({ select: { id: true, rollNo: true } }),
        ]);
        const sessionMap = new Map(allSessions.map(s => [s.name.toLowerCase(), s.id]));
        const messMap = new Map(allMesses.map(m => [m.name.toLowerCase(), m.id]));
        const studentMap = new Map(allStudents.map(s => [s.rollNo.toLowerCase(), s.id]));

        let imported = 0;
        const errorRows: any[] = [];
        const validRows: any[] = [];

        for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];
            const issues: string[] = [];
            const rollNo = String(row.RollNo ?? '').trim();
            const messName = String(row.MessName ?? '').trim();
            const sessionName = String(row.SessionName ?? '').trim();
            const amountRaw = row.Amount;
            const amount = amountRaw !== undefined && amountRaw !== '' ? Number(amountRaw) : 0;

            if (!rollNo) issues.push('RollNo is missing');
            if (!messName) issues.push('MessName is missing');
            if (!sessionName) issues.push('SessionName is missing');
            if (amountRaw !== undefined && amountRaw !== '' && isNaN(amount)) issues.push('Amount must be a number');

            const messId = messName ? messMap.get(messName.toLowerCase()) : undefined;
            const sessionId = sessionName ? sessionMap.get(sessionName.toLowerCase()) : undefined;
            const studentId = rollNo ? studentMap.get(rollNo.toLowerCase()) : undefined;

            if (messName && messId === undefined) issues.push(`Mess "${messName}" not found — available: ${allMesses.map(m => m.name).join(', ')}`);
            if (sessionName && sessionId === undefined) issues.push(`Session "${sessionName}" not found — available: ${allSessions.map(s => s.name).join(', ')}`);
            if (rollNo && studentId === undefined) issues.push(`Student with RollNo "${rollNo}" not found`);

            if (issues.length > 0) {
                errorRows.push({ _rowNum: i + 2, _issues: issues, RollNo: rollNo, MessName: messName, SessionName: sessionName, Amount: amountRaw ?? '' });
            } else {
                validRows.push({ studentId: studentId!, messId: messId!, sessionId: sessionId!, amount });
            }
        }

        // Only upsert valid rows
        for (const r of validRows) {
            await prisma.studentMessAssignment.upsert({
                where: { studentId_sessionId: { studentId: r.studentId, sessionId: r.sessionId } },
                update: { messId: r.messId, amount: r.amount },
                create: { studentId: r.studentId, messId: r.messId, sessionId: r.sessionId, amount: r.amount },
            });
            imported++;
        }

        return NextResponse.json({ imported, skipped: errorRows.length, errorRows }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
