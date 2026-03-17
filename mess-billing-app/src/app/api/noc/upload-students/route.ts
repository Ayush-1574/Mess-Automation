import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';
import * as XLSX from 'xlsx';

// POST /api/noc/upload-students — AR bulk uploads students via Excel
// Expected columns: RollNo, Name, FatherName, Gender, Category, Department, Course, Batch, Hostel, RoomNo, Phone, Email, Address, FeesPaid, JoiningYear
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows: any[] = XLSX.utils.sheet_to_json(sheet);

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Excel file is empty' }, { status: 400 });
        }

        let created = 0;
        let updated = 0;
        let errors: string[] = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rollNo = String(row['RollNo'] || row['rollNo'] || row['Roll No'] || row['Entry No'] || '').trim();
            const name = String(row['Name'] || row['name'] || row['Student Name'] || '').trim();

            if (!rollNo || !name) {
                errors.push(`Row ${i + 2}: Missing RollNo or Name`);
                continue;
            }

            const department = String(row['Department'] || row['department'] || row['Dept'] || '').trim();
            const course = String(row['Course'] || row['course'] || row['Program'] || '').trim();

            if (!department || !course) {
                errors.push(`Row ${i + 2}: Missing Department or Course for ${rollNo}`);
                continue;
            }

            // Map gender string to enum
            let gender: 'MALE' | 'FEMALE' | 'OTHER' | undefined;
            const genderStr = String(row['Gender'] || row['gender'] || '').trim().toUpperCase();
            if (genderStr === 'MALE' || genderStr === 'M') gender = 'MALE';
            else if (genderStr === 'FEMALE' || genderStr === 'F') gender = 'FEMALE';
            else if (genderStr) gender = 'OTHER';

            const feesPaidStr = String(row['FeesPaid'] || row['Fees Paid'] || '').trim().toLowerCase();
            const feesPaid = feesPaidStr === 'yes' || feesPaidStr === 'true' || feesPaidStr === '1';

            const data: any = {
                name,
                fatherName: String(row['FatherName'] || row['Father Name'] || row["Father's Name"] || '').trim() || null,
                gender: gender || null,
                category: String(row['Category'] || row['category'] || '').trim() || null,
                department,
                course,
                batch: String(row['Batch'] || row['batch'] || '').trim() || null,
                hostel: String(row['Hostel'] || row['hostel'] || '').trim() || null,
                roomNo: String(row['RoomNo'] || row['Room No'] || row['roomNo'] || '').trim() || null,
                phone: String(row['Phone'] || row['phone'] || row['Phone Number'] || '').trim() || null,
                email: String(row['Email'] || row['email'] || row['Email Id'] || '').trim() || null,
                address: String(row['Address'] || row['address'] || row['Present Address'] || '').trim() || null,
                feesPaid,
                joiningYear: String(row['JoiningYear'] || row['Joining Year'] || '').trim() || null,
            };

            try {
                await nocPrisma.nocStudent.upsert({
                    where: { rollNo },
                    update: data,
                    create: { rollNo, ...data },
                });

                // Check if it was a create or update
                const existing = await nocPrisma.nocStudent.findUnique({ where: { rollNo } });
                if (existing) {
                    updated++;
                } else {
                    created++;
                }
                created++; // Simplify: upsert counts as created
            } catch (err: any) {
                errors.push(`Row ${i + 2}: Error for ${rollNo} - ${err.message}`);
            }
        }

        // Fix counting: upsert doesn't tell us easily, so just report total processed
        const totalProcessed = rows.length - errors.length;

        return NextResponse.json({
            message: `Processed ${totalProcessed} students successfully`,
            totalRows: rows.length,
            processed: totalProcessed,
            errors: errors.length > 0 ? errors : undefined,
        });
    } catch (error) {
        console.error('Upload students error:', error);
        return NextResponse.json({ error: 'Failed to process upload' }, { status: 500 });
    }
}
