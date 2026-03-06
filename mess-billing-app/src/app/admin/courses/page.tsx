'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [fetching, setFetching] = useState(true);

    const fetchCourses = async () => {
        setFetching(true);
        const res = await fetch('/api/courses');
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
        setFetching(false);
    };

    useEffect(() => { fetchCourses(); }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setMessage('');
        try {
            const res = await fetch('/api/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            const data = await res.json();
            if (res.ok) { setMessage('Course added!'); setName(''); fetchCourses(); }
            else setMessage(data.error || 'Failed to add course');
        } catch { setMessage('Error adding course'); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this course?')) return;
        try {
            const res = await fetch('/api/courses', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
            if (res.ok) { setMessage('Course deleted'); fetchCourses(); }
            else setMessage('Failed to delete');
        } catch { setMessage('Error deleting'); }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Courses</h1>
                <p className="text-slate-500 mt-2 font-medium">Manage academic courses (BTech, MTech, PhD, etc.)</p>
            </div>

            <Card className="p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>Add New Course
                </h2>
                <form onSubmit={handleAdd} className="flex gap-3">
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. BTech, MTech, PhD"
                        required
                        className="flex-1 border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-medium"
                    />
                    <button type="submit" disabled={loading}
                        className="bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50">
                        {loading ? 'Adding…' : 'Add'}
                    </button>
                </form>
                {message && (
                    <p className={`mt-3 text-sm font-semibold ${message.includes('!') || message.includes('deleted') ? 'text-emerald-600' : 'text-rose-600'}`}>{message}</p>
                )}
            </Card>

            <Card className="p-0 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800">All Courses</h2>
                </div>
                {fetching ? (
                    <div className="p-8 text-center text-slate-400 font-medium">Loading…</div>
                ) : courses.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 font-medium">No courses yet. Add one above.</div>
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
                            {courses.map((c, i) => (
                                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 text-slate-400 font-medium">{i + 1}</td>
                                    <td className="p-4 font-bold text-slate-800">{c.name}</td>
                                    <td className="p-4 text-right pr-6">
                                        <button onClick={() => handleDelete(c.id)}
                                            className="text-rose-600 hover:text-rose-800 text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors">
                                            Delete
                                        </button>
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
