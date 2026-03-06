'use client';
import { useState, useEffect } from 'react';
import { Card } from '../../../../components/ui/Card';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function ConsolidatedViewPage() {
    const [reportData, setReportData] = useState<any[]>([]);
    const [sessions, setSessions] = useState<any[]>([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/sessions').then(r => r.json()).then(d => setSessions(Array.isArray(d) ? d : []));
    }, []);

    const fetchReport = async (sessionId: string) => {
        setLoading(true);
        try {
            const url = sessionId ? `/api/reports/consolidated-view?sessionId=${sessionId}` : '/api/reports/consolidated-view';
            const res = await fetch(url);
            const data = await res.json();
            if (Array.isArray(data)) setReportData(data);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchReport(selectedSession); }, [selectedSession]);

    const filteredData = reportData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        const headers = ['Roll No', 'Name', 'Course', 'Mess', 'Hostel', 'Bank Account', 'IFSC', 'Mess Security',
            ...MONTH_NAMES.map(m => `${m} Rebate`), 'Total Rebate Days', 'Total Fees Deposited'];
        const rows = filteredData.map(s => {
            const monthRebates = Array.from({ length: 12 }, (_, i) => {
                const r = s.monthlyRebates?.find((x: any) => x.month === (i + 1));
                return r ? r.rebateDays : 0;
            });
            return [s.rollNo, s.name, s.course || '-', s.mess, s.hostel || '-',
                s.bankAccountNo || '-', s.ifsc || '-', s.messSecurity,
                ...monthRebates, s.totalRebateDays, s.totalFeesDeposited].join(',');
        });
        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url; link.download = 'consolidated_report.csv';
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
    };

    return (
        <div className="max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Consolidated Report</h1>
                    <p className="text-slate-500 mt-1 font-medium">View and export comprehensive student data.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <select value={selectedSession} onChange={e => setSelectedSession(e.target.value)}
                        className="border border-slate-200 bg-white px-3 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm">
                        <option value="">All Sessions</option>
                        {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Search…"
                            className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm w-48 font-medium"
                            value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                    <button onClick={handleExport}
                        className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2.5 rounded-xl hover:bg-emerald-100 font-semibold text-sm transition-all flex items-center gap-2 shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Export CSV
                    </button>
                    <a href="/admin/reports" className="text-slate-500 hover:text-indigo-600 font-medium text-sm flex items-center gap-1 transition-colors px-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back
                    </a>
                </div>
            </div>

            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex flex-col items-center justify-center text-slate-400">
                        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        <p className="font-medium animate-pulse">Loading report data…</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="min-w-full text-left border-collapse text-sm whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    <th className="p-4">Roll No</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Course</th>
                                    <th className="p-4">Mess</th>
                                    <th className="p-4">Hostel</th>
                                    <th className="p-4">Bank Account</th>
                                    <th className="p-4">IFSC</th>
                                    <th className="p-4 text-right bg-slate-100/50">Mess Security</th>
                                    {MONTH_NAMES.map(m => <th key={m} className="p-4 text-right bg-orange-50/50">{m} Rebate</th>)}
                                    <th className="p-4 text-right bg-orange-50">Total Rebate Days</th>
                                    <th className="p-4 text-right bg-teal-50/50">Total Fees</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredData.map((student) => (
                                    <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors">
                                        <td className="p-4 font-bold text-slate-800">{student.rollNo}</td>
                                        <td className="p-4 font-medium text-slate-700">{student.name}</td>
                                        <td className="p-4">
                                            {student.course ? <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">{student.course}</span> : '-'}
                                        </td>
                                        <td className="p-4 text-slate-600">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">{student.mess || '-'}</span>
                                        </td>
                                        <td className="p-4 text-slate-600">{student.hostel || '-'}</td>
                                        <td className="p-4 font-mono text-xs text-slate-500">{student.bankAccountNo || '-'}</td>
                                        <td className="p-4 font-mono text-xs text-slate-500">{student.ifsc || '-'}</td>
                                        <td className="p-4 text-right font-medium text-slate-700 bg-slate-50/50">₹{student.messSecurity?.toLocaleString() || 0}</td>
                                        {Array.from({ length: 12 }, (_, i) => {
                                            const r = student.monthlyRebates?.find((x: any) => x.month === (i + 1));
                                            return (
                                                <td key={i} className="p-4 text-right text-slate-600 bg-orange-50/20">
                                                    {r ? <span className="font-medium text-orange-700">{r.rebateDays}d</span> : <span className="text-slate-300">-</span>}
                                                </td>
                                            );
                                        })}
                                        <td className="p-4 text-right font-bold text-orange-700 bg-orange-50/40">{student.totalRebateDays}d</td>
                                        <td className="p-4 text-right font-bold text-teal-700 bg-teal-50/20">₹{student.totalFeesDeposited?.toLocaleString(undefined, { minimumFractionDigits: 0 }) || 0}</td>
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan={20} className="p-8 text-center text-slate-500">
                                            <p className="text-lg font-medium text-slate-700">No records found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}
