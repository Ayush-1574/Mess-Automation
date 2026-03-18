'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { Card } from '../../../../components/ui/Card';
import Link from 'next/link';

function StudentsContent() {
    const searchParams = useSearchParams();
    const officerId = searchParams.get('id');

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [addData, setAddData] = useState<any>({ rollNo: '', name: '', department: '', course: '', batch: '', fatherName: '', gender: '', category: '', hostel: '', roomNo: '', phone: '', email: '', feesPaid: false });

    // Filters
    const [filterCourse, setFilterCourse] = useState('');
    const [filterBatch, setFilterBatch] = useState('');
    const [filterDept, setFilterDept] = useState('');
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const fetchData = useCallback(() => {
        if (!officerId) return;
        setLoading(true);
        const params = new URLSearchParams({ tab: 'students' });
        if (filterCourse) params.set('course', filterCourse);
        if (filterBatch) params.set('batch', filterBatch);
        if (filterDept) params.set('department', filterDept);
        if (search) params.set('search', search);

        fetch(`/api/noc/officer/${officerId}/managed-data?${params}`)
            .then(res => res.json())
            .then(d => setData(d))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [officerId, filterCourse, filterBatch, filterDept, search]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setSearch(searchInput); };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        try {
            const res = await fetch(`/api/noc/officer/${officerId}/managed-data`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'student', data: addData }),
            });
            if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
            setShowAdd(false);
            setAddData({ rollNo: '', name: '', department: '', course: '', batch: '', fatherName: '', gender: '', category: '', hostel: '', roomNo: '', phone: '', email: '', feesPaid: false });
            fetchData();
        } catch (err: any) { alert('Error: ' + err.message); }
        finally { setSaving(false); }
    };

    const handleDelete = async (studentId: number, studentName: string) => {
        if (!confirm(`Delete student "${studentName}"? This cannot be undone.`)) return;
        try {
            const res = await fetch(`/api/noc/officer/${officerId}/managed-data?type=student&targetId=${studentId}`, { method: 'DELETE' });
            if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
            fetchData();
        } catch (err: any) { alert('Error: ' + err.message); }
    };

    if (loading && !data) return <div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading students...</div>;

    const officer = data?.officer;
    const students = data?.students || [];
    const opts = data?.filterOptions || { courses: [], batches: [], departments: [] };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Students</h1>
                    <p className="text-slate-500 mt-1 font-medium">
                        {officer?.course ? `${officer.course}${officer.batch ? ` · Batch ${officer.batch}` : ''}` : 'All courses'}
                        <span className="text-slate-400"> · {students.length} results</span>
                    </p>
                </div>
                <button onClick={() => setShowAdd(!showAdd)} className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add Student
                </button>
            </div>

            {/* Add Student Form */}
            {showAdd && (
                <Card className="p-0 overflow-hidden border-emerald-200 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 bg-emerald-50/50 border-b border-emerald-100 flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                        <h3 className="font-bold text-slate-800 text-sm">Add New Student</h3>
                    </div>
                    <form onSubmit={handleAdd} className="p-5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { key: 'rollNo', label: 'Roll No *', placeholder: 'e.g. 2023CSB1107' },
                                { key: 'name', label: 'Name *', placeholder: 'Full Name' },
                                { key: 'department', label: 'Department *', placeholder: 'e.g. CSE' },
                                { key: 'course', label: 'Course *', placeholder: 'e.g. B.Tech' },
                                { key: 'batch', label: 'Batch', placeholder: 'e.g. 2023' },
                                { key: 'fatherName', label: "Father's Name", placeholder: '' },
                                { key: 'email', label: 'Email', placeholder: '' },
                                { key: 'phone', label: 'Phone', placeholder: '' },
                                { key: 'hostel', label: 'Hostel', placeholder: '' },
                                { key: 'roomNo', label: 'Room', placeholder: '' },
                                { key: 'category', label: 'Category', placeholder: 'GEN/OBC/SC/ST' },
                                { key: 'joiningYear', label: 'Joining Year', placeholder: '2023-24' },
                            ].map(f => (
                                <div key={f.key}>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{f.label}</label>
                                    <input value={addData[f.key] || ''} onChange={e => setAddData({ ...addData, [f.key]: e.target.value })} placeholder={f.placeholder}
                                        required={f.label.includes('*')} className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none focus:border-emerald-300 transition-all" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Gender</label>
                                <select value={addData.gender || ''} onChange={e => setAddData({ ...addData, gender: e.target.value || null })} className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none">
                                    <option value="">Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4 justify-end">
                            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors">Cancel</button>
                            <button type="submit" disabled={saving} className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50">
                                {saving ? 'Adding...' : 'Add Student'}
                            </button>
                        </div>
                    </form>
                </Card>
            )}

            {/* Filters */}
            <Card hoverEffect={false} className="p-4 bg-slate-50/30">
                <div className="flex flex-wrap items-end gap-3">
                    <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Search</label>
                        <div className="flex gap-2">
                            <input value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Name, Roll No, Email..."
                                className="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none focus:border-emerald-300 transition-all bg-white" />
                            <button type="submit" className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </div>
                    </form>
                    {opts.courses.length > 1 && (
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Course</label>
                            <select value={filterCourse} onChange={e => setFilterCourse(e.target.value)} className="text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none bg-white min-w-[120px]">
                                <option value="">All</option>
                                {opts.courses.map((c: string) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    )}
                    {opts.batches.length > 1 && (
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Batch</label>
                            <select value={filterBatch} onChange={e => setFilterBatch(e.target.value)} className="text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none bg-white min-w-[100px]">
                                <option value="">All</option>
                                {opts.batches.map((b: string) => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>
                    )}
                    {opts.departments.length > 1 && (
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Department</label>
                            <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none bg-white min-w-[140px]">
                                <option value="">All</option>
                                {opts.departments.map((d: string) => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    )}
                    {(filterCourse || filterBatch || filterDept || search) && (
                        <button onClick={() => { setFilterCourse(''); setFilterBatch(''); setFilterDept(''); setSearch(''); setSearchInput(''); }}
                            className="px-3 py-2 text-xs font-bold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors self-end">
                            Clear
                        </button>
                    )}
                </div>
            </Card>

            {/* Table */}
            <Card className="p-0 overflow-hidden border border-slate-200/60 shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                {['Roll No', 'Name', 'Department', 'Course', 'Batch', 'Hostel', 'Fees', 'Apps', 'Actions'].map(h => (
                                    <th key={h} className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {students.map((s: any) => (
                                <tr key={s.id} className="hover:bg-emerald-50/30 transition-colors">
                                    <td className="p-3 text-sm font-bold text-slate-800">{s.rollNo}</td>
                                    <td className="p-3 text-sm font-semibold text-slate-700">{s.name}</td>
                                    <td className="p-3 text-sm text-slate-600">{s.department}</td>
                                    <td className="p-3"><span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-bold">{s.course}</span></td>
                                    <td className="p-3 text-sm text-slate-600">{s.batch || '—'}</td>
                                    <td className="p-3 text-sm text-slate-600">{s.hostel || '—'}</td>
                                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full font-bold ${s.feesPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{s.feesPaid ? 'Yes' : 'No'}</span></td>
                                    <td className="p-3 text-sm text-slate-600">{s._count?.applications || 0}</td>
                                    <td className="p-3">
                                        <div className="flex gap-1.5">
                                            <Link href={`/noc/officer/students/${s.id}?id=${officerId}`}
                                                className="px-2.5 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg hover:bg-emerald-100 transition-colors" title="View Details">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                            </Link>
                                            <button onClick={() => handleDelete(s.id, s.name)} className="px-2.5 py-1.5 bg-rose-50 text-rose-500 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors" title="Delete">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {students.length === 0 && <div className="p-12 text-center text-slate-500 font-medium">No students found matching your filters.</div>}
                </div>
            </Card>
        </div>
    );
}

export default function StudentsPage() {
    return (
        <Suspense fallback={<div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading...</div>}>
            <StudentsContent />
        </Suspense>
    );
}
