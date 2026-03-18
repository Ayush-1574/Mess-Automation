import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const includeBankDetails = searchParams.get('includeBankDetails') === 'true';
        const baseData = [
            {
                EntryNo: '2023CSB1101',
                Name: 'Aditi Sharma',
                Batch: '2023',
                Course: 'B.Tech',
                Hostel: 'H1',
                Email: 'aditi@example.com',
                Address: '123 Main Street, Delhi',
                MessSecurity: 5000,
            },
            {
                EntryNo: '2023CSB1102',
                Name: 'Rahul Verma',
                Batch: '2023',
                Course: 'M.Tech',
                Hostel: 'H2',
                Email: 'rahul@example.com',
                Address: '456 Park Avenue, Mumbai',
                MessSecurity: 5000,
            }
        ];

        const data = baseData.map(row => {
            if (includeBankDetails) {
                return {
                    ...row,
                    BankAccountNo: row.EntryNo === '2023CSB1101' ? '12345678901' : '98765432109',
                    BankName: row.EntryNo === '2023CSB1101' ? 'SBI' : 'HDFC',
                    IFSC: row.EntryNo === '2023CSB1101' ? 'SBIN0001234' : 'HDFC0001234',
                };
            }
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

        const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        return new Response(buf, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="student_template.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate template' }, { status: 500 });
    }
}
