const XLSX = require('xlsx');
const ws = XLSX.utils.aoa_to_sheet([['EntryNo', 'HostelName']]);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
XLSX.writeFile(wb, "public/templates/sample_hostel_assignments.xlsx");
console.log('Template created!');
