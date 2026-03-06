'use client';
import { useState, useEffect } from 'react';
import { Select } from '../../../../components/ui/Select';
import { Card } from '../../../../components/ui/Card';

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
        <div className="max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Consolidated Report</h1>
                    <p className="text-slate-500 mt-1 font-medium">View, filter, and export comprehensive student billing data.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-grow md:flex-grow-0">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by Roll No or Name..."
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm w-full md:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => setShowBillModal(true)}
                        disabled={selectedStudents.length === 0}
                        className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 font-semibold text-sm transition-all shadow-sm hover:shadow flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        Generate Bill <span className="bg-indigo-500 text-white px-1.5 py-0.5 rounded-md text-xs">{selectedStudents.length}</span>
                    </button>

                    <button
                        onClick={handleExport}
                        className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2.5 rounded-xl hover:bg-emerald-100 font-semibold text-sm transition-all flex items-center gap-2 shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Export CSV
                    </button>

                    <a href="/admin/reports" className="text-slate-500 hover:text-indigo-600 font-medium text-sm flex items-center gap-1 transition-colors px-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back
                    </a>
                </div>
            </div>

            <Card className="p-0 overflow-hidden relative">

                {loading ? (
                    <div className="p-12 flex flex-col items-center justify-center text-slate-400">
                        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        <p className="font-medium animate-pulse">Loading report data...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="min-w-full text-left border-collapse text-sm whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    <th className="p-4 indent-4 w-10">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={selectedStudents.length === filteredData.length && filteredData.length > 0}
                                            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                        />
                                    </th>
                                    <th className="p-4">Roll No</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Mess</th>
                                    <th className="p-4">Bank Account</th>
                                    <th className="p-4">IFSC</th>
                                    <th className="p-4 text-right bg-amber-50/50">Fee Collected</th>
                                    {months.map(m => (
                                        <th key={m} className="p-4 text-right bg-blue-50/50">
                                            {m.replace('-', ' ')}
                                        </th>
                                    ))}
                                    <th className="p-4 text-right">Total Billed</th>
                                    <th className="p-4 text-right">Refund</th>
                                    <th className="p-4 text-right bg-emerald-50/50">Balance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredData.map((student) => (
                                    <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
                                        <td className="p-4 indent-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedStudents.includes(student.id)}
                                                onChange={() => handleSelectStudent(student.id)}
                                                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="p-4 font-bold text-slate-800">{student.rollNo}</td>
                                        <td className="p-4 font-medium text-slate-700">{student.name}</td>
                                        <td className="p-4 text-slate-600">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                                {student.mess}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono text-xs text-slate-500">{student.bankAccountNo || '-'}</td>
                                        <td className="p-4 font-mono text-xs text-slate-500">{student.ifsc || '-'}</td>
                                        <td className="p-4 text-right font-medium text-amber-600 bg-amber-50/20">₹{student.feeCollected}</td>
                                        {months.map(m => {
                                            const billMatch = student.bills.find((b: any) => `${b.month}-${b.year}` === m);
                                            return (
                                                <td key={m} className="p-4 text-right text-slate-600 bg-blue-50/20">
                                                    {billMatch ? <span className="font-medium text-slate-800">₹{billMatch.amount}</span> : '-'}
                                                </td>
                                            )
                                        })}
                                        <td className="p-4 text-right font-bold text-slate-800">₹{student.totalBilled}</td>
                                        <td className="p-4 text-right text-slate-600">₹{student.refund}</td>
                                        <td className={`p-4 text-right font-bold ${student.balance < 0 ? 'text-rose-600 bg-rose-50/50' : 'text-emerald-600 bg-emerald-50/50'}`}>
                                            ₹{student.balance}
                                        </td>
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan={10 + months.length} className="p-8 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                                <p className="text-lg font-medium text-slate-700">No records found</p>
                                                <p className="text-sm">Try adjusting your search filters.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            {/* Modal for Generation */}
            {showBillModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
                    <Card className="p-8 max-w-md w-full animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold tracking-tight text-slate-800">Generate Bulk Bill</h2>
                                <p className="text-sm text-slate-500 font-medium">For {selectedStudents.length} selected students.</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Year</label>
                                    <input
                                        type="number"
                                        value={billForm.year}
                                        onChange={e => setBillForm({ ...billForm, year: parseInt(e.target.value) })}
                                        className="w-full border border-slate-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <Select
                                        label="Month"
                                        value={billForm.month}
                                        onChange={val => setBillForm({ ...billForm, month: val as string })}
                                        options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => ({ label: m, value: m }))}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Total Days</label>
                                    <input
                                        type="number"
                                        value={billForm.totalDays}
                                        onChange={e => setBillForm({ ...billForm, totalDays: parseInt(e.target.value) })}
                                        className="w-full border border-slate-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Rate Per Day</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-slate-500 font-medium">₹</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={billForm.ratePerDay}
                                            onChange={e => setBillForm({ ...billForm, ratePerDay: parseFloat(e.target.value) })}
                                            className="w-full border border-slate-200 pl-8 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    onClick={() => setShowBillModal(false)}
                                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 font-bold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleGenerateBill}
                                    disabled={generating}
                                    className="flex-1 bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
                                >
                                    {generating ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                                            Processing...
                                        </>
                                    ) : (
                                        'Generate Bills'
                                    )}
                                </button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
