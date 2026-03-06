'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

export default function ReportsPage() {
    const [sessions, setSessions] = useState<any[]>([]);
    const [sessionId, setSessionId] = useState('');
    const [month, setMonth] = useState(String(new Date().getMonth() + 1));
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/sessions').then(r => r.json()).then(d => setSessions(Array.isArray(d) ? d : []));
    }, []);

    const download = async (type: 'consolidated' | 'hostel-wise' | 'monthly') => {
        setLoading(true);
        try {
            let url = `/api/reports/${type}?year=${year}`;
            if (sessionId) url += `&sessionId=${sessionId}`;
            if (type === 'monthly') url += `&month=${month}`;
            window.open(url, '_blank');
        } catch { alert('Failed to download report'); }
        finally { setLoading(false); }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Download Reports</h1>
                <p className="text-slate-500 mt-2 font-medium">Export mess data in Excel format.</p>
            </div>

            <Card className="p-8 z-20">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Filter</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Session (optional)</label>
                        <select value={sessionId} onChange={e => setSessionId(e.target.value)}
                            className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50">
                            <option value="">All Sessions</option>
                            {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                    <Select label="Month (for monthly report)" value={month}
                        onChange={(val) => setMonth(val as string)}
                        options={MONTH_NAMES.map((m, i) => ({ label: m, value: String(i + 1) }))} />
                    <Input label="Year" type="number" value={year}
                        onChange={(e) => setYear(Number(e.target.value))} />
                </div>
            </Card>

            <div className="space-y-4">
                {[
                    { title: 'Monthly Student Report', desc: 'Rebate data for the selected month and session.', type: 'monthly' as const, color: 'indigo' },
                    { title: 'Consolidated Yearly Report', desc: 'All students with monthly rebate days and total fees.', type: 'consolidated' as const, color: 'blue' },
                    { title: 'Mess/Hostel Wise Report', desc: 'Rebate summary aggregated and grouped by Mess.', type: 'hostel-wise' as const, color: 'emerald' },
                ].map(({ title, desc, type, color }) => (
                    <Card key={type} className={`p-6 hover:border-${color}-300 hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group`}>
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-full bg-${color}-50 flex items-center justify-center flex-shrink-0 text-${color}-500 group-hover:bg-${color}-500 group-hover:text-white transition-colors`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
                                <p className="text-sm text-slate-500 font-medium mt-1">{desc}</p>
                            </div>
                        </div>
                        <Button onClick={() => download(type)} disabled={loading} variant="secondary">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Excel
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
