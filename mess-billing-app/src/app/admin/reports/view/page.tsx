'use client';
import { useState, useEffect } from 'react';

export default function ConsolidatedViewPage() {
    const [reportData, setReportData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Bulk Bill Generation State
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [showBillModal, setShowBillModal] = useState(false);
    const [billForm, setBillForm] = useState({
        month: 'February',
        year: new Date().getFullYear(),
        totalDays: 28, // Default for Feb
        ratePerDay: 150
    });
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        try {
            const res = await fetch('/api/reports/consolidated-view');
            const data = await res.json();
            if (Array.isArray(data)) {
                setReportData(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic
    const filteredData = reportData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Dynamic Columns for Months
    // We want to ensure chronological order: Jan -> Feb -> ... -> Dec
    const monthOrder: { [key: string]: number } = {
        'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
        'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
    };

    const monthsSet = new Set<string>();
    reportData.forEach(item => {
        item.bills.forEach((b: any) => monthsSet.add(`${b.month}-${b.year}`));
    });

    const months = Array.from(monthsSet).sort((a, b) => {
        const [m1, y1] = a.split('-');
        const [m2, y2] = b.split('-');
        if (y1 !== y2) return parseInt(y1) - parseInt(y2);
        return monthOrder[m1] - monthOrder[m2];
    });

    // Bulk Selection
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedStudents(filteredData.map(s => s.id));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelectStudent = (id: number) => {
        if (selectedStudents.includes(id)) {
            setSelectedStudents(prev => prev.filter(sid => sid !== id));
        } else {
            setSelectedStudents(prev => [...prev, id]);
        }
    };

    const handleGenerateBill = async () => {
        setGenerating(true);
        try {
            const res = await fetch('/api/bill/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentIds: selectedStudents,
                    ...billForm
                })
            });

            if (res.ok) {
                alert(`Bills generated successfully for ${selectedStudents.length} students!`);
                setShowBillModal(false);
                fetchReport(); // Refresh data
            } else {
                alert('Failed to generate bills');
            }
        } catch (error) {
            alert('Error generating bills');
        } finally {
            setGenerating(false);
        }
    };

    const handleExport = () => {
        // Define Columns Order
        const headers = [
            'Roll No',
            'Name',
            'Mess',
            'Bank Account',
            'IFSC',
            'Fee Collected',
            ...months,
            'Total Billed',
            'Refund',
            'Balance'
        ];

        // Generate Rows
        const dataToExport = selectedStudents.length > 0
            ? filteredData.filter(student => selectedStudents.includes(student.id))
            : filteredData;

        const rows = dataToExport.map(student => {
            const monthValues = months.map(m => {
                const bill = student.bills.find((b: any) => `${b.month}-${b.year}` === m);
                return bill ? bill.amount : 0;
            });

            return [
                student.rollNo,
                student.name,
                student.mess,
                student.bankAccountNo || 'N/A',
                student.ifsc || 'N/A',
                student.feeCollected,
                ...monthValues,
                student.totalBilled,
                student.refund,
                student.balance
            ];
        });

        // Create CSV String
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        // Download File
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'consolidated_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-white p-6 rounded shadow overflow-x-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Consolidated Report</h1>
                <div className="space-x-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border p-2 rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => setShowBillModal(true)}
                        disabled={selectedStudents.length === 0}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
                    >
                        Generate Monthly Bill ({selectedStudents.length})
                    </button>
                    <button
                        onClick={handleExport}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Export to Excel/CSV
                    </button>
                    <a href="/admin/reports" className="text-blue-600 hover:underline">Back to Reports</a>
                </div>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="min-w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-100 border-b text-xs uppercase text-gray-600">
                            <th className="p-3 border-r bg-gray-50 text-center w-10">
                                <input type="checkbox" onChange={handleSelectAll} checked={selectedStudents.length === filteredData.length && filteredData.length > 0} />
                            </th>
                            <th className="p-3 border-r bg-gray-50">Roll No</th>
                            <th className="p-3 border-r bg-gray-50">Name</th>
                            <th className="p-3 border-r bg-gray-50">Mess</th>
                            <th className="p-3 border-r bg-gray-50">Bank Account</th>
                            <th className="p-3 border-r bg-gray-50">IFSC</th>
                            <th className="p-3 border-r bg-yellow-50 text-right">Fee Collected</th>
                            {months.map(m => (
                                <th key={m} className="p-3 border-r bg-blue-50 text-right whitespace-nowrap">
                                    {m.replace('-', ' ')}
                                </th>
                            ))}
                            <th className="p-3 border-r bg-gray-50 text-right">Total Billed</th>
                            <th className="p-3 border-r bg-gray-50 text-right">Refund</th>
                            <th className="p-3 bg-green-50 text-right">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((student) => (
                            <tr key={student.id} className="border-b hover:bg-gray-50 text-gray-700">
                                <td className="p-2 border-r text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedStudents.includes(student.id)}
                                        onChange={() => handleSelectStudent(student.id)}
                                    />
                                </td>
                                <td className="p-2 border-r font-medium">{student.rollNo}</td>
                                <td className="p-2 border-r">{student.name}</td>
                                <td className="p-2 border-r">{student.mess}</td>
                                <td className="p-2 border-r font-mono text-xs text-gray-500">{student.bankAccountNo || '-'}</td>
                                <td className="p-2 border-r font-mono text-xs text-gray-500">{student.ifsc || '-'}</td>
                                <td className="p-2 border-r text-right bg-yellow-50 font-medium">₹{student.feeCollected}</td>
                                {months.map(m => {
                                    const billMatch = student.bills.find((b: any) => `${b.month}-${b.year}` === m);
                                    return (
                                        <td key={m} className="p-2 border-r text-right">
                                            {billMatch ? `₹${billMatch.amount}` : '-'}
                                        </td>
                                    )
                                })}
                                <td className="p-2 border-r text-right font-bold">₹{student.totalBilled}</td>
                                <td className="p-2 border-r text-right">₹{student.refund}</td>
                                <td className={`p-2 text-right font-bold ${student.balance < 0 ? 'text-red-600' : 'text-green-600'} bg-green-50`}>
                                    ₹{student.balance}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Modal for Generation */}
            {showBillModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Generate Bill</h2>
                        <p className="text-sm text-gray-500 mb-4">Generating for {selectedStudents.length} selected students.</p>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Year</label>
                                    <input
                                        type="number"
                                        value={billForm.year}
                                        onChange={e => setBillForm({ ...billForm, year: parseInt(e.target.value) })}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Month</label>
                                    <select
                                        value={billForm.month}
                                        onChange={e => setBillForm({ ...billForm, month: e.target.value })}
                                        className="w-full border p-2 rounded"
                                    >
                                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Total Days</label>
                                    <input
                                        type="number"
                                        value={billForm.totalDays}
                                        onChange={e => setBillForm({ ...billForm, totalDays: parseInt(e.target.value) })}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Rate Per Day</label>
                                    <input
                                        type="number"
                                        value={billForm.ratePerDay}
                                        onChange={e => setBillForm({ ...billForm, ratePerDay: parseFloat(e.target.value) })}
                                        className="w-full border p-2 rounded"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowBillModal(false)}
                                    className="px-4 py-2 border rounded hover:bg-gray-50 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleGenerateBill}
                                    disabled={generating}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400 text-sm"
                                >
                                    {generating ? 'Processing...' : 'Generate Bills'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
