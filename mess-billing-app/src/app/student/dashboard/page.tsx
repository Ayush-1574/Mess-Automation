'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { Card } from '../../../components/ui/Card';

function DashboardContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    if (loading) return <div className="text-center mt-10">Loading profile...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    if (!student) return <div className="text-center mt-10">No student data found</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Dashboard</h1>
                <p className="text-slate-500 mt-2 font-medium">Here is your billing and rebate overview.</p>
            </div>

            {/* Bill History Card */}
            <Card className="p-0 overflow-hidden">
                <div className="p-6 border-b border-slate-100/50 flex items-center justify-between bg-slate-50/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shadow-inner">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Bill History</h2>
                    </div>
                </div>

                <div className="p-0 overflow-x-auto">
                    {student.bills && student.bills.length > 0 ? (
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50/20 border-b border-slate-100/50">
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Month/Year</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Billable Days</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rate/Day</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rebate Amount</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Final Bill</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {student.bills.map((bill: any) => {
                                    const daysInMonth = new Date(bill.year,
                                        ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].indexOf(bill.month) + 1,
                                        0).getDate();
                                    const rebateDays = daysInMonth - bill.totalDays;
                                    const rebateAmount = rebateDays * bill.ratePerDay;

                                    return (
                                        <tr key={bill.id} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="p-4 font-medium text-slate-800">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                                                    {bill.month} {bill.year}
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-600">{bill.totalDays} Days</td>
                                            <td className="p-4 text-slate-600">₹{bill.ratePerDay}</td>
                                            <td className="p-4 text-emerald-600 font-semibold">
                                                ₹{rebateAmount > 0 ? rebateAmount : 0}
                                            </td>
                                            <td className="p-4 font-bold text-slate-900 text-lg">₹{bill.totalAmount}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                            </div>
                            <p className="text-slate-500 font-medium text-lg">No bill history available yet.</p>
                            <p className="text-slate-400 mt-1">Your bills will appear here once generated.</p>
                        </div>
                    )}
                </div>
            </Card>

            {/* Rebate History Card */}
            <Card className="p-0 overflow-hidden">
                <div className="p-6 border-b border-slate-100/50 flex items-center justify-between bg-slate-50/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shadow-inner">
                            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Rebate History</h2>
                    </div>
                </div>

                <div className="p-0 overflow-x-auto">
                    {student.rebates && student.rebates.length > 0 ? (
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50/20 border-b border-slate-100/50">
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Start Date</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">End Date</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reason</th>
                                    <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {student.rebates.map((rebate: any) => (
                                    <tr key={rebate.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="p-4 text-slate-700 font-medium">
                                            {new Date(rebate.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="p-4 text-slate-700 font-medium">
                                            {new Date(rebate.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="p-4 text-slate-600 max-w-xs truncate">{rebate.reason}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${rebate.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                                                rebate.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' :
                                                    'bg-amber-100 text-amber-700'
                                                }`}>
                                                {rebate.status || 'PENDING'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            </div>
                            <p className="text-slate-500 font-medium text-lg">No rebates found.</p>
                            <p className="text-slate-400 mt-1">You haven't requested any rebates yet.</p>
                        </div>
                    )}
                </div>
            </Card>
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
