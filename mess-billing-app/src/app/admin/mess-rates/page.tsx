'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function MessRatesPage() {
    const [sessions, setSessions] = useState<any[]>([]);
    const [messes, setMesses] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [rates, setRates] = useState<any[]>([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [form, setForm] = useState({ messId: '', courseId: '', sessionId: '', month: '', monthlyRate: '', gstPercentage: '0' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        fetch('/api/sessions').then(r => r.json()).then(d => setSessions(Array.isArray(d) ? d : []));
        fetch('/api/messes').then(r => r.json()).then(d => setMesses(Array.isArray(d) ? d : []));
        fetch('/api/courses').then(r => r.json()).then(d => setCourses(Array.isArray(d) ? d : []));
    }, []);

    const fetchRates = async (sessionId: string) => {
        setFetching(true);
        const res = await fetch(`/api/mess-rates?sessionId=${sessionId}`);
        const data = await res.json();
        setRates(Array.isArray(data) ? data : []);
        setFetching(false);
    };

    useEffect(() => { if (selectedSession) fetchRates(selectedSession); }, [selectedSession]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setMessage('');
        try {
            const res = await fetch('/api/mess-rates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    month: Number(form.month),
                    monthlyRate: Number(form.monthlyRate),
                    gstPercentage: Number(form.gstPercentage)
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Rate saved!');
                if (selectedSession) fetchRates(selectedSession);
            } else setMessage(data.error || 'Failed');
        } catch { setMessage('Error'); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this rate?')) return;
        await fetch('/api/mess-rates', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        if (selectedSession) fetchRates(selectedSession);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mess Rates</h1>
                <p className="text-slate-500 mt-2 font-medium">Set monthly mess rates per mess, course, session and month.</p>
            </div>

            <Card className="p-6 relative z-30">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-blue-500 rounded-full"></span>Set / Update Rate
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Session</label>
                            <Select
                                value={form.sessionId}
                                onChange={val => setForm(p => ({ ...p, sessionId: String(val) }))}
                                options={[{ label: 'Select session', value: '' }, ...sessions.map(s => ({ label: s.name, value: s.id }))]}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Month</label>
                            <Select
                                value={form.month}
                                onChange={val => setForm(p => ({ ...p, month: String(val) }))}
                                options={[{ label: 'Select month', value: '' }, ...MONTH_NAMES.map((name, i) => ({ label: name, value: String(i + 1) }))]}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Mess</label>
                            <Select
                                value={form.messId}
                                onChange={val => setForm(p => ({ ...p, messId: String(val) }))}
                                options={[{ label: 'Select mess', value: '' }, ...messes.map(m => ({ label: m.name, value: m.id }))]}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Course</label>
                            <Select
                                value={form.courseId}
                                onChange={val => setForm(p => ({ ...p, courseId: String(val) }))}
                                options={[{ label: 'Select course', value: '' }, ...courses.map(c => ({ label: c.name, value: c.id }))]}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Monthly Rate (₹)</label>
                            <input type="number" value={form.monthlyRate} onChange={e => setForm(p => ({ ...p, monthlyRate: e.target.value }))} required min="0" step="0.01"
                                placeholder="e.g. 4500"
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">GST (%)</label>
                            <input type="number" value={form.gstPercentage} onChange={e => setForm(p => ({ ...p, gstPercentage: e.target.value }))} min="0" max="100" step="0.01"
                                placeholder="e.g. 5"
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                        </div>
                    </div>
                    <Button type="submit" isLoading={loading} disabled={loading} variant="primary" className="w-full py-3">
                        {loading ? 'Saving…' : 'Save Rate'}
                    </Button>
                </form>
                {message && <p className={`mt-3 text-sm font-semibold ${message.includes('!') ? 'text-emerald-600' : 'text-rose-600'}`}>{message}</p>}
            </Card>

            <Card className="p-0 overflow-hidden relative z-20">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800">View Rates by Session</h2>
                    <div className="w-48">
                        <Select
                            value={selectedSession}
                            onChange={val => setSelectedSession(String(val))}
                            options={[{ label: '-- Select session --', value: '' }, ...sessions.map(s => ({ label: s.name, value: s.id }))]}
                        />
                    </div>
                </div>
                {fetching ? (
                    <div className="p-8 text-center text-slate-400">Loading…</div>
                ) : !selectedSession ? (
                    <div className="p-8 text-center text-slate-400 font-medium">Select a session to view rates.</div>
                ) : rates.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 font-medium">No rates set for this session.</div>
                ) : (
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="p-4 text-left">Mess</th>
                                <th className="p-4 text-left">Course</th>
                                <th className="p-4 text-left">Session</th>
                                <th className="p-4 text-left">Month</th>
                                <th className="p-4 text-right">Monthly Rate</th>
                                <th className="p-4 text-right">GST %</th>
                                <th className="p-4 text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {rates.map((r: any) => (
                                <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 font-bold text-slate-800">{r.mess.name}</td>
                                    <td className="p-4 text-slate-700">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">{r.course.name}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100">{r.session.name}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-sky-50 text-sky-700 border border-sky-100">{MONTH_NAMES[r.month - 1]}</span>
                                    </td>
                                    <td className="p-4 text-right font-bold text-slate-800">₹{r.monthlyRate.toLocaleString()}</td>
                                    <td className="p-4 text-right">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">{r.gstPercentage ?? 0}%</span>
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
