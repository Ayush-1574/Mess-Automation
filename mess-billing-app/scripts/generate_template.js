const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const data = [
    {
        RollNo: '2023CSB1101',
        Name: 'Aditi Sharma',
        Batch: '2023',
        Mess: 'Anusha Mess',
        Hostel: 'H1',
        Email: 'aditi@example.com',
        BankAccountNo: '12345678901',
        BankName: 'SBI',
        IFSC: 'SBIN0001234'
    },
    {
        RollNo: '2023CSB1102',
        Name: 'Rahul Verma',
        Batch: '2023',
        Mess: 'Anusha Mess',
        Hostel: 'H2',
        Email: 'rahul@example.com',
        BankAccountNo: '98765432109',
        BankName: 'HDFC',
        IFSC: 'HDFC0001234'
    }
];

const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Students");

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

const filePath = path.join(publicDir, 'student_template.xlsx');
XLSX.writeFile(wb, filePath);
console.log(`Template created at ${filePath}`);
