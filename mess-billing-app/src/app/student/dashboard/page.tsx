'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { Card } from '../../../components/ui/Card';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function DashboardContent() {
    const searchParams = useSearchParams();
    const paramId = searchParams.get('id');
    const { data: session, status } = useSession();
    const sessionId = (session?.user as any)?.id;
    const id = paramId || sessionId;

    const [student, setStudent] = useState<any>(null);
    const [sessions, setSessions] = useState<any[]>([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [billing, setBilling] = useState<any>(null);
    const [billingLoading, setBillingLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/sessions').then(r => r.json()).then(d => setSessions(Array.isArray(d) ? d : []));
    }, []);

    useEffect(() => {
        if (id) {
            fetch(`/api/student/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Student not found');
                    return res.json();
                })
                .then(data => setStudent(data))
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [id]);

    useEffect(() => {
        if (id && selectedSession) {
            setBillingLoading(true);
            fetch(`/api/student/billing?studentId=${id}&sessionId=${selectedSession}`)
                .then(r => r.json())
                .then(data => setBilling(data))
                .catch(() => setBilling(null))
                .finally(() => setBillingLoading(false));
        } else {
            setBilling(null);
        }
    }, [id, selectedSession]);

    if (loading || (status === 'loading' && !id)) return <div className="text-center mt-10">Loading profile...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    if (!student) return <div className="text-center mt-10">No student data found</div>;

    const totalFees = student.feesDeposited?.reduce((s: number, f: any) => s + f.amount, 0) || 0;
    const totalRefunds = student.refunds?.reduce((s: number, r: any) => s + r.amount, 0) || 0;
    const totalRebateDays = student.monthlyRebates?.reduce((s: number, r: any) => s + r.rebateDays, 0) || 0;

    // Filter data by selected session
    const sessionRebates = selectedSession
        ? (student.monthlyRebates || []).filter((r: any) => String(r.sessionId) === selectedSession)
        : (student.monthlyRebates || []);
    const sessionRefunds = selectedSession
        ? (student.refunds || []).filter((r: any) => String(r.sessionId) === selectedSession)
        : (student.refunds || []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Dashboard</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-slate-500 font-medium">{student.name}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-indigo-600 font-bold">{student.entryNo}</span>
                    </div>
                </div>
                <select value={selectedSession} onChange={e => setSelectedSession(e.target.value)}
                    className="border border-slate-200 bg-white px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm min-w-[200px]">
                    <option value="">— Select Session —</option>
                    {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-5 bg-teal-50/50 border-teal-100/50">
                    <p className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-1">Total Fees Deposited</p>
                    <h3 className="text-2xl font-extrabold text-teal-900">₹{totalFees.toLocaleString(undefined, { minimumFractionDigits: 0 })}</h3>
                </Card>
                <Card className="p-5 bg-blue-50/50 border-blue-100/50">
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Mess Bill {selectedSession ? `(Session)` : '(All)'}</p>
                    <h3 className="text-2xl font-extrabold text-blue-900">₹{(billing?.totalAmount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 0 })}</h3>
                </Card>
                <Card className="p-5 bg-orange-50/50 border-orange-100/50">
                    <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Total Rebate Days</p>
                    <h3 className="text-2xl font-extrabold text-orange-900">{totalRebateDays}<span className="text-lg font-bold text-orange-400 ml-1">days</span></h3>
                </Card>
                <Card className="p-5 bg-rose-50/50 border-rose-100/50">
                    <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">Total Refunds</p>
                    <h3 className="text-2xl font-extrabold text-rose-900">₹{totalRefunds.toLocaleString(undefined, { minimumFractionDigits: 0 })}</h3>
                </Card>
            </div>

            {!selectedSession && (
                <Card className="p-8 text-center">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <p className="text-slate-600 font-semibold text-lg">Select a session above to view your monthly mess bill</p>
                    <p className="text-slate-400 mt-1">Rebate and refund details for the session will also be shown.</p>
                </Card>
            )}

            {/* Mess Bill Table */}
            {selectedSession && (
                <Card className="p-0 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shadow-inner">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Mess Bill</h2>
                                <p className="text-xs text-slate-400 font-medium">{billing?.messName ?? '-'} • {billing?.sessionName ?? '-'}</p>
                            </div>
                        </div>
                    </div>
                    {billingLoading ? (
                        <div className="p-12 text-center text-slate-400">
                            <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="font-medium">Computing bill…</p>
                        </div>
                    ) : billing?.bills?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                        <th className="p-4 text-left">Month</th>
                                        <th className="p-4 text-center">Days</th>
                                        <th className="p-4 text-center">Rebate Days</th>
                                        <th className="p-4 text-center">Chargeable Days</th>
                                        <th className="p-4 text-right">Rate/Day (₹)</th>
                                        <th className="p-4 text-right">GST (%)</th>
                                        <th className="p-4 text-right">Amount (₹)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {billing.bills.map((b: any, i: number) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4 font-medium text-slate-800">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                                    {b.month} {b.year}
                                                </div>
                                            </td>
                                            <td className="p-4 text-center text-slate-600">{b.daysInMonth}</td>
                                            <td className="p-4 text-center">
                                                {b.rebateDays > 0 ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-orange-50 text-orange-700 border border-orange-100">{b.rebateDays}d</span>
                                                ) : <span className="text-slate-400">-</span>}
                                            </td>
                                            <td className="p-4 text-center font-semibold text-slate-700">{b.chargeableDays}</td>
                                            <td className="p-4 text-right text-slate-600">₹{b.dailyRate}</td>
                                            <td className="p-4 text-right text-slate-600">{b.gst}%</td>
                                            <td className="p-4 text-right font-bold text-slate-900">₹{b.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-blue-50/50 border-t-2 border-blue-100">
                                        <td colSpan={6} className="p-4 text-right font-bold text-slate-700 uppercase text-xs tracking-wider">Total Mess Bill</td>
                                        <td className="p-4 text-right font-extrabold text-blue-800 text-lg">₹{billing.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-10 text-center text-slate-400 font-medium">No billing data for this session.</div>
                    )}
                </Card>
            )}

            {/* Monthly Rebates */}
            {selectedSession && (
                <Card className="p-0 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shadow-inner">
                            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Monthly Rebates</h2>
                    </div>
                    {sessionRebates.length > 0 ? (
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
                                {sessionRebates.map((r: any) => (
                                    <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
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
                        <div className="p-10 text-center text-slate-400 font-medium">No rebates for this session.</div>
                    )}
                </Card>
            )}

            {/* Refunds */}
            {selectedSession && (
                <Card className="p-0 overflow-hidden">
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shadow-inner">
                            <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Refunds</h2>
                    </div>
                    {sessionRefunds.length > 0 ? (
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    <th className="p-4 text-left">Session</th>
                                    <th className="p-4 text-right">Amount</th>
                                    <th className="p-4 text-center">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {sessionRefunds.map((r: any) => (
                                    <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-violet-50 text-violet-700 border border-violet-100">{r.session?.name || '-'}</span>
                                        </td>
                                        <td className="p-4 text-right font-bold text-rose-700">₹{(r.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                        <td className="p-4 text-center text-slate-600">{r.paymentDate ? new Date(r.paymentDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-10 text-center text-slate-400 font-medium">No refunds for this session.</div>
                    )}
                </Card>
            )}
        </div>
    );
}

export default function StudentDashboard() {
    return (
        <Suspense fallback={<div className="text-center mt-10">Loading dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
