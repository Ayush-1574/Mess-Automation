'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../../components/ui/Card';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function StudentDetailPage() {
    const params = useParams();
    const id = params.id;

    const [student, setStudent] = useState<any>(null);
    const [sessions, setSessions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [leftForm, setLeftForm] = useState({ sessionId: '', leaveDate: new Date().toISOString().split('T')[0] });
    const [savingLeft, setSavingLeft] = useState(false);

    useEffect(() => {
        fetch('/api/sessions').then(r => r.json()).then(d => setSessions(Array.isArray(d) ? d : []));
    }, []);

    useEffect(() => {
        if (id) {
            fetch(`/api/student/${id}`)
                .then(res => res.json())
                .then(data => setStudent(data))
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="p-8 flex items-center gap-3 text-slate-500"><div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>Loading student details…</div>;
    if (!student || student.error) return <div className="p-8 text-rose-600 font-bold">Student not found.</div>;

    const totalFees = student.feesDeposited?.reduce((s: number, f: any) => s + f.amount, 0) || 0;
    const totalRebateDays = student.monthlyRebates?.reduce((s: number, r: any) => s + r.rebateDays, 0) || 0;

    const refreshStudent = () => {
        if (id) {
            fetch(`/api/student/${id}`).then(res => res.json()).then(data => setStudent(data)).catch(console.error);
        }
    };

    const handleSaveLeftRecord = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingLeft(true);
        try {
            const res = await fetch('/api/student-left', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId: student.id, sessionId: leftForm.sessionId, leaveDate: leftForm.leaveDate })
            });
            if (res.ok) {
                setLeftForm({ sessionId: '', leaveDate: new Date().toISOString().split('T')[0] });
                refreshStudent();
            } else {
                alert('Failed to save leave record');
            }
        } finally {
            setSavingLeft(false);
        }
    };

    const handleDeleteLeftRecord = async (recordId: number) => {
        if (!confirm('Remove this leave record?')) return;
        await fetch('/api/student-left', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: recordId })
        });
        refreshStudent();
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <a href="/admin/permissions"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm group">
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to List
                    </a>
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Details</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-slate-500 font-medium">{student.name}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-indigo-600 font-bold">{student?.entryNo || 'N/A'}</span>
                        {student?.course && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">{student.course?.name || 'Unknown Course'}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-5 bg-teal-50/50 border-teal-100/50">
                    <p className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-1">Total Fees Deposited</p>
                    <h3 className="text-3xl font-extrabold text-teal-900">₹{totalFees.toLocaleString(undefined, { minimumFractionDigits: 0 })}</h3>
                </Card>
                <Card className="p-5 bg-orange-50/50 border-orange-100/50">
                    <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Total Rebate Days</p>
                    <h3 className="text-3xl font-extrabold text-orange-900">{totalRebateDays}<span className="text-lg font-bold text-orange-400 ml-1">days</span></h3>
                </Card>
                <Card className="p-5 bg-slate-50/50 border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Mess Security</p>
                    <h3 className="text-3xl font-extrabold text-slate-900">₹{(student.messSecurity || 0).toLocaleString()}</h3>
                </Card>
            </div>

            {/* Basic Information */}
            <Card className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-12">
                    {[
                        { label: 'Batch', value: student.batch },
                        { label: 'Course', value: student.course?.name },
                        { label: 'Hostel', value: student.hostel },
                        { label: 'Email', value: student.email },
                        { label: 'Mobile No', value: student.mobileNo },
                        { label: 'Parent Mobile', value: student.parentMobileNo },
                        { label: 'Address', value: student.address },
                        { label: 'Gender', value: student.gender },
                        { label: 'Department', value: student.department },
                        { label: 'JoSAA Roll No', value: student.josaaRollNo },
                        { label: 'Date of Joining', value: student.dateOfJoining ? new Date(student.dateOfJoining).toLocaleDateString('en-GB') : null },
                        { label: 'Date of Leaving', value: student.dateOfLeaving ? new Date(student.dateOfLeaving).toLocaleDateString('en-GB') : null },
                        { label: 'Bank Editing', value: student.isBankEditable ? 'Allowed' : 'Frozen', badge: true, color: student.isBankEditable ? 'emerald' : 'rose' },
                    ].map(({ label, value, badge, color }) => (
                        <div key={label} className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-sm text-slate-500 font-medium">{label}</span>
                            {badge ? (
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${color === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                    {value}
                                </span>
                            ) : (
                                <span className="text-sm font-bold text-slate-800">{value || '-'}</span>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Bank Details */}
            <Card className="p-6 bg-slate-50/50 border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <span className="w-2 h-6 bg-slate-400 rounded-full"></span>Bank Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Name in Bank', value: student.nameInBank },
                        { label: 'Account Number', value: student.bankAccountNo },
                        { label: 'Bank Name', value: student.bankName },
                        { label: 'IFSC Code', value: student.ifsc },
                    ].map(({ label, value }) => (
                        <div key={label}>
                            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">{label}</label>
                            <div className="bg-white px-3 py-2 rounded-xl border border-slate-100 font-mono text-sm text-slate-700 shadow-sm">{value || 'Not Provided'}</div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Leave Records */}
            <Card className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <span className="w-2 h-6 bg-rose-500 rounded-full"></span>Session Leave Records
                </h2>
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <form onSubmit={handleSaveLeftRecord} className="flex-1 flex gap-3 items-end">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Session</label>
                            <select value={leftForm.sessionId} onChange={e => setLeftForm(p => ({ ...p, sessionId: e.target.value }))} required
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/50">
                                <option value="">Select session</option>
                                {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Leave Date</label>
                            <input type="date" value={leftForm.leaveDate} onChange={e => setLeftForm(p => ({ ...p, leaveDate: e.target.value }))} required
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/50" />
                        </div>
                        <button type="submit" disabled={savingLeft || !leftForm.sessionId}
                            className="bg-rose-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-rose-700 transition-colors disabled:opacity-50">
                            {savingLeft ? 'Saving...' : 'Mark as Left'}
                        </button>
                    </form>
                </div>
                {student.leftRecords?.length > 0 ? (
                    <div className="border border-slate-100 rounded-xl overflow-hidden">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    <th className="p-3 text-left">Session</th>
                                    <th className="p-3 text-left">Leave Date</th>
                                    <th className="p-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {student.leftRecords.map((lr: any) => (
                                    <tr key={lr.id} className="hover:bg-slate-50">
                                        <td className="p-3 font-bold">{lr.session?.name || '-'}</td>
                                        <td className="p-3">{new Date(lr.leaveDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                        <td className="p-3 text-right">
                                            <button onClick={() => handleDeleteLeftRecord(lr.id)} className="text-rose-600 hover:text-rose-800 font-bold text-xs bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-sm text-slate-500 font-medium bg-slate-50 p-4 rounded-xl text-center border border-slate-100">No leave records registered for this student.</div>
                )}
            </Card>

            {/* Mess Assignments */}
            <Card className="p-0 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>Mess Assignments
                    </h2>
                </div>
                {student.messAssignments?.length > 0 ? (
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="p-4 text-left">Session</th>
                                <th className="p-4 text-left">Mess</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {student.messAssignments.map((a: any) => (
                                <tr key={a.id} className="hover:bg-slate-50/50">
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-100 text-xs font-bold">{a.session?.name || '-'}</span>
                                    </td>
                                    <td className="p-4 font-bold text-slate-800">{a.mess?.name || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-slate-400 font-medium">No mess assignments yet.</div>
                )}
            </Card>

            {/* Monthly Rebates */}
            <Card className="p-0 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-6 bg-orange-500 rounded-full"></span>Monthly Rebates
                    </h2>
                </div>
                {student.monthlyRebates?.length > 0 ? (
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="p-4 text-left">Session</th>
                                <th className="p-4 text-center">Month</th>
                                <th className="p-4 text-center">Year</th>
                                <th className="p-4 text-center">Rebate Days</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {student.monthlyRebates.map((r: any) => (
                                <tr key={r.id} className="hover:bg-slate-50/50">
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-violet-50 text-violet-700 border border-violet-100">{r.session?.name || '-'}</span>
                                    </td>
                                    <td className="p-4 text-center text-slate-700 font-medium">{r.month ? MONTH_NAMES[r.month - 1] : '-'}</td>
                                    <td className="p-4 text-center text-slate-600">{r.year || '-'}</td>
                                    <td className="p-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 border border-orange-100 font-bold text-xs">{r.rebateDays}d</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-slate-400 font-medium">No rebates recorded.</div>
                )}
            </Card>

            {/* Fees Deposited */}
            <Card className="p-0 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-6 bg-teal-500 rounded-full"></span>Fees Deposited
                    </h2>
                </div>
                {student.feesDeposited?.length > 0 ? (
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="p-4 text-left">Session</th>
                                <th className="p-4 text-right">Amount</th>
                                <th className="p-4 text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {student.feesDeposited.map((f: any) => (
                                <tr key={f.id} className="hover:bg-slate-50/50">
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-violet-50 text-violet-700 border border-violet-100">{f.session?.name || '-'}</span>
                                    </td>
                                    <td className="p-4 text-right font-bold text-teal-700">₹{(f.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    <td className="p-4 text-center text-slate-600">{f.paymentDate ? new Date(f.paymentDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-slate-400 font-medium">No fees recorded.</div>
                )}
            </Card>
        </div>
    );
}
