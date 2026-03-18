/**
 * Dummy Excel data generator for all upload types.
 * Run: node generate-dummy-excel.js
 * Output: public/dummy-data/
 */

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const outDir = path.join(__dirname, 'public', 'dummy-data');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function save(wb, filename) {
    const filePath = path.join(outDir, filename);
    XLSX.writeFile(wb, filePath);
    console.log('✅  Written:', filePath);
}

const courses  = ['BTech', 'MTech', 'PhD', 'MBA'];
const hostels  = ['Chenab', 'Beas', 'Bias', 'Ravi', 'Jhelum'];
const messes   = ['Main Mess', 'New Mess', 'South Mess'];
const sessions = ['2024-I', '2024-II', '2025-I', '2025-II'];
const banks    = ['SBI', 'PNB', 'HDFC', 'Bank of Baroda'];

/* ─────────────────────────────────────────────
   1. STUDENTS
   Columns: RollNo, Name, Batch, Course, Hostel,
            Email, Address, MessSecurity,
            BankAccountNo, BankName, IFSC
───────────────────────────────────────────── */
const students = Array.from({ length: 30 }, (_, i) => {
    const idx  = i + 1;
    const yr   = 2022 + Math.floor(i / 8);
    const c    = courses[i % courses.length];
    const dept = c === 'BTech' ? 'CSB' : c === 'MTech' ? 'EEB' : c === 'PhD' ? 'MEB' : 'MBA';
    return {
        RollNo:        `${yr}${dept}${String(1100 + idx).padStart(4, '0')}`,
        Name:          `Student ${idx}`,
        Batch:         String(yr),
        Course:        c,
        Hostel:        hostels[i % hostels.length],
        Email:         `student${idx}@iitrpr.ac.in`,
        Address:       `Room ${100 + idx}, ${hostels[i % hostels.length]} Hostel, IIT Ropar`,
        MessSecurity:  [5000, 10000, 7500][i % 3],
        BankAccountNo: `${9000000000 + idx}`,
        BankName:      banks[i % banks.length],
        IFSC:          `${banks[i % banks.length].replace(/\s/g, '').substring(0,4).toUpperCase()}0${String(100000 + idx)}`,
    };
});

const wb1 = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb1, XLSX.utils.json_to_sheet(students), 'Students');
save(wb1, 'students.xlsx');

/* ─────────────────────────────────────────────
   2. MESS ASSIGNMENTS
   Columns: RollNo, MessName, SessionName, Amount
───────────────────────────────────────────── */
const assignments = students.map((s, i) => ({
    RollNo:      s.RollNo,
    MessName:    messes[i % messes.length],
    SessionName: sessions[i % sessions.length],
    Amount:      [15000, 18000, 20000, 12000][i % 4],
}));

const wb2 = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb2, XLSX.utils.json_to_sheet(assignments), 'MessAssignments');
save(wb2, 'mess_assignments.xlsx');

/* ─────────────────────────────────────────────
   3. MONTHLY REBATES
   Columns: RollNo, RebateDays, MessRate, GSTPercentage
   (MessRate and GSTPercentage are NOW REQUIRED)

   NOTE: You must select Session + Month + Year
   in the upload form before uploading each sheet.
   Each sheet here targets a specific month.
───────────────────────────────────────────── */

// Mess rates vary by course type
function getRate(rollNo) {
    if (rollNo.includes('CSB') || rollNo.includes('EEB')) return { MessRate: 220, GSTPercentage: 5 };
    if (rollNo.includes('MEB')) return { MessRate: 200, GSTPercentage: 5 };
    return { MessRate: 210, GSTPercentage: 5 };
}

const monthsData = [
    { month: 1, year: 2025, label: 'Jan 2025' },
    { month: 2, year: 2025, label: 'Feb 2025' },
    { month: 3, year: 2025, label: 'Mar 2025' },
];

const wb3 = XLSX.utils.book_new();
for (const { label } of monthsData) {
    const rows = students.map((s, i) => {
        const { MessRate, GSTPercentage } = getRate(s.RollNo);
        return {
            RollNo:        s.RollNo,
            RebateDays:    [0, 2, 3, 5, 7, 0, 1, 4][i % 8],
            MessRate,
            GSTPercentage,
        };
    });
    XLSX.utils.book_append_sheet(wb3, XLSX.utils.json_to_sheet(rows), label);
}
save(wb3, 'monthly_rebates.xlsx');

console.log('\nDone! Files are in:', outDir);
console.log('\nColumn reference:');
console.log('  students.xlsx         → RollNo, Name, Batch, Course, Hostel, Email, Address, MessSecurity, BankAccountNo, BankName, IFSC');
console.log('  mess_assignments.xlsx → RollNo, MessName, SessionName, Amount');
console.log('  monthly_rebates.xlsx  → RollNo, RebateDays, MessRate (required), GSTPercentage (required)');
console.log('                          NOTE: Select Session + Month + Year in the upload form before uploading.');
