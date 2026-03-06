'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

export default function MessAssignmentsPage() {
    const [sessions, setSessions] = useState<any[]>([]);
    const [messes, setMesses] = useState<any[]>([]);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [form, setForm] = useState({ rollNo: '', messId: '', sessionId: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        fetch('/api/sessions').then(r => r.json()).then(d => setSessions(Array.isArray(d) ? d : []));
        fetch('/api/messes').then(r => r.json()).then(d => setMesses(Array.isArray(d) ? d : []));
    }, []);

    const fetchAssignments = async (sessionId: string) => {
        if (!sessionId) return;
        setFetching(true);
        const res = await fetch(`/api/mess-assignments?sessionId=${sessionId}`);
        const data = await res.json();
        setAssignments(Array.isArray(data) ? data : []);
        setFetching(false);
    };

    useEffect(() => { if (selectedSession) fetchAssignments(selectedSession); }, [selectedSession]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setMessage('');
        try {
            const res = await fetch('/api/mess-assignments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Assignment saved!');
                setForm(p => ({ ...p, rollNo: '' }));
                if (selectedSession) fetchAssignments(selectedSession);
            } else setMessage(data.error || 'Failed');
        } catch { setMessage('Error'); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Remove this assignment?')) return;
        await fetch('/api/mess-assignments', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        if (selectedSession) fetchAssignments(selectedSession);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mess Assignments</h1>
                <p className="text-slate-500 mt-2 font-medium">Assign students to a mess for a specific session.</p>
            </div>

            <Card className="p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>New Assignment
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Roll Number</label>
                            <input value={form.rollNo} onChange={e => setForm(p => ({ ...p, rollNo: e.target.value }))}
                                placeholder="e.g. 2023CSB1100" required
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Session</label>
                            <select value={form.sessionId} onChange={e => setForm(p => ({ ...p, sessionId: e.target.value }))} required
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium">
                                <option value="">Select session</option>
                                {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Mess</label>
                            <select value={form.messId} onChange={e => setForm(p => ({ ...p, messId: e.target.value }))} required
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium">
                                <option value="">Select mess</option>
                                {messes.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <button type="submit" disabled={loading}
                        className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50">
                        {loading ? 'Saving…' : 'Save Assignment'}
                    </button>
                </form>
                {message && <p className={`mt-3 text-sm font-semibold ${message.includes('!') ? 'text-emerald-600' : 'text-rose-600'}`}>{message}</p>}
            </Card>

            <Card className="p-0 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800">View by Session</h2>
                    <select value={selectedSession} onChange={e => setSelectedSession(e.target.value)}
                        className="border border-slate-200 bg-white px-3 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                        <option value="">-- Select session --</option>
                        {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
                {fetching ? (
                    <div className="p-8 text-center text-slate-400">Loading…</div>
                ) : !selectedSession ? (
                    <div className="p-8 text-center text-slate-400 font-medium">Select a session to view assignments.</div>
                ) : assignments.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 font-medium">No assignments for this session.</div>
                ) : (
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="p-4 text-left">Roll No</th>
                                <th className="p-4 text-left">Student</th>
                                <th className="p-4 text-left">Mess</th>
                                <th className="p-4 text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {assignments.map((a: any) => (
                                <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 font-bold text-slate-800">{a.student.rollNo}</td>
                                    <td className="p-4 text-slate-700 font-medium">{a.student.name}</td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold">{a.mess.name}</span>
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        <button onClick={() => handleDelete(a.id)}
                                            className="text-rose-600 text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors">Remove</button>
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
