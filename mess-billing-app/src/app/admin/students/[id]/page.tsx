'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Select } from '../../../../components/ui/Select';

export default function StudentDetailPage() {
    const params = useParams();
    const id = params.id;

    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [rebateFilterMonth, setRebateFilterMonth] = useState('All');

    useEffect(() => {
        if (id) {
            fetch(`/api/student/${id}`)
                .then(res => res.json())
                .then(data => setStudent(data))
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="p-8">Loading student details...</div>;
    if (!student || student.error) return <div className="p-8 text-red-600">Student not found</div>;

    const filteredRebates = rebateFilterMonth === 'All'
        ? student.rebates
        : student.rebates.filter((r: any) => {
            const m = new Date(r.startDate).toLocaleString('default', { month: 'long' });
            return m === rebateFilterMonth;
        });

    // Calculate Totals
    let totalRebateDays = 0;
    filteredRebates?.forEach((r: any) => {
        const start = new Date(r.startDate);
        const end = new Date(r.endDate);
        const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        totalRebateDays += diffDays;
    });

    // Determine Rate: Try to find bill for the specific month/year, else use base rate.
    // For 'All', it's hard to pick one rate. We'll sum amounts individually if possible.
    let totalRebateAmount = 0;

    // Better Approach: Calculate amount per rebate based on its specific period's bill rate or base rate.
    if (student.rebates) {
        totalRebateAmount = (filteredRebates || []).reduce((acc: number, r: any) => {
            const start = new Date(r.startDate);
            const end = new Date(r.endDate);
            const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

            const rMonth = start.toLocaleString('default', { month: 'long' });
            const rYear = start.getFullYear();

            // Find bill for this rebate's month
            const bill = student.bills.find((b: any) => b.month === rMonth && b.year === rYear);
            const rate = bill ? bill.ratePerDay : (student.messBaseRate || 0); // Fallback to base rate

            return acc + (diffDays * rate);
        }, 0);
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
            {/* Header & Back Button */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <a
                        href="/admin/permissions"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm group"
                    >
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
                        <span className="text-indigo-600 font-bold">{student.rollNo}</span>
                    </div>
                </div>
            </div>

            {/* 1. Summary Cards (Top) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-indigo-50/50 border-indigo-100/50 relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-10 transition-transform group-hover:scale-110">
                        <svg className="w-24 h-24 text-indigo-900" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" /></svg>
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Total Rebate Days</p>
                        <h3 className="text-4xl font-extrabold text-indigo-900">{totalRebateDays}</h3>
                        <p className="text-[10px] text-indigo-400 font-medium mt-2">Days deducted for {rebateFilterMonth === 'All' ? 'all time' : rebateFilterMonth}</p>
                    </div>
                </Card>
                <Card className="p-6 bg-emerald-50/50 border-emerald-100/50 relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-10 transition-transform group-hover:scale-110">
                        <svg className="w-24 h-24 text-emerald-900" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" /></svg>
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Total Rebate Amount</p>
                        <h3 className="text-4xl font-extrabold text-emerald-900">₹{totalRebateAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                        <p className="text-[10px] text-emerald-400 font-medium mt-2">Applied to current billing cycle</p>
                    </div>
                </Card>
            </div>

            {/* 2. Basic Information */}
            <Card className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
                    Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-sm text-slate-500 font-medium">Batch</span>
                        <span className="text-sm font-bold text-slate-800">{student.batch}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-sm text-slate-500 font-medium">Mess</span>
                        <span className="text-sm font-bold text-slate-800">{student.mess || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-sm text-slate-500 font-medium">Hostel</span>
                        <span className="text-sm font-bold text-slate-800">{student.hostel || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-sm text-slate-500 font-medium">Email</span>
                        <span className="text-sm font-medium text-slate-600 truncate">{student.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-sm text-slate-500 font-medium">Base Rate</span>
                        <span className="text-sm font-bold text-slate-800">₹{student.messBaseRate || '0'}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-slate-500 font-medium">Bank Editing</span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${student.isBankEditable ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${student.isBankEditable ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                            {student.isBankEditable ? 'Allowed' : 'Frozen'}
                        </span>
                    </div>
                </div>
            </Card>

            {/* 3. Bank Details (Read Only) */}
            <Card className="p-6 bg-slate-50/50 border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 bg-slate-400 rounded-full"></span>
                    Bank Details (Read Only)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">Account Number</label>
                        <div className="bg-white px-3 py-2 rounded-xl border border-slate-100 font-mono text-sm text-slate-700 shadow-sm">
                            {student.bankAccountNo || 'Not Provided'}
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">Bank Name</label>
                        <span className="text-sm font-bold text-slate-800 bg-white px-3 py-2 rounded-xl border border-slate-100 block shadow-sm">{student.bankName || '-'}</span>
                    </div>
                    <div>
                        <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 block">IFSC Code</label>
                        <div className="bg-white px-3 py-2 rounded-xl border border-slate-100 font-mono text-sm text-slate-700 shadow-sm">
                            {student.ifsc || '-'}
                        </div>
                    </div>
                </div>
            </Card>

            {/* 4. Rebate History (Bottom) */}
            <Card className="p-0 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-6 bg-amber-500 rounded-full"></span>
                        Rebate History
                    </h2>
                    <div className="relative w-full sm:w-48">
                        <Select
                            value={rebateFilterMonth}
                            onChange={(val) => setRebateFilterMonth(val.toString())}
                            options={[
                                { label: 'All Months', value: 'All' },
                                ...['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => ({ label: m, value: m }))
                            ]}
                            className="!py-2 !px-3 font-bold"
                        />
                    </div>
                </div>

                {filteredRebates && filteredRebates.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                                    <th className="p-4 indent-4">Period</th>
                                    <th className="p-4">Days</th>
                                    <th className="p-4">Rate</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredRebates.map((rebate: any) => {
                                    const start = new Date(rebate.startDate);
                                    const end = new Date(rebate.endDate);
                                    const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

                                    const rMonth = start.toLocaleString('default', { month: 'long' });
                                    const rYear = start.getFullYear();
                                    const bill = student.bills.find((b: any) => b.month === rMonth && b.year === rYear);
                                    const rate = bill ? bill.ratePerDay : (student.messBaseRate || 0);

                                    return (
                                        <tr key={rebate.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="p-4 indent-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-800">{start.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium">to {end.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-extrabold text-xs">
                                                    {diffDays}d
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-600 font-medium text-xs">₹{rate}</td>
                                            <td className="p-4">
                                                <span className="font-extrabold text-emerald-600">₹{(diffDays * rate).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${rebate.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {rebate.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-16 text-center text-slate-400">
                        <div className="bg-slate-50 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                        <p className="text-lg font-bold text-slate-700">No records found</p>
                        <p className="text-xs text-slate-400 font-medium mt-1">Try selecting a different month or check back later.</p>
                    </div>
                )}
            </Card>        </div>
    );
}
