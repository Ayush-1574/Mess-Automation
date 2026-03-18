'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { Card } from '../../../../components/ui/Card';
import dynamic from 'next/dynamic';

const SignaturePad = dynamic(() => import('../../../../components/ui/SignaturePad'), { ssr: false });

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
    PENDING_ADMIN: { label: 'Pending Admin Review', bg: 'bg-amber-100', text: 'text-amber-700' },
    PENDING_JOINT_SUPT: { label: 'Pending Joint Supdt.', bg: 'bg-blue-100', text: 'text-blue-700' },
    PENDING_ASST_REGISTRAR: { label: 'Pending Asst. Registrar', bg: 'bg-purple-100', text: 'text-purple-700' },
    APPROVED: { label: 'Approved', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    REJECTED: { label: 'Rejected', bg: 'bg-rose-100', text: 'text-rose-700' },
};

const TYPE_LABELS: Record<string, string> = {
    BONAFIDE: 'Bonafide',
    CHARACTER: 'Character',
    FEE_STRUCTURE: 'Fee Structure',
    OTHER: 'Other',
};

const ROLE_LABELS: Record<string, string> = {
    ADMIN_OFFICER: 'Admin Officer',
    JOINT_SUPERINTENDENT: 'Joint Superintendent',
    ASSISTANT_REGISTRAR: 'Asst. Registrar',
};

function DashboardContent() {
    const searchParams = useSearchParams();
    const officerId = searchParams.get('id');

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState<number | null>(null);
    const [selectedApp, setSelectedApp] = useState<any>(null);
    const [remarks, setRemarks] = useState('');
    const [signatureData, setSignatureData] = useState<string | null>(null);

    const fetchData = () => {
        if (!officerId) return;
        setLoading(true);
        fetch(`/api/noc/officer/${officerId}/pending`)
            .then(res => {
                if (!res.ok) throw new Error('Officer not found');
                return res.json();
            })
            .then(d => setData(d))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchData(); }, [officerId]);

    // Load saved signature for AR
    useEffect(() => {
        if (data?.officer?.signatureData) {
            setSignatureData(data.officer.signatureData);
        }
    }, [data?.officer?.signatureData]);

    const handleAction = async (appId: number, action: 'VERIFIED' | 'REJECTED') => {
        setActionLoading(appId);
        try {
            const res = await fetch(`/api/noc/applications/${appId}/verify`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    officerId: Number(officerId),
                    action,
                    remarks,
                    ...(officer?.role === 'ASSISTANT_REGISTRAR' && action === 'VERIFIED' ? { signatureData } : {}),
                }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error);
            }
            setRemarks('');
            setSelectedApp(null);
            fetchData();
        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) return <div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading pending applications...</div>;
    if (error) return (
        <div className="text-center mt-20">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"><svg className="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Error</h3>
            <p className="text-slate-500">{error}</p>
        </div>
    );

    const officer = data?.officer;
    const applications = data?.applications || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Pending Applications</h1>
                <p className="text-slate-500 mt-2 font-medium">
                    Welcome, <strong className="text-slate-700">{officer?.name}</strong> — {ROLE_LABELS[officer?.role]}
                    {officer?.course && <span className="text-slate-400"> · {officer.course}</span>}
                </p>
            </div>

            {/* Count Card */}
            <Card hoverEffect={false} className={`p-5 ${applications.length > 0 ? 'bg-amber-50/50 border-amber-100/50' : 'bg-emerald-50/50 border-emerald-100/50'}`}>
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${applications.length > 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        <span className="text-xl font-extrabold">{applications.length}</span>
                    </div>
                    <div>
                        <p className="font-bold text-slate-800">{applications.length > 0 ? 'Applications awaiting your review' : 'All caught up!'}</p>
                        <p className="text-sm text-slate-500">{applications.length > 0 ? 'Click on an application to review and take action.' : 'No pending applications for your review.'}</p>
                    </div>
                </div>
            </Card>

            {/* Applications List */}
            {applications.length > 0 && (
                <div className="space-y-4">
                    {applications.map((app: any) => (
                        <Card key={app.id} className={`p-0 overflow-hidden border transition-all ${selectedApp?.id === app.id ? 'border-emerald-300 shadow-lg shadow-emerald-100/50' : 'border-slate-200/60 shadow-sm'}`}>
                            {/* Application Header - clickable */}
                            <button
                                onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}
                                className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-600">
                                        #{app.id}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">{app.student?.name} <span className="font-normal text-slate-500">({app.student?.rollNo})</span></p>
                                        <p className="text-sm text-slate-500">{TYPE_LABELS[app.certificateType]} · {app.student?.department} · Batch {app.student?.batch}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-400 font-medium">{new Date(app.applicationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                                    <svg className={`w-5 h-5 text-slate-400 transition-transform ${selectedApp?.id === app.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </button>

                            {/* Expanded Detail */}
                            {selectedApp?.id === app.id && (
                                <div className="border-t border-slate-100 p-5 bg-slate-50/30 animate-in fade-in slide-in-from-top-2 duration-200">
                                    {/* Student Details Grid */}
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Student Details</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                                        {[
                                            { l: 'Name', v: app.student?.name },
                                            { l: 'Entry No.', v: app.student?.rollNo },
                                            { l: "Father's Name", v: app.student?.fatherName },
                                            { l: 'Gender', v: app.student?.gender },
                                            { l: 'Department', v: app.student?.department },
                                            { l: 'Course', v: app.student?.course },
                                            { l: 'Hostel / Room', v: `${app.student?.hostel || '—'} / ${app.student?.roomNo || '—'}` },
                                            { l: 'Fees Paid', v: app.student?.feesPaid ? 'Yes' : 'No' },
                                        ].map(({ l, v }) => (
                                            <div key={l}>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{l}</p>
                                                <p className="text-sm font-semibold text-slate-800">{v || 'N/A'}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mb-5 p-3 bg-white rounded-xl border border-slate-200/60">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Purpose</p>
                                        <p className="text-sm font-medium text-slate-700">{app.purpose}</p>
                                    </div>

                                    {/* Previous actions */}
                                    {app.actions?.length > 0 && (
                                        <div className="mb-5">
                                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Previous Actions</h4>
                                            <div className="space-y-2">
                                                {app.actions.map((act: any, i: number) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm">
                                                        <span className={`w-2 h-2 rounded-full ${act.action === 'VERIFIED' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                                        <span className="font-medium text-slate-700">{act.officer?.name}</span>
                                                        <span className="text-slate-400">—</span>
                                                        <span className={`font-bold ${act.action === 'VERIFIED' ? 'text-emerald-600' : 'text-rose-600'}`}>{act.action}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Signature pad for AR */}
                                    {officer?.role === 'ASSISTANT_REGISTRAR' && (
                                        <div className="mb-5">
                                            <SignaturePad
                                                value={signatureData}
                                                onChange={setSignatureData}
                                                label="Your Signature (required for approval)"
                                            />
                                        </div>
                                    )}

                                    {/* Remarks + Actions */}
                                    <div className="space-y-3">
                                        <textarea
                                            value={remarks}
                                            onChange={(e) => setRemarks(e.target.value)}
                                            rows={2}
                                            className="w-full bg-white border border-slate-200/60 px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-400 resize-none text-sm"
                                            placeholder="Add remarks (optional)..."
                                        />
                                        <div className="flex gap-3 justify-end">
                                            <button
                                                onClick={() => handleAction(app.id, 'REJECTED')}
                                                disabled={actionLoading === app.id}
                                                className="inline-flex items-center gap-2 bg-white border-2 border-rose-200 text-rose-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-all disabled:opacity-50 text-sm"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                Reject
                                            </button>
                                            <button
                                                onClick={() => handleAction(app.id, 'VERIFIED')}
                                                disabled={actionLoading === app.id}
                                                className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200 disabled:opacity-50 text-sm"
                                            >
                                                {actionLoading === app.id ? (
                                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                                                ) : (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                )}
                                                Verify & Forward
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function OfficerDashboard() {
    return (
        <Suspense fallback={<div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
