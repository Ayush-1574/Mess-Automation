import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const studentsToCreate = [];

        for (const row of jsonData as any[]) {
            // Validate and map fields. Adjust keys based on Excel header
            if (row.RollNo && row.Name) {
                studentsToCreate.push({
                    rollNo: String(row.RollNo),
                    name: row.Name,
                    batch: row.Batch,
                    mess: row.Mess,
                    hostel: row.Hostel,
                    email: row.Email,
                    bankAccountNo: row.BankAccountNo ? String(row.BankAccountNo) : null,
                    bankName: row.BankName,
                    ifsc: row.IFSC,
                });
            }
        }

        // Bulk create/upsert using transaction or createMany
        // Prisma createMany is faster for non-duplicates
        // But we might want to update if exists. createMany doesn't support upsert usually in sqlite/postgres same way?
        // createMany does skipDuplicates.

        await prisma.student.createMany({
            data: studentsToCreate,
            skipDuplicates: true,
        });

        return NextResponse.json({ message: `Processed ${studentsToCreate.length} students` }, { status: 200 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
