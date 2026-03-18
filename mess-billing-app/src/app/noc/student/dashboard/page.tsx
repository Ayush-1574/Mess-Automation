'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { Card } from '../../../../components/ui/Card';

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
    PENDING_ADMIN: { label: 'Pending Admin Review', bg: 'bg-amber-100', text: 'text-amber-700' },
    PENDING_JOINT_SUPT: { label: 'Pending Joint Supdt.', bg: 'bg-blue-100', text: 'text-blue-700' },
    PENDING_ASST_REGISTRAR: { label: 'Pending Asst. Registrar', bg: 'bg-purple-100', text: 'text-purple-700' },
    APPROVED: { label: 'Approved', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    REJECTED: { label: 'Rejected', bg: 'bg-rose-100', text: 'text-rose-700' },
};

const TYPE_LABELS: Record<string, string> = {
    BONAFIDE: 'Bonafide Certificate',
    CHARACTER: 'Character Certificate',
    FEE_STRUCTURE: 'Fee Structure Certificate',
    OTHER: 'Other Certificate',
};

function DashboardContent() {
    const searchParams = useSearchParams();
    const rollNo = searchParams.get('rollNo');
    const getLink = (path: string) => rollNo ? `${path}?rollNo=${rollNo}` : path;

    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (rollNo) {
            fetch(`/api/noc/student/${rollNo}`)
                .then(res => {
                    if (!res.ok) throw new Error('Student not found');
                    return res.json();
                })
                .then(data => setStudent(data))
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setError('No roll number provided');
        }
    }, [rollNo]);

    if (loading) return <div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading applications...</div>;
    if (error) return (
        <div className="text-center mt-20">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-1 ring-rose-100">
                <svg className="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Student Not Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">{error}. Please contact the Assistant Registrar to register your details.</p>
        </div>
    );

    const applications = student?.applications || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Applications</h1>
                    <p className="text-slate-500 mt-2 font-medium">Welcome, <strong className="text-slate-700">{student?.name}</strong> ({student?.rollNo})</p>
                </div>
                <Link href={getLink('/noc/student/apply')}>
                    <button className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform transition-all active:scale-[0.98] shadow-md shadow-emerald-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        New Application
                    </button>
                </Link>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total', count: applications.length, color: 'slate' },
                    { label: 'Pending', count: applications.filter((a: any) => a.status.startsWith('PENDING')).length, color: 'amber' },
                    { label: 'Approved', count: applications.filter((a: any) => a.status === 'APPROVED').length, color: 'emerald' },
                    { label: 'Rejected', count: applications.filter((a: any) => a.status === 'REJECTED').length, color: 'rose' },
                ].map(({ label, count, color }) => (
                    <Card key={label} hoverEffect={false} className={`p-4 bg-${color}-50/50 border-${color}-100/50`}>
                        <p className={`text-xs font-bold uppercase tracking-wider text-${color}-600/70 mb-1`}>{label}</p>
                        <p className="text-2xl font-extrabold text-slate-800">{count}</p>
                    </Card>
                ))}
            </div>

            {/* Applications List */}
            <Card className="p-0 overflow-hidden border border-slate-200/60 shadow-md">
                <div className="p-6 border-b border-slate-100/50 flex items-center gap-3 bg-slate-50/40 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shadow-inner border border-emerald-100/50">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Application History</h2>
                </div>

                <div className="p-0 overflow-x-auto">
                    {applications.length > 0 ? (
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Purpose</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {applications.map((app: any) => {
                                    const status = STATUS_CONFIG[app.status] || STATUS_CONFIG.PENDING_ADMIN;
                                    return (
                                        <tr key={app.id} className="hover:bg-emerald-50/30 transition-colors group">
                                            <td className="p-4 text-slate-600 font-medium">
                                                {new Date(app.applicationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="p-4 font-semibold text-slate-800">{TYPE_LABELS[app.certificateType] || app.certificateType}</td>
                                            <td className="p-4 text-slate-600 max-w-xs truncate">{app.purpose}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.bg} ${status.text}`}>
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {app.status === 'APPROVED' && app.certificate ? (
                                                    <Link href={getLink(`/noc/student/certificate/${app.id}`)} className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm inline-flex items-center gap-1">
                                                        View Certificate
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                                    </Link>
                                                ) : (
                                                    <span className="text-slate-400 text-sm">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-sm">
                                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            </div>
                            <p className="text-slate-600 font-bold text-lg">No applications yet</p>
                            <p className="text-slate-500 mt-2 font-medium max-w-sm mx-auto">Click "New Application" to submit your first certificate request.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}

export default function NocStudentDashboard() {
    return (
        <Suspense fallback={<div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
