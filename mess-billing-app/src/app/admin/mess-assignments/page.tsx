'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';
import { UploadWithErrors } from '../../../components/ui/UploadWithErrors';


export default function MessAssignmentsPage() {
    const [sessions, setSessions] = useState<any[]>([]);
    const [messes, setMesses] = useState<any[]>([]);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [form, setForm] = useState({ rollNo: '', messId: '', sessionId: '', amount: '' });
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
                body: JSON.stringify({ ...form, amount: form.amount ? Number(form.amount) : 0 }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Assignment saved!');
                setForm(p => ({ ...p, rollNo: '', amount: '' }));
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

    const handleBulkUpload = () => {
        if (selectedSession) fetchAssignments(selectedSession);
    };

    const totalAmount = assignments.reduce((sum: number, a: any) => sum + (a.amount ?? 0), 0);

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mess Assignments</h1>
                <p className="text-slate-500 mt-2 font-medium">Assign students to a mess and record fees for a specific session.</p>
            </div>

            <Card className="p-6 relative z-40">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>New Assignment
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Roll Number</label>
                            <input value={form.rollNo} onChange={e => setForm(p => ({ ...p, rollNo: e.target.value }))}
                                placeholder="e.g. 2023CSB1100" required
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Session</label>
                            <Select
                                theme="success"
                                value={form.sessionId}
                                onChange={val => setForm(p => ({ ...p, sessionId: String(val) }))}
                                options={[{ label: 'Select session', value: '' }, ...sessions.map(s => ({ label: s.name, value: s.id }))]}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Mess</label>
                            <Select
                                theme="success"
                                value={form.messId}
                                onChange={val => setForm(p => ({ ...p, messId: String(val) }))}
                                options={[{ label: 'Select mess', value: '' }, ...messes.map(m => ({ label: m.name, value: m.id }))]}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Fees Deposited (₹)</label>
                            <input value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                                placeholder="0.00" type="number" min="0" step="0.01"
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-medium" />
                        </div>
                    </div>
                    <Button type="submit" isLoading={loading} disabled={loading} variant="success" className="w-full py-3">
                        {loading ? 'Saving…' : 'Save Assignment'}
                    </Button>
                </form>
                {message && <p className={`mt-3 text-sm font-semibold ${message.includes('!') ? 'text-emerald-600' : 'text-rose-600'}`}>{message}</p>}
            </Card>

            <Card className="p-6 relative z-30">
                <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-2 h-6 bg-indigo-500 rounded-full" />Bulk Upload via Excel
                </h2>
                <p className="text-xs text-slate-400 font-medium mb-4">Required columns: <span className="font-mono font-semibold text-slate-500">RollNo, MessName, SessionName, Amount</span></p>
                <UploadWithErrors
                    endpoint="/api/upload-mess-assignments"
                    accent="indigo"
                    uploadLabel="Upload Assignments Excel"
                    errorColumns={[
                        { key: 'RollNo', label: 'RollNo' },
                        { key: 'MessName', label: 'MessName' },
                        { key: 'SessionName', label: 'SessionName' },
                        { key: 'Amount', label: 'Amount' },
                    ]}
                    hints={{ MessName: messes.map((m: any) => m.name), SessionName: sessions.map((s: any) => s.name) }}
                    onSuccess={handleBulkUpload}
                />
            </Card>

            <Card className="p-0 overflow-hidden relative z-20">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">View by Session</h2>
                        {assignments.length > 0 && (
                            <p className="text-sm text-teal-600 font-bold mt-0.5">
                                Total Fees: ₹{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                        )}
                    </div>
                    <div className="w-48">
                        <Select
                            theme="success"
                            value={selectedSession}
                            onChange={val => setSelectedSession(String(val))}
                            options={[{ label: '-- Select session --', value: '' }, ...sessions.map(s => ({ label: s.name, value: s.id }))]}
                        />
                    </div>
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
                                <th className="p-4 text-right">Fees (₹)</th>
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
                                    <td className="p-4 text-right font-bold text-teal-700">
                                        ₹{(a.amount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(a.id)}>Remove</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-teal-50/50 border-t-2 border-teal-100">
                                <td colSpan={3} className="p-4 font-bold text-slate-700 text-xs uppercase tracking-wide">Total</td>
                                <td className="p-4 text-right font-extrabold text-teal-800 text-base">
                                    ₹{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                )}
            </Card>
        </div>
    );
}
