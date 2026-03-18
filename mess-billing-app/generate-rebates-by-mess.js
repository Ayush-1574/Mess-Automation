/**
 * Generates monthly rebate Excel files organized by Session × Mess × Month.
 * Reads mess_assignments.xlsx to determine which students belong to which mess+session.
 *
 * Run: node generate-rebates-by-mess.js
 * Output: public/dummy-data/rebates/
 *
 * HOW TO USE THE OUTPUT FILES:
 * ─────────────────────────────
 * Each folder = one session (e.g. "2025-I")
 * Each file   = one mess (e.g. "Main Mess.xlsx")
 * Each sheet  = one month (e.g. "Jan 2025")
 *
 * Upload workflow:
 *   1. Open the Monthly Rebates page → Bulk Upload
 *   2. Select the Session (matching the folder name)
 *   3. Select the Mess (matching the file name, optional but recommended)
 *   4. Select Month + Year (matching the sheet name)
 *   5. Upload that specific file, using just that sheet's data
 */

const XLSX = require('xlsx');
const path = require('path');
const fs   = require('fs');

// ── Config ──────────────────────────────────────────────────────────────────
const MONTHS = [
    { month: 1, year: 2025, label: 'Jan 2025' },
    { month: 2, year: 2025, label: 'Feb 2025' },
    { month: 3, year: 2025, label: 'Mar 2025' },
    { month: 4, year: 2025, label: 'Apr 2025' },
    { month: 5, year: 2025, label: 'May 2025' },
];

// Mess-wise daily rates (₹ per day, GST %)
const MESS_RATES = {
    'Main Mess':  { MessRate: 230, GSTPercentage: 5 },
    'New Mess':   { MessRate: 220, GSTPercentage: 5 },
    'South Mess': { MessRate: 210, GSTPercentage: 5 },
};

// Rebate pattern: varies per student slot within each mess group
const REBATE_PATTERN = [0, 2, 0, 5, 3, 0, 7, 1, 0, 4, 0, 2, 6, 0, 3, 0, 1, 0, 5, 2,
                        0, 0, 3, 1, 4, 0, 2, 0, 5, 0];

// ── Read mess_assignments.xlsx ───────────────────────────────────────────────
const assignmentsPath = path.join(__dirname, 'public', 'dummy-data', 'mess_assignments.xlsx');
if (!fs.existsSync(assignmentsPath)) {
    console.error('❌  mess_assignments.xlsx not found at:', assignmentsPath);
    console.error('   Run generate-dummy-excel.js first.');
    process.exit(1);
}

const wb     = XLSX.readFile(assignmentsPath);
const rows   = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

//  Group: session → mess → [rollNos]
const groups = {};
rows.forEach(r => {
    const session = String(r.SessionName ?? '').trim();
    const mess    = String(r.MessName    ?? '').trim();
    const rollNo  = String(r.RollNo      ?? '').trim();
    if (!session || !mess || !rollNo) return;
    if (!groups[session])        groups[session]       = {};
    if (!groups[session][mess])  groups[session][mess] = [];
    groups[session][mess].push(rollNo);
});

// ── Generate workbooks ───────────────────────────────────────────────────────
const outBase = path.join(__dirname, 'public', 'dummy-data', 'rebates');
let totalFiles = 0;

for (const [session, messMaps] of Object.entries(groups)) {
    // Sanitize folder name
    const sessionDir = path.join(outBase, session.replace(/[/\\:*?"<>|]/g, '-'));
    fs.mkdirSync(sessionDir, { recursive: true });

    for (const [mess, rollNos] of Object.entries(messMaps)) {
        const rate = MESS_RATES[mess] ?? { MessRate: 220, GSTPercentage: 5 };
        const messWb = XLSX.utils.book_new();

        for (const { label } of MONTHS) {
            const sheetRows = rollNos.map((rollNo, idx) => ({
                RollNo:        rollNo,
                RebateDays:    REBATE_PATTERN[idx % REBATE_PATTERN.length],
                MessRate:      rate.MessRate,
                GSTPercentage: rate.GSTPercentage,
            }));
            XLSX.utils.book_append_sheet(messWb, XLSX.utils.json_to_sheet(sheetRows), label);
        }

        // Sanitize file name
        const fileName = `${mess.replace(/[/\\:*?"<>|]/g, '-')}.xlsx`;
        const filePath = path.join(sessionDir, fileName);
        XLSX.writeFile(messWb, filePath);
        console.log(`✅  ${session} / ${mess}  (${rollNos.length} students × ${MONTHS.length} months)`);
        totalFiles++;
    }
}

console.log(`\n✔  Done — ${totalFiles} file(s) in: ${outBase}`);
console.log(`\n📂  Structure:`);
console.log(`   rebates/`);
for (const [session, messMaps] of Object.entries(groups)) {
    console.log(`     ${session}/`);
    Object.keys(messMaps).forEach(m =>
        console.log(`       ${m}.xlsx  ← sheets: ${MONTHS.map(x => x.label).join(', ')}`)
    );
}
console.log(`\n📌  Upload guide:`);
console.log(`   1. Pick a session folder → open the mess file you want`);
console.log(`   2. In Monthly Rebates → Bulk Upload: select Session, Mess, Month, Year`);
console.log(`   3. Upload the matching sheet (copy it to a new file if needed)`);
console.log(`   4. Repeat per month`);
