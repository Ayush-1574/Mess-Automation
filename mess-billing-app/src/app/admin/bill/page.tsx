'use client';
import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';

export default function BillGenerationPage() {
    const [formData, setFormData] = useState({
        month: 'January',
        year: new Date().getFullYear(),
        totalDays: 31,
        ratePerDay: 150,
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Update totalDays when month/year changes
    React.useEffect(() => {
        const monthIndex = months.indexOf(formData.month);
        const daysInMonth = new Date(formData.year, monthIndex + 1, 0).getDate();
        setFormData(prev => ({ ...prev, totalDays: daysInMonth }));
    }, [formData.month, formData.year]);

    const handleGenerate = async () => {
        // Validate days
        const monthIndex = months.indexOf(formData.month);
        const maxDays = new Date(formData.year, monthIndex + 1, 0).getDate();
        if (formData.totalDays > maxDays) {
            setMessage(`Invalid days. ${formData.month} ${formData.year} has max ${maxDays} days.`);
            return;
        }

        setLoading(true);
        setMessage('');
        try {
            const res = await fetch('/api/bill/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.error || 'Failed to generate bills');
            }
        } catch (error) {
            setMessage('Error generating bills');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Generate Monthly Bills</h1>
                <p className="text-slate-500 mt-2 font-medium">Issue comprehensive mess bills for all students taking rebates into account.</p>
            </div>

            <Card className="p-8 pb-4 z-20">
                <div className="flex items-center gap-3 mb-8 relative z-10 border-b border-slate-50/20 pb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M13 14v5m0 0l-3-3m3 3l3-3"></path></svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Billing Parameters</h2>
                    </div>
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Select
                            label="Billing Month"
                            value={formData.month}
                            onChange={(val) => setFormData({ ...formData, month: val as string })}
                            options={months.map(m => ({ label: m, value: m }))}
                        />
                        <Input
                            label="Billing Year"
                            type="number"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input
                            label="Total Days in Month"
                            type="number"
                            value={formData.totalDays}
                            onChange={(e) => setFormData({ ...formData, totalDays: Number(e.target.value) })}
                        />
                        <Input
                            label="Rate Per Day (₹)"
                            type="number"
                            icon={<span className="font-bold">₹</span>}
                            value={formData.ratePerDay}
                            onChange={(e) => setFormData({ ...formData, ratePerDay: Number(e.target.value) })}
                        />
                    </div>

                    <div className="pt-4">
                        <Button
                            onClick={handleGenerate}
                            disabled={loading}
                            isLoading={loading}
                            size="lg"
                            className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 shadow-lg shadow-emerald-200/50 flex items-center justify-center gap-2"
                        >
                            {!loading && (
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
                            )}
                            {loading ? 'Processing Billing System...' : 'Generate Student Bills'}
                        </Button>
                    </div>
                </div>

                {message && (
                    <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${message.toLowerCase().includes('success') ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-rose-50 text-rose-800 border border-rose-100'}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.toLowerCase().includes('success') ? 'bg-emerald-200 text-emerald-700' : 'bg-rose-200 text-rose-700'}`}>
                            {message.toLowerCase().includes('success')
                                ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            }
                        </span>
                    </div>
                )}
            </Card>
        </div>
    );
}
