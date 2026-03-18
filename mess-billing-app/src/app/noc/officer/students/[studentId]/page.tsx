'use client';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { Card } from '../../../../../components/ui/Card';
import Link from 'next/link';

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
    PENDING_ADMIN: { label: 'Pending Admin', bg: 'bg-amber-100', text: 'text-amber-700' },
    PENDING_JOINT_SUPT: { label: 'Pending JS', bg: 'bg-blue-100', text: 'text-blue-700' },
    PENDING_ASST_REGISTRAR: { label: 'Pending AR', bg: 'bg-purple-100', text: 'text-purple-700' },
    APPROVED: { label: 'Approved', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    REJECTED: { label: 'Rejected', bg: 'bg-rose-100', text: 'text-rose-700' },
};

function StudentDetailContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const studentId = params.studentId as string;
    const officerId = searchParams.get('id');

    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        fetch(`/api/noc/student-detail/${studentId}`)
            .then(r => r.json())
            .then(d => { setStudent(d); setFormData(d); })
            .catch(() => setMessage({ type: 'error', text: 'Failed to load student' }))
            .finally(() => setLoading(false));
    }, [studentId]);

    const handleSave = async () => {
        setSaving(true); setMessage(null);
        try {
            const res = await fetch(`/api/noc/officer/${officerId}/managed-data`, {
                method: 'PATCH', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'student', targetId: student.id, data: formData }),
            });
            if (!res.ok) { const e = await res.json(); throw new Error(e.error); }
            const updated = await res.json();
            setStudent({ ...student, ...updated }); setFormData({ ...formData, ...updated });
            setEditing(false);
            setMessage({ type: 'success', text: 'Student details updated successfully!' });
        } catch (e: any) { setMessage({ type: 'error', text: e.message }); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!confirm(`⚠️ Delete "${student.name}" (${student.rollNo})?\n\nThis action cannot be undone.`)) return;
        try {
            const res = await fetch(`/api/noc/officer/${officerId}/managed-data?type=student&targetId=${student.id}`, { method: 'DELETE' });
            if (!res.ok) { const e = await res.json(); throw new Error(e.error); }
            router.push(`/noc/officer/students?id=${officerId}`);
        } catch (e: any) { setMessage({ type: 'error', text: e.message }); }
    };

    const set = (key: string, val: any) => setFormData({ ...formData, [key]: val });

    if (loading) return <div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading student details...</div>;
    if (!student || student.error) return (
        <div className="text-center mt-20">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div>
            <p className="text-slate-500 font-medium">Student not found</p>
        </div>
    );

    const fields = [
        { key: 'rollNo', label: 'Roll Number', readOnly: true },
        { key: 'name', label: 'Full Name' },
        { key: 'fatherName', label: "Father's Name" },
        { key: 'email', label: 'Email Address' },
        { key: 'phone', label: 'Phone Number' },
        { key: 'department', label: 'Department' },
        { key: 'course', label: 'Course' },
        { key: 'batch', label: 'Batch' },
        { key: 'category', label: 'Category' },
        { key: 'hostel', label: 'Hostel' },
        { key: 'roomNo', label: 'Room No' },
        { key: 'address', label: 'Address' },
        { key: 'joiningYear', label: 'Joining Year' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4 max-w-5xl">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href={`/noc/officer/students?id=${officerId}`} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student Details</h1>
                    <p className="text-slate-500 text-sm font-medium">{student.rollNo} · {student.name}</p>
                </div>
                <div className="flex gap-2">
                    {!editing ? (
                        <>
                            <button onClick={() => setEditing(true)} className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                Edit
                            </button>
                            <button onClick={handleDelete} className="inline-flex items-center gap-2 bg-white border-2 border-rose-200 text-rose-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-rose-50 transition-all text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                Delete
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => { setEditing(false); setFormData(student); }} className="px-5 py-2.5 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
                            <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200 text-sm disabled:opacity-50">
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Messages */}
            {message && (
                <div className={`p-4 rounded-xl border font-medium text-sm ${message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
                    {message.text}
                </div>
            )}

            {/* Details Card */}
            <Card className="p-0 overflow-hidden border border-slate-200/60 shadow-md">
                <div className="p-5 bg-gradient-to-r from-emerald-50/50 to-transparent border-b border-slate-100/50 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                        <span className="text-lg font-extrabold text-emerald-700">{student.name?.charAt(0)}</span>
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800">{student.name}</h2>
                        <div className="flex gap-2 mt-0.5">
                            <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-bold">{student.course}</span>
                            {student.batch && <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold">Batch {student.batch}</span>}
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${student.feesPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>Fees: {student.feesPaid ? 'Paid' : 'Not Paid'}</span>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {fields.map(f => (
                            <div key={f.key}>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{f.label}</label>
                                {editing && !f.readOnly ? (
                                    <input value={formData[f.key] || ''} onChange={e => set(f.key, e.target.value)}
                                        className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none focus:border-emerald-300 transition-all bg-white" />
                                ) : (
                                    <p className={`text-sm font-semibold px-3 py-2.5 rounded-xl ${editing ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 text-slate-800'}`}>
                                        {student[f.key] || <span className="text-slate-400 font-normal">—</span>}
                                    </p>
                                )}
                            </div>
                        ))}
                        {/* Gender Dropdown */}
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Gender</label>
                            {editing ? (
                                <select value={formData.gender || ''} onChange={e => set('gender', e.target.value || null)}
                                    className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none bg-white">
                                    <option value="">Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            ) : (
                                <p className="text-sm font-semibold px-3 py-2.5 rounded-xl bg-slate-50 text-slate-800">{student.gender || <span className="text-slate-400 font-normal">—</span>}</p>
                            )}
                        </div>
                        {/* Fees Paid Toggle */}
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Fees Paid</label>
                            {editing ? (
                                <select value={formData.feesPaid ? 'true' : 'false'} onChange={e => set('feesPaid', e.target.value === 'true')}
                                    className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:outline-none bg-white">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            ) : (
                                <p className="text-sm font-semibold px-3 py-2.5 rounded-xl bg-slate-50">
                                    <span className={student.feesPaid ? 'text-emerald-700' : 'text-rose-600'}>{student.feesPaid ? 'Yes' : 'No'}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Applications History */}
            {student.applications?.length > 0 && (
                <Card className="p-0 overflow-hidden border border-slate-200/60 shadow-md">
                    <div className="p-5 border-b border-slate-100/50 flex items-center gap-2">
                        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <h3 className="font-bold text-slate-800">Applications ({student.applications.length})</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    {['#', 'Date', 'Type', 'Purpose', 'Status', 'Steps'].map(h => (
                                        <th key={h} className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {student.applications.map((app: any) => {
                                    const st = STATUS_CONFIG[app.status] || STATUS_CONFIG.PENDING_ADMIN;
                                    return (
                                        <tr key={app.id} className="hover:bg-emerald-50/30 transition-colors">
                                            <td className="p-3 text-sm font-bold text-slate-800">{app.id}</td>
                                            <td className="p-3 text-sm text-slate-600">{new Date(app.applicationDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}</td>
                                            <td className="p-3 text-sm font-medium text-slate-700">{app.certificateType}</td>
                                            <td className="p-3 text-sm text-slate-600 max-w-[250px] truncate">{app.purpose}</td>
                                            <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${st.bg} ${st.text}`}>{st.label}</span></td>
                                            <td className="p-3">
                                                <div className="flex gap-1">
                                                    {app.actions?.map((act: any, i: number) => (
                                                        <div key={i} title={`${act.officer?.name}: ${act.action}${act.remarks ? ` — ${act.remarks}` : ''}`}
                                                            className={`w-5 h-5 rounded-full flex items-center justify-center ${act.action === 'VERIFIED' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
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
                    </div>
                </Card>
            )}
        </div>
    );
}

export default function StudentDetailPage() {
    return (
        <Suspense fallback={<div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading...</div>}>
            <StudentDetailContent />
        </Suspense>
    );
}
