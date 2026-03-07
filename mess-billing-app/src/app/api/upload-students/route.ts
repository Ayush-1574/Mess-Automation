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

        // Pre-fetch courses for name lookup
        const allCourses = await prisma.course.findMany();
        const courseMap = new Map(allCourses.map(c => [c.name.toLowerCase(), c.id]));

        let processed = 0;
        const errors: string[] = [];

        for (const row of jsonData as any[]) {
            if (!row.RollNo || !row.Name) continue;

            // Upsert Hostel record and get its ID
            let hostelId: number | null = null;
            const hostelName = row.Hostel ? String(row.Hostel).trim() : null;
            if (hostelName) {
                const hostel = await prisma.hostel.upsert({
                    where: { name: hostelName },
                    update: {},
                    create: { name: hostelName },
                });
                hostelId = hostel.id;
            }

            const courseId = row.Course
                ? (courseMap.get(String(row.Course).toLowerCase()) ?? null)
                : null;

            try {
                await prisma.student.upsert({
                    where: { rollNo: String(row.RollNo) },
                    update: {
                        name: row.Name,
                        batch: row.Batch ? String(row.Batch) : undefined,
                        hostel: hostelName ?? undefined,
                        hostelId: hostelId ?? undefined,
                        email: row.Email ?? undefined,
                        address: row.Address ?? undefined,
                        messSecurity: row.MessSecurity ? Number(row.MessSecurity) : undefined,
                        bankAccountNo: row.BankAccountNo ? String(row.BankAccountNo) : undefined,
                        bankName: row.BankName ?? undefined,
                        ifsc: row.IFSC ?? undefined,
                        courseId: courseId ?? undefined,
                    },
                    create: {
                        rollNo: String(row.RollNo),
                        name: row.Name,
                        batch: row.Batch ? String(row.Batch) : undefined,
                        hostel: hostelName ?? undefined,
                        hostelId: hostelId ?? undefined,
                        email: row.Email ?? undefined,
                        address: row.Address ?? undefined,
                        messSecurity: row.MessSecurity ? Number(row.MessSecurity) : 0,
                        bankAccountNo: row.BankAccountNo ? String(row.BankAccountNo) : null,
                        bankName: row.BankName ?? undefined,
                        ifsc: row.IFSC ?? undefined,
                        courseId: courseId ?? null,
                    },
                });
                processed++;
            } catch (err) {
                errors.push(`${row.RollNo}: ${(err as any).message}`);
            }
        }

        return NextResponse.json({
            message: `Processed ${processed} students`,
            errors,
        }, { status: 200 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
