'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { Card } from '../../../../components/ui/Card';
import Link from 'next/link';

const ROLE_LABELS: Record<string, string> = {
    ADMIN_OFFICER: 'Admin Officer',
    JOINT_SUPERINTENDENT: 'Joint Superintendent',
    ASSISTANT_REGISTRAR: 'Asst. Registrar',
};

function OfficersContent() {
    const searchParams = useSearchParams();
    const officerId = searchParams.get('id');

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [addData, setAddData] = useState<any>({ name: '', email: '', role: 'ADMIN_OFFICER', course: '', batch: '' });

    // Filters
    const [filterRole, setFilterRole] = useState('');
    const [filterCourse, setFilterCourse] = useState('');
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const fetchData = useCallback(() => {
        if (!officerId) return;
        setLoading(true);
        const params = new URLSearchParams({ tab: 'officers' });
        if (filterRole) params.set('role', filterRole);
        if (filterCourse) params.set('course', filterCourse);
        if (search) params.set('search', search);

        fetch(`/api/noc/officer/${officerId}/managed-data?${params}`)
            .then(res => res.json())
            .then(d => setData(d))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [officerId, filterRole, filterCourse, search]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setSearch(searchInput); };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        try {
            const payload = { ...addData };
            if (!payload.course) delete payload.course;
            if (!payload.batch) delete payload.batch;
            const res = await fetch(`/api/noc/officer/${officerId}/managed-data`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'officer', data: payload }),
            });
            if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
            setShowAdd(false);
            setAddData({ name: '', email: '', role: 'ADMIN_OFFICER', course: '', batch: '' });
            fetchData();
        } catch (err: any) { alert('Error: ' + err.message); }
        finally { setSaving(false); }
    };

    const handleDelete = async (offId: number, offName: string) => {
        if (!confirm(`Delete officer "${offName}"? This cannot be undone.`)) return;
        try {
            const res = await fetch(`/api/noc/officer/${officerId}/managed-data?type=officer&targetId=${offId}`, { method: 'DELETE' });
            if (!res.ok) { const err = await res.json(); throw new Error(err.error); }
            fetchData();
        } catch (err: any) { alert('Error: ' + err.message); }
    };

    if (loading && !data) return <div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading officers...</div>;

    const officer = data?.officer;
    const officers = data?.officers || [];
    const opts = data?.filterOptions || { roles: [], courses: [] };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Officers</h1>
                    <p className="text-slate-500 mt-1 font-medium">
                        {officer?.role === 'JOINT_SUPERINTENDENT' ? `Admin Officers for ${officer.course || 'all courses'}` : 'All officers'}
                        <span className="text-slate-400"> · {officers.length} results</span>
                    </p>
                </div>
                <button onClick={() => setShowAdd(!showAdd)} className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Add Officer
                </button>
            </div>

            {/* Add Officer Form */}
            {showAdd && (
                <Card className="p-0 overflow-hidden border-emerald-200 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 bg-emerald-50/50 border-b border-emerald-100 flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                        <h3 className="font-bold text-slate-800 text-sm">Add New Officer</h3>
                    </div>
                    <form onSubmit={handleAdd} className="p-5">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Name *</label>
                                <input value={addData.name} onChange={e => setAddData({...addData, name: e.target.value})} required
                                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none focus:border-emerald-300 transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email *</label>
                                <input type="email" value={addData.email} onChange={e => setAddData({...addData, email: e.target.value})} required
                                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none focus:border-emerald-300 transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Role *</label>
                                <select value={addData.role} onChange={e => setAddData({...addData, role: e.target.value})}
                                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none bg-white"
                                    disabled={officer?.role === 'JOINT_SUPERINTENDENT'}>
                                    <option value="ADMIN_OFFICER">Admin Officer</option>
                                    {officer?.role === 'ASSISTANT_REGISTRAR' && <>
                                        <option value="JOINT_SUPERINTENDENT">Joint Superintendent</option>
                                        <option value="ASSISTANT_REGISTRAR">Asst. Registrar</option>
                                    </>}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Course</label>
                                <input value={addData.course} onChange={e => setAddData({...addData, course: e.target.value})} placeholder="e.g. B.Tech"
                                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none focus:border-emerald-300 transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Batch</label>
                                <input value={addData.batch} onChange={e => setAddData({...addData, batch: e.target.value})} placeholder="e.g. 2023"
                                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none focus:border-emerald-300 transition-all" />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4 justify-end">
                            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-200 transition-colors">Cancel</button>
                            <button type="submit" disabled={saving} className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50">
                                {saving ? 'Adding...' : 'Add Officer'}
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
                            <input value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Name or Email..."
                                className="flex-1 text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none focus:border-emerald-300 transition-all bg-white" />
                            <button type="submit" className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </div>
                    </form>
                    {opts.roles.length > 1 && (
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Role</label>
                            <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none bg-white min-w-[150px]">
                                <option value="">All</option>
                                {opts.roles.map((r: string) => <option key={r} value={r}>{ROLE_LABELS[r] || r}</option>)}
                            </select>
                        </div>
                    )}
                    {opts.courses.length > 1 && (
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Course</label>
                            <select value={filterCourse} onChange={e => setFilterCourse(e.target.value)} className="text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none bg-white min-w-[120px]">
                                <option value="">All</option>
                                {opts.courses.map((c: string) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    )}
                    {(filterRole || filterCourse || search) && (
                        <button onClick={() => { setFilterRole(''); setFilterCourse(''); setSearch(''); setSearchInput(''); }}
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
                                {['ID', 'Name', 'Email', 'Role', 'Course', 'Batch', 'Actions Done', 'Manage'].map(h => (
                                    <th key={h} className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {officers.map((off: any) => (
                                <tr key={off.id} className="hover:bg-emerald-50/30 transition-colors">
                                    <td className="p-3 text-sm font-bold text-slate-800">{off.id}</td>
                                    <td className="p-3 text-sm font-semibold text-slate-700">{off.name}</td>
                                    <td className="p-3 text-sm text-slate-500">{off.email}</td>
                                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full font-bold ${off.role === 'ADMIN_OFFICER' ? 'bg-amber-100 text-amber-700' : off.role === 'JOINT_SUPERINTENDENT' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{ROLE_LABELS[off.role]}</span></td>
                                    <td className="p-3">{off.course ? <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-bold">{off.course}</span> : <span className="text-slate-400 text-sm">All</span>}</td>
                                    <td className="p-3 text-sm text-slate-600">{off.batch || '—'}</td>
                                    <td className="p-3 text-sm text-slate-600">{off._count?.actions || 0}</td>
                                    <td className="p-3">
                                        <div className="flex gap-1.5">
                                            <Link href={`/noc/officer/officers/${off.id}?id=${officerId}`}
                                                className="px-2.5 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors" title="View Details">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                            </Link>
                                            <button onClick={() => handleDelete(off.id, off.name)} className="px-2.5 py-1.5 bg-rose-50 text-rose-500 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors" title="Delete">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {officers.length === 0 && <div className="p-12 text-center text-slate-500 font-medium">No officers found matching your filters.</div>}
                </div>
            </Card>
        </div>
    );
}

export default function OfficersPage() {
    return (
        <Suspense fallback={<div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading...</div>}>
            <OfficersContent />
        </Suspense>
    );
}
