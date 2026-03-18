import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const includeBankDetails = formData.get('includeBankDetails') === 'true';

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
            const entryNoValue = row.EntryNo || row.RollNo;
            if (!entryNoValue || !row.Name) continue;

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

            let courseId: number | null = null;
            if (row.Course) {
                const courseName = String(row.Course).trim();
                const loweredCourseName = courseName.toLowerCase();
                
                if (courseMap.has(loweredCourseName)) {
                    courseId = courseMap.get(loweredCourseName)!;
                } else {
                    const newCourse = await prisma.course.upsert({
                        where: { name: courseName },
                        update: {},
                        create: { name: courseName },
                    });
                    courseId = newCourse.id;
                    courseMap.set(loweredCourseName, courseId);
                }
            }

            try {
                await prisma.student.upsert({
                    where: { entryNo: String(entryNoValue) },
                    update: {
                        name: row.Name,
                        batch: row.Batch ? String(row.Batch) : undefined,
                        hostel: hostelName ?? undefined,
                        hostelId: hostelId ?? undefined,
                        email: row.Email ?? undefined,
                        address: row.Address ? String(row.Address) : undefined,
                        messSecurity: row.MessSecurity ? Number(row.MessSecurity) : undefined,
                        ...(includeBankDetails ? {
                            bankAccountNo: row.BankAccountNo ? String(row.BankAccountNo) : undefined,
                            bankName: row.BankName ? String(row.BankName) : undefined,
                            ifsc: row.IFSC ? String(row.IFSC) : undefined,
                        } : {}),
                        courseId: courseId ?? undefined,
                    },
                    create: {
                        entryNo: String(entryNoValue),
                        name: row.Name,
                        batch: row.Batch ? String(row.Batch) : undefined,
                        hostel: hostelName ?? undefined,
                        hostelId: hostelId ?? undefined,
                        email: row.Email ?? undefined,
                        address: row.Address ? String(row.Address) : undefined,
                        messSecurity: row.MessSecurity ? Number(row.MessSecurity) : 0,
                        ...(includeBankDetails ? {
                            bankAccountNo: row.BankAccountNo ? String(row.BankAccountNo) : null,
                            bankName: row.BankName ? String(row.BankName) : undefined,
                            ifsc: row.IFSC ? String(row.IFSC) : undefined,
                        } : {}),
                        courseId: courseId ?? null,
                    },
                });
                processed++;
            } catch (err) {
                errors.push(`${entryNoValue}: ${(err as any).message}`);
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
