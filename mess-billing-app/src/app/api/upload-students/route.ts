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
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        // Pre-fetch courses for name lookup
        const allCourses = await prisma.course.findMany();
        const courseMap = new Map(allCourses.map(c => [c.name.toLowerCase(), c.id]));

        // Pre-fetch existing rollNos
        const existingStudents = await prisma.student.findMany({ select: { rollNo: true, email: true } });
        const existingRollNos = new Set(existingStudents.map(s => s.rollNo.toLowerCase()));
        const existingEmails = new Set(existingStudents.filter(s => s.email).map(s => s.email!.toLowerCase()));

        const validRows: any[] = [];
        const errorRows: any[] = [];

        for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];
            const rowNum = i + 2; // 1-indexed + header
            const issues: string[] = [];

            // Required field checks
            if (!row.RollNo || String(row.RollNo).trim() === '') {
                issues.push('Roll Number is missing');
            }
            if (!row.Name || String(row.Name).trim() === '') {
                issues.push('Name is missing');
            }

            const rollNo = row.RollNo ? String(row.RollNo).trim() : '';
            const email = row.Email ? String(row.Email).trim() : '';

            // Duplicate in DB
            if (rollNo && existingRollNos.has(rollNo.toLowerCase())) {
                issues.push(`Roll No "${rollNo}" already exists in the database`);
            }
            if (email && existingEmails.has(email.toLowerCase())) {
                issues.push(`Email "${email}" already exists in the database`);
            }

            // Duplicate within file
            const dupeInFile = jsonData.findIndex((r, idx) =>
                idx !== i && r.RollNo && String(r.RollNo).trim().toLowerCase() === rollNo.toLowerCase()
            );
            if (rollNo && dupeInFile >= 0 && dupeInFile < i) {
                issues.push(`Duplicate Roll No in file (row ${dupeInFile + 2})`);
            }

            // Course lookup
            let courseId: number | null = null;
            if (row.Course && String(row.Course).trim() !== '') {
                const found = courseMap.get(String(row.Course).trim().toLowerCase());
                if (found !== undefined) {
                    courseId = found;
                } else {
                    issues.push(`Course "${row.Course}" not found — available: ${allCourses.map(c => c.name).join(', ')}`);
                }
            }

            // Email format
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                issues.push(`Email "${email}" is not valid`);
            }

            if (issues.length > 0) {
                errorRows.push({
                    _rowNum: rowNum,
                    _issues: issues,
                    RollNo: row.RollNo ?? '',
                    Name: row.Name ?? '',
                    Batch: row.Batch ?? '',
                    Course: row.Course ?? '',
                    Hostel: row.Hostel ?? '',
                    Email: row.Email ?? '',
                    Address: row.Address ?? '',
                    MessSecurity: row.MessSecurity ?? '',
                    BankAccountNo: row.BankAccountNo ?? '',
                    BankName: row.BankName ?? '',
                    IFSC: row.IFSC ?? '',
                });
            } else {
                validRows.push({
                    rollNo,
                    name: String(row.Name).trim(),
                    batch: row.Batch ? String(row.Batch) : null,
                    courseId,
                    hostel: row.Hostel ? String(row.Hostel) : null,
                    email: email || null,
                    address: row.Address ? String(row.Address) : null,
                    messSecurity: row.MessSecurity ? Number(row.MessSecurity) : 0,
                    bankAccountNo: row.BankAccountNo ? String(row.BankAccountNo) : null,
                    bankName: row.BankName ? String(row.BankName) : null,
                    ifsc: row.IFSC ? String(row.IFSC) : null,
                });
            }
        }

        // Only insert valid rows
        if (validRows.length > 0) {
            await prisma.student.createMany({ data: validRows, skipDuplicates: true });
        }

        return NextResponse.json({
            imported: validRows.length,
            skipped: errorRows.length,
            errorRows,
        }, { status: 200 });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
