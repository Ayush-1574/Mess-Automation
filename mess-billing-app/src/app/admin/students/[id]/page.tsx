'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Select } from '../../../../components/ui/Select';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function StudentDetailPage() {
    const params = useParams();
    const id = params.id;

    const [student, setStudent] = useState<any>(null);
    const [sessions, setSessions] = useState<any[]>([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [loading, setLoading] = useState(true);

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

    // Filter all session-scoped data
    const filterBySession = (arr: any[]) =>
        selectedSession
            ? (arr || []).filter(x => String(x.session?.id ?? x.sessionId) === selectedSession)
            : (arr || []);

    const filteredAssignments = filterBySession(student.messAssignments);
    const filteredRebates = filterBySession(student.monthlyRebates);

    const totalFeesDeposited = filteredAssignments.reduce((s: number, a: any) => s + (a.amount ?? 0), 0);
    const totalRebateDays = filteredRebates.reduce((s: number, r: any) => s + r.rebateDays, 0);

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

                    {/* Session Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">Session:</span>
                        <div className="w-44">
                            <Select
                                theme="primary"
                                value={selectedSession}
                                onChange={val => setSelectedSession(String(val))}
                                options={[{ label: 'All Sessions', value: '' }, ...sessions.map(s => ({ label: s.name, value: s.id }))]}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Details</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-slate-500 font-medium">{student.name}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-indigo-600 font-bold">{student.rollNo}</span>
                        {student.course && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">{student.course.name}</span>
                            </>
                        )}
                        {selectedSession && sessions.find(s => String(s.id) === selectedSession) && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100">
                                    {sessions.find(s => String(s.id) === selectedSession)?.name}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-5 bg-teal-50/50 border-teal-100/50">
                    <p className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-1">
                        {selectedSession ? 'Session Fees Deposited' : 'Total Fees Deposited'}
                    </p>
                    <h3 className="text-3xl font-extrabold text-teal-900">₹{totalFeesDeposited.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                </Card>
                <Card className="p-5 bg-orange-50/50 border-orange-100/50">
                    <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">
                        {selectedSession ? 'Session Rebate Days' : 'Total Rebate Days'}
                    </p>
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
                        { label: 'Address', value: student.address },
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
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

            {/* Mess Assignments (with fees) */}
            <Card className="p-0 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>Mess Assignments
                    </h2>
                    <span className="text-xs font-semibold text-slate-400">{filteredAssignments.length} record{filteredAssignments.length !== 1 ? 's' : ''}</span>
                </div>
                {filteredAssignments.length > 0 ? (
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="p-4 text-left">Session</th>
                                <th className="p-4 text-left">Mess</th>
                                <th className="p-4 text-right">Fees Deposited</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredAssignments.map((a: any) => (
                                <tr key={a.id} className="hover:bg-slate-50/50">
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-100 text-xs font-bold">{a.session.name}</span>
                                    </td>
                                    <td className="p-4 font-bold text-slate-800">{a.mess.name}</td>
                                    <td className="p-4 text-right font-bold text-teal-700">₹{(a.amount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-teal-50/50 border-t-2 border-teal-100">
                                <td colSpan={2} className="p-4 font-bold text-slate-700 text-xs uppercase tracking-wide">Total</td>
                                <td className="p-4 text-right font-extrabold text-teal-800 text-base">₹{totalFeesDeposited.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            </tr>
                        </tfoot>
                    </table>
                ) : (
                    <div className="p-8 text-center text-slate-400 font-medium">
                        {selectedSession ? 'No mess assignments for this session.' : 'No mess assignments yet.'}
                    </div>
                )}
            </Card>

            {/* Monthly Rebates */}
            <Card className="p-0 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-6 bg-orange-500 rounded-full"></span>Monthly Rebates
                    </h2>
                    <span className="text-xs font-semibold text-slate-400">{filteredRebates.length} record{filteredRebates.length !== 1 ? 's' : ''}</span>
                </div>
                {filteredRebates.length > 0 ? (
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
                            {filteredRebates.map((r: any) => (
                                <tr key={r.id} className="hover:bg-slate-50/50">
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-violet-50 text-violet-700 border border-violet-100">{r.session.name}</span>
                                    </td>
                                    <td className="p-4 text-center text-slate-700 font-medium">{MONTH_NAMES[r.month - 1]}</td>
                                    <td className="p-4 text-center text-slate-600">{r.year}</td>
                                    <td className="p-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 border border-orange-100 font-bold text-xs">{r.rebateDays}d</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center text-slate-400 font-medium">
                        {selectedSession ? 'No rebates for this session.' : 'No rebates recorded.'}
                    </div>
                )}
            </Card>
        </div>
    );
}
