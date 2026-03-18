import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

// POST /api/upload-refunds
// Excel columns: EntryNo, Amount, PaymentDate (YYYY-MM-DD), SessionName
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

        const buffer = new Uint8Array(await file.arrayBuffer());
        const workbook = XLSX.read(buffer, { type: 'array' });
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[];

        const allSessions = await prisma.session.findMany();
        const sessionMap = new Map(allSessions.map(s => [s.name.toLowerCase(), s.id]));

        let success = 0;
        const errors: string[] = [];

        for (const row of jsonData) {
            const entryNo = String(row.EntryNo ?? '').trim();
            const amount = Number(row.Amount);
            const paymentDateRaw = row.PaymentDate;
            const sessionName = String(row.SessionName ?? '').trim();

            if (!entryNo || isNaN(amount) || !paymentDateRaw || !sessionName) {
                errors.push(`Row missing or invalid fields: ${JSON.stringify(row)}`);
                continue;
            }

            // Handle Excel serial date numbers and string dates
            let paymentDate: Date;
            if (typeof paymentDateRaw === 'number') {
                const d = XLSX.SSF.parse_date_code(paymentDateRaw) as any;
                paymentDate = new Date(d.y, d.m - 1, d.d);
            } else {
                paymentDate = new Date(paymentDateRaw);
            }

            if (isNaN(paymentDate.getTime())) {
                errors.push(`Invalid date for entryNo ${entryNo}: ${paymentDateRaw}`);
                continue;
            }

            const sessionId = sessionMap.get(sessionName.toLowerCase());
            if (!sessionId) { errors.push(`Session not found: ${sessionName}`); continue; }

            const student = await prisma.student.findUnique({ where: { entryNo } });
            if (!student) { errors.push(`Student not found: ${entryNo}`); continue; }

            await prisma.refund.create({
                data: { studentId: student.id, sessionId, amount, paymentDate },
            });
            success++;
        }

        return NextResponse.json({ message: `Recorded ${success} refunds`, errors }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
