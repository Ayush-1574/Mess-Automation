'use client';
import { useState, useEffect } from 'react';
import { Card } from '../../../../components/ui/Card';

export default function ConsolidatedViewPage() {
    const [reportData, setReportData] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [sessions, setSessions] = useState<any[]>([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/sessions').then(r => r.json()).then(d => setSessions(Array.isArray(d) ? d : []));
    }, []);

    const fetchReport = async (sessionId: string) => {
        if (!sessionId) {
            setReportData([]);
            setColumns([]);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/reports/consolidated-view?sessionId=${sessionId}`);
            const json = await res.json();
            if (json && json.data && json.columns) {
                setReportData(json.data);
                setColumns(json.columns);
            } else {
                setReportData([]);
                setColumns([]);
            }
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchReport(selectedSession); }, [selectedSession]);

    const filteredData = reportData.filter(item =>
        (item['Name'] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item['Roll No'] || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        if (!columns.length) return;
        const csv = [
            columns.map(c => `"${c}"`).join(','),
            ...filteredData.map(row => columns.map(c => `"${row[c] ?? ''}"`).join(','))
        ].join('\n');

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
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Consolidated Session Report</h1>
                    <p className="text-slate-500 mt-1 font-medium">Dynamic, complete billing overview matching the Excel export.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <select value={selectedSession} onChange={e => setSelectedSession(e.target.value)}
                        className="border border-slate-200 bg-white px-3 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm">
                        <option value="">-- Select a Session --</option>
                        {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>

                    {selectedSession && (
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" placeholder="Search student…"
                                className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm w-48 font-medium"
                                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>
                    )}

                    {selectedSession && (
                        <button onClick={handleExport}
                            className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2.5 rounded-xl hover:bg-emerald-100 font-semibold text-sm transition-all flex items-center gap-2 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Export CSV
                        </button>
                    )}

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
                        <p className="font-medium animate-pulse">Calculating comprehensive billing report…</p>
                    </div>
                ) : !selectedSession ? (
                    <div className="p-16 text-center text-slate-500">
                        <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <p className="text-lg font-medium text-slate-600">Please select a session from the dropdown to view the report.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="min-w-full text-left border-collapse text-sm whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    {columns.map(c => {
                                        // Auto-color the headers to make them readable
                                        const isRebate = c.includes('Rebate');
                                        const isAmount = c.includes('Amount');
                                        const isFees = c.includes('Fees');
                                        const isTotal = c.startsWith('Total');
                                        const isBal = c.includes('Balance');
                                        
                                        let bgClass = '';
                                        if (isBal) bgClass = 'bg-blue-50/70 text-blue-800';
                                        else if (isTotal && isAmount) bgClass = 'bg-rose-50/60 text-rose-800';
                                        else if (isTotal && isFees) bgClass = 'bg-teal-50/60 text-teal-800';
                                        else if (isRebate) bgClass = 'bg-amber-50/50 text-amber-800';
                                        else if (isAmount) bgClass = 'bg-indigo-50/50 text-indigo-800';

                                        return <th key={c} className={`p-4 ${bgClass}`}>{c}</th>;
                                    })}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredData.map((row, idx) => (
                                    <tr key={row.id || idx} className="hover:bg-slate-50/80 transition-colors">
                                        {columns.map((c, colIdx) => {
                                            const val = row[c];
                                            const isSummary = c.startsWith('Total') || c.includes('Balance');
                                            const isBal = c.includes('Balance');
                                            const isAmountCol = typeof val === 'number' && (c.includes('₹') || c.includes('Security'));
                                            
                                            // Make Roll No bold
                                            if (c === 'Roll No') {
                                                return <td key={colIdx} className="p-4 font-bold text-slate-800">{val}</td>;
                                            }
                                            // Handle numbers formatting
                                            if (isAmountCol) {
                                                const formatted = `₹${val.toLocaleString(undefined, { minimumFractionDigits: isSummary ? 0 : 2 })}`;
                                                const classes = `p-4 text-right font-mono text-xs ${isBal ? (val < 0 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold') : isSummary ? 'font-bold text-slate-700 bg-slate-50/50' : 'text-slate-600'}`;
                                                return <td key={colIdx} className={classes}>{formatted}</td>;
                                            }
                                            if (c.includes('Rebate Days') && typeof val === 'number') {
                                                return <td key={colIdx} className="p-4 text-right font-medium text-amber-700 bg-amber-50/20">{val > 0 ? `${val}d` : '-'}</td>;
                                            }

                                            return <td key={colIdx} className={`p-4 ${isSummary ? 'font-bold bg-slate-50/30' : 'text-slate-700 font-medium'}`}>{val ?? '-'}</td>;
                                        })}
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan={columns.length || 10} className="p-8 text-center text-slate-500">
                                            <p className="text-lg font-medium text-slate-700">No records found matching search</p>
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
