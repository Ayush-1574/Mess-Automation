import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

// POST /api/upload-hostel-assignments
// Excel columns: EntryNo, HostelName
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

        const buffer = new Uint8Array(await file.arrayBuffer());
        const workbook = XLSX.read(buffer, { type: 'array' });
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as any[];

        let success = 0;
        const errors: string[] = [];

        for (const row of jsonData) {
            const entryNo = String(row.EntryNo ?? '').trim();
            const hostelName = String(row.HostelName ?? '').trim();

            if (!entryNo || !hostelName) {
                errors.push(`Row missing fields: ${JSON.stringify(row)}`);
                continue;
            }

            const student = await prisma.student.findUnique({ where: { entryNo } });
            if (!student) { errors.push(`Student not found: ${entryNo}`); continue; }

            // Upsert hostel — create if it doesn't exist
            const hostel = await prisma.hostel.upsert({
                where: { name: hostelName },
                update: {},
                create: { name: hostelName },
            });

            // Update student's hostel fields
            await prisma.student.update({
                where: { id: student.id },
                data: {
                    hostelId: hostel.id,
                    hostel: hostel.name,
                },
            });
            success++;
        }

        return NextResponse.json({ message: `Assigned ${success} students to hostels`, errors }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
