import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';
import * as XLSX from 'xlsx';

// POST /api/noc/upload-officers — AR bulk uploads officers via Excel
// Expected columns: Name, Email, Role (ADMIN_OFFICER / JOINT_SUPERINTENDENT / ASSISTANT_REGISTRAR), Course, Batch
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

        const validRoles = ['ADMIN_OFFICER', 'JOINT_SUPERINTENDENT', 'ASSISTANT_REGISTRAR'];
        let processed = 0;
        let errors: string[] = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const name = String(row['Name'] || row['name'] || '').trim();
            const email = String(row['Email'] || row['email'] || '').trim();
            let role = String(row['Role'] || row['role'] || '').trim().toUpperCase();

            if (!name || !email || !role) {
                errors.push(`Row ${i + 2}: Missing Name, Email, or Role`);
                continue;
            }

            // Normalize role names
            if (role === 'ADMIN' || role === 'ADMIN OFFICER' || role === 'AO') role = 'ADMIN_OFFICER';
            if (role === 'JOINT SUPERINTENDENT' || role === 'JS' || role === 'JR SUPDT' || role === 'JR. SUPDT') role = 'JOINT_SUPERINTENDENT';
            if (role === 'ASSISTANT REGISTRAR' || role === 'AR' || role === 'ASST REGISTRAR') role = 'ASSISTANT_REGISTRAR';

            if (!validRoles.includes(role)) {
                errors.push(`Row ${i + 2}: Invalid role '${row['Role']}' for ${name}. Must be ADMIN_OFFICER, JOINT_SUPERINTENDENT, or ASSISTANT_REGISTRAR`);
                continue;
            }

            const course = String(row['Course'] || row['course'] || '').trim() || null;
            const batch = String(row['Batch'] || row['batch'] || '').trim() || null;

            try {
                await nocPrisma.nocOfficer.upsert({
                    where: { email },
                    update: { name, role: role as any, course, batch },
                    create: { name, email, role: role as any, course, batch },
                });
                processed++;
            } catch (err: any) {
                errors.push(`Row ${i + 2}: Error for ${name} - ${err.message}`);
            }
        }

        return NextResponse.json({
            message: `Processed ${processed} officers successfully`,
            totalRows: rows.length,
            processed,
            errors: errors.length > 0 ? errors : undefined,
        });
    } catch (error) {
        console.error('Upload officers error:', error);
        return NextResponse.json({ error: 'Failed to process upload' }, { status: 500 });
    }
}
