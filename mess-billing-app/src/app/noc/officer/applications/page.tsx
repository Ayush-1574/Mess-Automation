'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { Card } from '../../../../components/ui/Card';

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
    PENDING_ADMIN: { label: 'Pending Admin', bg: 'bg-amber-100', text: 'text-amber-700' },
    PENDING_JOINT_SUPT: { label: 'Pending JS', bg: 'bg-blue-100', text: 'text-blue-700' },
    PENDING_ASST_REGISTRAR: { label: 'Pending AR', bg: 'bg-purple-100', text: 'text-purple-700' },
    APPROVED: { label: 'Approved', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    REJECTED: { label: 'Rejected', bg: 'bg-rose-100', text: 'text-rose-700' },
};

const TYPE_LABELS: Record<string, string> = {
    BONAFIDE: 'Bonafide',
    CHARACTER: 'Character',
    FEE_STRUCTURE: 'Fee Structure',
    OTHER: 'Other',
};

function ApplicationsContent() {
    const searchParams = useSearchParams();
    const officerId = searchParams.get('id');

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const fetchData = useCallback(() => {
        if (!officerId) return;
        setLoading(true);
        const params = new URLSearchParams({ tab: 'applications' });
        if (statusFilter !== 'ALL') params.set('status', statusFilter);
        if (search) params.set('search', search);

        fetch(`/api/noc/officer/${officerId}/managed-data?${params}`)
            .then(res => res.json())
            .then(d => setData(d))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [officerId, statusFilter, search]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setSearch(searchInput); };

    if (loading && !data) return <div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading applications...</div>;

    const officer = data?.officer;
    const apps = data?.applications || [];

    // Count by status
    const counts: Record<string, number> = { ALL: apps.length };
    apps.forEach((a: any) => { counts[a.status] = (counts[a.status] || 0) + 1; });

    return (
        <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">All Applications</h1>
                <p className="text-slate-500 mt-1 font-medium">
                    {officer?.course ? `${officer.course} students` : 'All students'}
                    <span className="text-slate-400"> · {apps.length} results</span>
                </p>
            </div>

            {/* Search + Status Filters */}
            <Card hoverEffect={false} className="p-4 bg-slate-50/30">
                <div className="space-y-3">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Search by student</label>
                            <input value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder="Name or Roll No..."
                                className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:outline-none focus:border-emerald-300 transition-all bg-white" />
                        </div>
                        <button type="submit" className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors self-end">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                        {search && (
                            <button type="button" onClick={() => { setSearch(''); setSearchInput(''); }} className="px-3 py-2 text-xs font-bold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors self-end">Clear</button>
                        )}
                    </form>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { value: 'ALL', label: 'All', bg: 'bg-slate-100', text: 'text-slate-700' },
                            { value: 'PENDING_ADMIN', label: 'Pending Admin', bg: 'bg-amber-100', text: 'text-amber-700' },
                            { value: 'PENDING_JOINT_SUPT', label: 'Pending JS', bg: 'bg-blue-100', text: 'text-blue-700' },
                            { value: 'PENDING_ASST_REGISTRAR', label: 'Pending AR', bg: 'bg-purple-100', text: 'text-purple-700' },
                            { value: 'APPROVED', label: 'Approved', bg: 'bg-emerald-100', text: 'text-emerald-700' },
                            { value: 'REJECTED', label: 'Rejected', bg: 'bg-rose-100', text: 'text-rose-700' },
                        ].map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setStatusFilter(f.value)}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${statusFilter === f.value
                                    ? `${f.bg} ${f.text} ring-2 ring-offset-1 ring-current/20`
                                    : 'bg-white/50 text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
                            >
                                {f.label} ({counts[f.value] || 0})
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            <Card className="p-0 overflow-hidden border border-slate-200/60 shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                {['#', 'Date', 'Student', 'Department', 'Course', 'Type', 'Purpose', 'Status', 'Steps'].map(h => (
                                    <th key={h} className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {apps.map((app: any) => {
                                const status = STATUS_CONFIG[app.status] || STATUS_CONFIG.PENDING_ADMIN;
                                return (
                                    <tr key={app.id} className="hover:bg-emerald-50/30 transition-colors">
                                        <td className="p-3 text-sm font-bold text-slate-800">{app.id}</td>
                                        <td className="p-3 text-sm text-slate-600">{new Date(app.applicationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}</td>
                                        <td className="p-3">
                                            <p className="text-sm font-semibold text-slate-800">{app.student?.name}</p>
                                            <p className="text-[10px] text-slate-400">{app.student?.rollNo}</p>
                                        </td>
                                        <td className="p-3 text-sm text-slate-600">{app.student?.department}</td>
                                        <td className="p-3"><span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-bold">{app.student?.course}</span></td>
                                        <td className="p-3 text-sm font-medium text-slate-700">{TYPE_LABELS[app.certificateType]}</td>
                                        <td className="p-3 text-sm text-slate-600 max-w-[200px] truncate">{app.purpose}</td>
                                        <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.bg} ${status.text}`}>{status.label}</span></td>
                                        <td className="p-3">
                                            <div className="flex gap-1">
                                                {app.actions?.map((act: any, i: number) => (
                                                    <div key={i} title={`${act.officer?.name}: ${act.action}`} className={`w-5 h-5 rounded-full flex items-center justify-center ${act.action === 'VERIFIED' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={act.action === 'VERIFIED' ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} /></svg>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {apps.length === 0 && <div className="p-12 text-center text-slate-500 font-medium">No applications found{statusFilter !== 'ALL' || search ? ' matching your filters' : ''}.</div>}
                </div>
            </Card>
        </div>
    );
}

export default function ApplicationsPage() {
    return (
        <Suspense fallback={<div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading...</div>}>
            <ApplicationsContent />
        </Suspense>
    );
}
