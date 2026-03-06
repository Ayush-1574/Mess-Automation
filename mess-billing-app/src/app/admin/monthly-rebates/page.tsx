'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';
import { UploadWithErrors } from '../../../components/ui/UploadWithErrors';

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

    const [showBulkPanel, setShowBulkPanel] = useState(false);
    const [bulkForm, setBulkForm] = useState({
        sessionId: '', messId: '', hostel: '',
        month: String(new Date().getMonth() + 1),
        year: String(new Date().getFullYear()),
    });

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

    const handleBulkSuccess = () => {
        if (selectedSession) fetchRebates(selectedSession);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Monthly Rebates</h1>
                    <p className="text-slate-500 mt-2 font-medium">Record rebate days granted to students per month.</p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => setShowBulkPanel(p => !p)}
                    className="flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    {showBulkPanel ? 'Close Bulk Upload' : 'Bulk Upload'}
                </Button>
            </div>

            {showBulkPanel && (
                <Card className="p-6 border-2 border-indigo-100 bg-indigo-50/30 relative z-40">
                    <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>Bulk Rebate Upload
                        <span className="ml-auto text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Select context first, then upload Excel</span>
                    </h2>
                    {/* Context selectors — passed as extraFields to the API */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Session <span className="text-rose-500">*</span></label>
                            <Select value={bulkForm.sessionId} onChange={val => setBulkForm(p => ({ ...p, sessionId: String(val) }))}
                                options={[{ label: 'Select session', value: '' }, ...sessions.map(s => ({ label: s.name, value: s.id }))]} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Mess (optional)</label>
                            <Select value={bulkForm.messId} onChange={val => setBulkForm(p => ({ ...p, messId: String(val) }))}
                                options={[{ label: 'Select mess', value: '' }, ...messes.map(m => ({ label: m.name, value: m.id }))]} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Month <span className="text-rose-500">*</span></label>
                            <Select value={bulkForm.month} onChange={val => setBulkForm(p => ({ ...p, month: String(val) }))}
                                options={MONTH_NAMES.map((m, i) => ({ label: m, value: String(i + 1) }))} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Year <span className="text-rose-500">*</span></label>
                            <input type="number" value={bulkForm.year} onChange={e => setBulkForm(p => ({ ...p, year: e.target.value }))} min="2000" max="2100"
                                className="w-full border border-slate-200 bg-white px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                        </div>
                    </div>
                    <p className="text-xs text-slate-400 font-medium mb-3">Excel columns: <span className="font-mono font-semibold text-slate-500">RollNo, RebateDays, MessRate (optional), GSTPercentage (optional)</span></p>
                    <UploadWithErrors
                        endpoint="/api/upload-monthly-rebates"
                        accent="orange"
                        uploadLabel="Upload Rebates Excel"
                        extraFields={{ sessionId: bulkForm.sessionId, month: bulkForm.month, year: bulkForm.year, messId: bulkForm.messId, hostel: bulkForm.hostel }}
                        errorColumns={[
                            { key: 'RollNo', label: 'RollNo' },
                            { key: 'RebateDays', label: 'RebateDays' },
                            { key: 'MessRate', label: 'MessRate' },
                            { key: 'GSTPercentage', label: 'GSTPercentage' },
                        ]}
                        onSuccess={handleBulkSuccess}
                    />
                </Card>
            )}

            <Card className="p-6 relative z-30">
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
                            <Select
                                theme="warning"
                                value={form.sessionId}
                                onChange={val => setForm(p => ({ ...p, sessionId: String(val) }))}
                                options={[{ label: 'Select session', value: '' }, ...sessions.map(s => ({ label: s.name, value: s.id }))]}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Month</label>
                            <Select
                                theme="warning"
                                value={form.month}
                                onChange={val => setForm(p => ({ ...p, month: String(val) }))}
                                options={MONTH_NAMES.map((m, i) => ({ label: m, value: String(i + 1) }))}
                            />
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
                    <Button type="submit" variant="warning" isLoading={loading} disabled={loading} className="w-full py-3">
                        {loading ? 'Saving…' : 'Save Rebate'}
                    </Button>
                </form>
                {message && <p className={`mt-3 text-sm font-semibold ${message.includes('!') ? 'text-emerald-600' : 'text-rose-600'}`}>{message}</p>}
            </Card>

            <Card className="p-0 overflow-hidden relative z-20">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800">View Rebates by Session</h2>
                    <div className="w-48">
                        <Select
                            theme="warning"
                            value={selectedSession}
                            onChange={val => setSelectedSession(String(val))}
                            options={[{ label: '-- Select session --', value: '' }, ...sessions.map(s => ({ label: s.name, value: s.id }))]}
                        />
                    </div>
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
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(r.id)}>Delete</Button>
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
