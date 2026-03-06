'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

export default function MonthlyRebatesPage() {
    const [sessions, setSessions] = useState<any[]>([]);
    const [messes, setMesses] = useState<any[]>([]);
    const [rebates, setRebates] = useState<any[]>([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [form, setForm] = useState({
        rollNo: '', sessionId: '',
        month: String(new Date().getMonth() + 1),
        year: String(new Date().getFullYear()),
        rebateDays: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [fetching, setFetching] = useState(false);

    // Bulk upload state
    const [showBulkPanel, setShowBulkPanel] = useState(false);
    const [bulkForm, setBulkForm] = useState({
        sessionId: '', messId: '', hostel: '',
        month: String(new Date().getMonth() + 1),
        year: String(new Date().getFullYear()),
    });
    const [bulkFile, setBulkFile] = useState<File | null>(null);
    const [bulkLoading, setBulkLoading] = useState(false);
    const [bulkResult, setBulkResult] = useState<{ message?: string; errors?: string[]; error?: string } | null>(null);

    useEffect(() => {
        fetch('/api/sessions').then(r => r.json()).then(d => setSessions(Array.isArray(d) ? d : []));
        fetch('/api/messes').then(r => r.json()).then(d => setMesses(Array.isArray(d) ? d : []));
    }, []);

    const fetchRebates = async (sessionId: string) => {
        setFetching(true);
        const res = await fetch(`/api/monthly-rebates?sessionId=${sessionId}`);
        const data = await res.json();
        setRebates(Array.isArray(data) ? data : []);
        setFetching(false);
    };

    useEffect(() => { if (selectedSession) fetchRebates(selectedSession); }, [selectedSession]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setMessage('');
        try {
            const res = await fetch('/api/monthly-rebates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, month: Number(form.month), year: Number(form.year), rebateDays: Number(form.rebateDays) }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Rebate saved!');
                setForm(p => ({ ...p, rollNo: '', rebateDays: '' }));
                if (selectedSession) fetchRebates(selectedSession);
            } else setMessage(data.error || 'Failed');
        } catch { setMessage('Error'); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this rebate entry?')) return;
        await fetch('/api/monthly-rebates', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        if (selectedSession) fetchRebates(selectedSession);
    };

    const handleBulkUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bulkFile) return;
        setBulkLoading(true);
        setBulkResult(null);
        try {
            const formData = new FormData();
            formData.append('file', bulkFile);
            formData.append('sessionId', bulkForm.sessionId);
            formData.append('month', bulkForm.month);
            formData.append('year', bulkForm.year);
            formData.append('hostel', bulkForm.hostel);
            formData.append('messId', bulkForm.messId);
            const res = await fetch('/api/upload-monthly-rebates', { method: 'POST', body: formData });
            const data = await res.json();
            setBulkResult(data);
            setBulkFile(null);
            if (selectedSession) fetchRebates(selectedSession);
        } finally {
            setBulkLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Monthly Rebates</h1>
                    <p className="text-slate-500 mt-2 font-medium">Record rebate days granted to students per month.</p>
                </div>
                <button
                    onClick={() => { setShowBulkPanel(p => !p); setBulkResult(null); }}
                    className="flex items-center gap-2 bg-indigo-600 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm shadow-lg shadow-indigo-200"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    {showBulkPanel ? 'Close Bulk Upload' : 'Bulk Upload'}
                </button>
            </div>

            {/* Bulk Upload Panel */}
            {showBulkPanel && (
                <Card className="p-6 border-2 border-indigo-100 bg-indigo-50/30">
                    <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>Bulk Rebate Upload
                        <span className="ml-auto text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Select context below, then upload Excel</span>
                    </h2>
                    <form onSubmit={handleBulkUpload} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Session</label>
                                <select value={bulkForm.sessionId} onChange={e => setBulkForm(p => ({ ...p, sessionId: e.target.value }))} required
                                    className="w-full border border-slate-200 bg-white px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                                    <option value="">Select session</option>
                                    {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Mess</label>
                                <select value={bulkForm.messId} onChange={e => setBulkForm(p => ({ ...p, messId: e.target.value }))} required
                                    className="w-full border border-slate-200 bg-white px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                                    <option value="">Select mess</option>
                                    {messes.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Hostel</label>
                                <input
                                    value={bulkForm.hostel}
                                    onChange={e => setBulkForm(p => ({ ...p, hostel: e.target.value }))}
                                    placeholder="e.g. Chenab"
                                    className="w-full border border-slate-200 bg-white px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Month</label>
                                <select value={bulkForm.month} onChange={e => setBulkForm(p => ({ ...p, month: e.target.value }))} required
                                    className="w-full border border-slate-200 bg-white px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                                    {MONTH_NAMES.map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Year</label>
                                <input type="number" value={bulkForm.year} onChange={e => setBulkForm(p => ({ ...p, year: e.target.value }))} required min="2000" max="2100"
                                    className="w-full border border-slate-200 bg-white px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Excel File</label>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={e => setBulkFile(e.target.files?.[0] ?? null)}
                                    required
                                    className="block w-full text-sm text-slate-500 file:cursor-pointer file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button type="submit" disabled={!bulkFile || bulkLoading}
                                className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 text-sm">
                                {bulkLoading ? 'Processing…' : 'Upload & Process'}
                            </button>
                            <p className="text-xs text-slate-500 font-medium">
                                Excel columns: <span className="font-mono font-semibold text-slate-600">RollNo, StudentName, RebateDays, MessRate, GSTPercentage</span>
                            </p>
                        </div>
                    </form>
                    {bulkResult && (
                        <div className={`mt-4 p-3 rounded-xl border text-sm ${bulkResult.error || (bulkResult.errors && bulkResult.errors.length > 0) ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
                            {bulkResult.message && <p className="font-semibold text-slate-800">{bulkResult.message}</p>}
                            {bulkResult.error && <p className="font-semibold text-rose-700">{bulkResult.error}</p>}
                            {bulkResult.errors && bulkResult.errors.length > 0 && (
                                <ul className="mt-2 space-y-1 max-h-40 overflow-y-auto">
                                    {bulkResult.errors.map((e, i) => <li key={i} className="text-amber-700 text-xs font-medium">⚠ {e}</li>)}
                                </ul>
                            )}
                        </div>
                    )}
                </Card>
            )}

            <Card className="p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-orange-500 rounded-full"></span>Add / Update Rebate
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Roll Number</label>
                            <input value={form.rollNo} onChange={e => setForm(p => ({ ...p, rollNo: e.target.value }))}
                                placeholder="e.g. 2023CSB1100" required
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-medium" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Session</label>
                            <select value={form.sessionId} onChange={e => setForm(p => ({ ...p, sessionId: e.target.value }))} required
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50">
                                <option value="">Select session</option>
                                {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Month</label>
                            <select value={form.month} onChange={e => setForm(p => ({ ...p, month: e.target.value }))} required
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50">
                                {MONTH_NAMES.map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Year</label>
                            <input type="number" value={form.year} onChange={e => setForm(p => ({ ...p, year: e.target.value }))} required
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50" min="2000" max="2100" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Rebate Days</label>
                            <input type="number" value={form.rebateDays} onChange={e => setForm(p => ({ ...p, rebateDays: e.target.value }))} required min="0" max="31"
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50" placeholder="0" />
                        </div>
                    </div>
                    <button type="submit" disabled={loading}
                        className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50">
                        {loading ? 'Saving…' : 'Save Rebate'}
                    </button>
                </form>
                {message && <p className={`mt-3 text-sm font-semibold ${message.includes('!') ? 'text-emerald-600' : 'text-rose-600'}`}>{message}</p>}
            </Card>

            <Card className="p-0 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800">View Rebates by Session</h2>
                    <select value={selectedSession} onChange={e => setSelectedSession(e.target.value)}
                        className="border border-slate-200 bg-white px-3 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50">
                        <option value="">-- Select session --</option>
                        {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
                {fetching ? (
                    <div className="p-8 text-center text-slate-400">Loading…</div>
                ) : !selectedSession ? (
                    <div className="p-8 text-center text-slate-400 font-medium">Select a session to view rebates.</div>
                ) : rebates.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 font-medium">No rebates recorded for this session.</div>
                ) : (
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="p-4 text-left">Roll No</th>
                                <th className="p-4 text-left">Student</th>
                                <th className="p-4 text-center">Month</th>
                                <th className="p-4 text-center">Year</th>
                                <th className="p-4 text-center">Rebate Days</th>
                                <th className="p-4 text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rebates.map((r: any) => (
                                <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 font-bold text-slate-800">{r.student.rollNo}</td>
                                    <td className="p-4 text-slate-700 font-medium">{r.student.name}</td>
                                    <td className="p-4 text-center text-slate-600">{MONTH_NAMES[r.month - 1]}</td>
                                    <td className="p-4 text-center text-slate-600">{r.year}</td>
                                    <td className="p-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 border border-orange-100 font-bold text-xs">{r.rebateDays}d</span>
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        <button onClick={() => handleDelete(r.id)}
                                            className="text-rose-600 text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Card>
        </div>
    );
}
