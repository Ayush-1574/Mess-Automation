'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { Card } from '../../../components/ui/Card';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function RebatesContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [sessionData, setSessionData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`/api/student/${id}/session-details`)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to load session details');
                    return res.json();
                })
                .then(data => {
                    setSessionData(data);
                    if (data.length > 0) {
                        setSelectedSessionId(data[0].session.id);
                    }
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading rebate details...</div>;
    if (error) return <div className="text-center mt-10 text-rose-500 p-4 bg-rose-50 rounded-xl inline-block font-medium">{error}</div>;
    if (!sessionData || sessionData.length === 0) return (
        <div className="text-center mt-20">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-1 ring-slate-100">
                <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Records Found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">No session data or rebates could be found for your account.</p>
        </div>
    );

    const activeSession = sessionData.find(s => s.session.id === selectedSessionId) || sessionData[0];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Rebates & Bills</h1>
                    <p className="text-slate-500 mt-2 font-medium">Session-wise breakdown of your mess bills and rebates.</p>
                </div>
                
                <div className="w-full md:w-64">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Select Session</label>
                    <div className="relative">
                        <select
                            value={selectedSessionId || ''}
                            onChange={(e) => setSelectedSessionId(Number(e.target.value))}
                            className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-3 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium shadow-sm cursor-pointer transition-shadow hover:shadow-md"
                        >
                            {sessionData.map(d => (
                                <option key={d.session.id} value={d.session.id}>
                                    {d.session.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Session Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white border-indigo-100/50 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-24 h-24 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    </div>
                    <p className="text-sm font-bold text-indigo-600/80 uppercase tracking-wider mb-2 relative z-10">Total Deposited</p>
                    <h3 className="text-3xl font-extrabold text-slate-800 relative z-10">₹{activeSession.totalDeposited.toLocaleString()}</h3>
                </Card>
                
                <Card className="p-6 bg-gradient-to-br from-rose-50 to-white border-rose-100/50 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-24 h-24 text-rose-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                    </div>
                    <p className="text-sm font-bold text-rose-600/80 uppercase tracking-wider mb-2 relative z-10">Total Bill</p>
                    <h3 className="text-3xl font-extrabold text-slate-800 relative z-10">₹{activeSession.totalBill.toLocaleString()}</h3>
                </Card>
                
                <Card className={`p-6 bg-gradient-to-br border shadow-sm relative overflow-hidden group ${
                    activeSession.balance >= 0 
                        ? 'from-emerald-50 to-white border-emerald-100/50' 
                        : 'from-amber-50 to-white border-amber-100/50'
                }`}>
                    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500 ${activeSession.balance >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                         <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28A2 2 0 0022 15V9a2 2 0 00-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z"/></svg>
                    </div>
                    <p className={`text-sm font-bold uppercase tracking-wider mb-2 relative z-10 ${
                        activeSession.balance >= 0 ? 'text-emerald-600/80' : 'text-amber-600/80'
                    }`}>Net Balance</p>
                    <h3 className={`text-3xl font-extrabold relative z-10 flex items-center gap-2 ${
                        activeSession.balance >= 0 ? 'text-slate-800' : 'text-amber-700'
                    }`}>
                        {activeSession.balance < 0 ? '-' : ''}₹{Math.abs(activeSession.balance).toLocaleString()}
                        {activeSession.balance < 0 && (
                            <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-800 rounded-lg ml-2 border border-amber-200 shadow-sm align-middle">
                                DUES PENDING
                            </span>
                        )}
                        {activeSession.balance > 0 && (
                            <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded-lg ml-2 border border-emerald-200 shadow-sm align-middle">
                                REFUNDABLE
                            </span>
                        )}
                    </h3>
                </Card>
            </div>

            {/* Month-wise Table Card */}
            <Card className="p-0 overflow-hidden border border-slate-200/60 shadow-md">
                <div className="p-6 border-b border-slate-100/50 flex items-center justify-between bg-slate-50/40 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shadow-inner border border-indigo-100/50">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Month-wise Breakdown</h2>
                    </div>
                </div>

                <div className="p-0 overflow-x-auto">
                    {activeSession.months && activeSession.months.length > 0 ? (
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Month</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Total Days</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Rebate Days</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Billed Days</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Rate/Day</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Final Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {activeSession.months.map((m: any, idx: number) => (
                                    <tr key={`${m.month}-${m.year}`} className="hover:bg-indigo-50/30 transition-colors group">
                                        <td className="p-4 font-bold text-slate-800">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                                    {m.month.toString().padStart(2, '0')}
                                                </div>
                                                {MONTH_NAMES[m.month - 1]} {m.year}
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-500 font-medium text-center">{m.totalDays}</td>
                                        <td className="p-4 text-center">
                                            {m.rebateDays > 0 ? (
                                                <span className="inline-flex items-center justify-center px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold text-sm border border-emerald-100 shadow-sm">
                                                    {m.rebateDays}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 font-medium">-</span>
                                            )}
                                        </td>
                                        <td className="p-4 font-semibold text-slate-700 text-center">{m.chargeableDays}</td>
                                        <td className="p-4 text-slate-500 text-right font-medium">
                                            <div className="flex flex-col items-end">
                                                <span>₹{m.ratePerDay}</span>
                                                {m.gst > 0 && <span className="text-[10px] text-slate-400 font-semibold bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-wider mt-0.5">+{m.gst}% GST</span>}
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-slate-900 text-lg text-right">₹{m.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-50/80 border-t-2 border-slate-200">
                                <tr>
                                    <td colSpan={5} className="p-4 text-right font-bold text-slate-700 uppercase tracking-wider text-sm">Total Session Bill:</td>
                                    <td className="p-4 text-right font-extrabold text-slate-900 text-xl">₹{activeSession.totalBill.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                </tr>
                            </tfoot>
                        </table>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-sm">
                                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                            </div>
                            <p className="text-slate-600 font-bold text-lg">No billing history for this session.</p>
                            <p className="text-slate-500 mt-2 font-medium max-w-sm mx-auto">Your month-wise bills will appear here once generated by the mess administration.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}

export default function StudentRebates() {
    return (
        <Suspense fallback={<div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading rebates page...</div>}>
            <RebatesContent />
        </Suspense>
    );
}
