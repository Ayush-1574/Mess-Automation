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

        const studentsToCreate = [];

        for (const row of jsonData as any[]) {
            if (row.RollNo && row.Name) {
                // Course lookup: match by name
                let courseId: number | undefined;
                if (row.Course) {
                    courseId = courseMap.get(String(row.Course).toLowerCase());
                }

                studentsToCreate.push({
                    rollNo: String(row.RollNo),
                    name: row.Name,
                    batch: row.Batch ? String(row.Batch) : undefined,
                    hostel: row.Hostel,
                    email: row.Email,
                    address: row.Address,
                    messSecurity: row.MessSecurity ? Number(row.MessSecurity) : 0,
                    bankAccountNo: row.BankAccountNo ? String(row.BankAccountNo) : null,
                    bankName: row.BankName,
                    ifsc: row.IFSC,
                    courseId: courseId ?? null,
                });
            }
        }

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
