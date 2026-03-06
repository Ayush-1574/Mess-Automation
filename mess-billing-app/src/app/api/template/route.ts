import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function GET() {
    try {
        const data = [
            {
                RollNo: '2023CSB1101',
                Name: 'Aditi Sharma',
                Batch: '2023',
                Course: 'BTech',
                Hostel: 'H1',
                Email: 'aditi@example.com',
                Address: '',
                MessSecurity: 0,
                BankAccountNo: '12345678901',
                BankName: 'SBI',
                IFSC: 'SBIN0001234'
            },
            {
                RollNo: '2023CSB1102',
                Name: 'Rahul Verma',
                Batch: '2023',
                Course: 'MTech',
                Hostel: 'H2',
                Email: 'rahul@example.com',
                Address: '',
                MessSecurity: 0,
                BankAccountNo: '98765432109',
                BankName: 'HDFC',
                IFSC: 'HDFC0001234'
            }
        ];

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
