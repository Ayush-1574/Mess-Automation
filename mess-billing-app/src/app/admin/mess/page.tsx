'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export default function MessPage() {
    const [messes, setMesses] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [fetching, setFetching] = useState(true);

    const fetchMesses = async () => {
        setFetching(true);
        const res = await fetch('/api/mess');
        const data = await res.json();
        setMesses(Array.isArray(data) ? data : []);
        setFetching(false);
    };

    useEffect(() => { fetchMesses(); }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setMessage('');
        try {
            const res = await fetch('/api/mess', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            const data = await res.json();
            if (res.ok) { setMessage('Mess added!'); setName(''); fetchMesses(); }
            else setMessage(data.error || 'Failed to add mess');
        } catch { setMessage('Error adding mess'); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this mess?')) return;
        try {
            const res = await fetch('/api/mess', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
            if (res.ok) { setMessage('Mess deleted'); fetchMesses(); }
            else setMessage('Failed to delete');
        } catch { setMessage('Error deleting'); }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Messes</h1>
                <p className="text-slate-500 mt-2 font-medium">Manage dining messes in the institution</p>
            </div>

            <Card className="p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>Add New Mess
                </h2>
                <form onSubmit={handleAdd} className="flex gap-3">
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Main Mess, Satluj Mess"
                        required
                        className="flex-1 border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-medium"
                    />
                    <Button type="submit" isLoading={loading} disabled={loading} variant="primary">
                        {loading ? 'Adding…' : 'Add'}
                    </Button>
                </form>
                {message && (
                    <p className={`mt-3 text-sm font-semibold ${message.includes('!') || message.includes('deleted') ? 'text-emerald-600' : 'text-rose-600'}`}>{message}</p>
                )}
            </Card>

            <Card className="p-0 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800">All Messes</h2>
                </div>
                {fetching ? (
                    <div className="p-8 text-center text-slate-400 font-medium">Loading…</div>
                ) : messes.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 font-medium">No messes yet. Add one above.</div>
                ) : (
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="p-4 text-left">#</th>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {messes.map((m, i) => (
                                <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 text-slate-400 font-medium">{i + 1}</td>
                                    <td className="p-4 font-bold text-slate-800">{m.name}</td>
                                    <td className="p-4 text-right pr-6">
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(m.id)}>
                                            Delete
                                        </Button>
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
