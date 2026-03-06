'use client';
import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';

export default function RebatePage() {
    const [formData, setFormData] = useState({
        studentId: '',
        startDate: '',
        endDate: '',
        reason: '',
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch('/api/rebate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage('Rebate created successfully!');
                setFormData({ studentId: '', startDate: '', endDate: '', reason: '' });
            } else {
                setMessage('Failed to create rebate');
            }
        } catch (error) {
            setMessage('Error submitting rebate');
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Manage Rebates</h1>
                <p className="text-slate-500 mt-2 font-medium">Record and process student mess rebates seamlessly.</p>
            </div>

            <Card className="p-8 pb-4">
                <div className="flex items-center gap-3 mb-8 relative z-10 border-b border-slate-50/20 pb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-sm border border-orange-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zm-7-8V7m0 6v.01"></path></svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">New Rebate Entry</h2>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Roll Number</label>
                        <input
                            type="text"
                            value={formData.studentId}
                            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                            className="w-full border border-slate-200 bg-slate-50/50 px-4 py-3 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder:text-slate-400 font-medium"
                            placeholder="e.g. 2023CSB1008"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Start Date</label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-3 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">End Date</label>
                            <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                className="w-full border border-slate-200 bg-slate-50/50 px-4 py-3 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Reason</label>
                        <input
                            type="text"
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            className="w-full border border-slate-200 bg-slate-50/50 px-4 py-3 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder:text-slate-400 font-medium"
                            placeholder="Brief description for the rebate"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all active:scale-[0.98] shadow-lg shadow-orange-200/50"
                    >
                        Create Rebate Record
                    </button>
                </form>

                {message && (
                    <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${message.toLowerCase().includes('success') ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-rose-50 text-rose-800 border border-rose-100'}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center ${message.toLowerCase().includes('success') ? 'bg-emerald-200 text-emerald-700' : 'bg-rose-200 text-rose-700'}`}>
                            {message.toLowerCase().includes('success')
                                ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            }
                        </span>
                        <p className="font-semibold text-sm">{message}</p>
                    </div>
                )}
            </Card>
        </div >
    );
}
