'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export default function PayMessFeePage() {
    const searchParams = useSearchParams();
    const studentId = searchParams.get('id');

    const [sessions, setSessions] = useState<any[]>([]);
    const [sessionId, setSessionId] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [studentInfo, setStudentInfo] = useState<any>(null);

    useEffect(() => {
        fetch('/api/sessions')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setSessions(data);
                }
            });

        if (studentId) {
             fetch(`/api/student/${studentId}`)
                .then(res => res.json())
                .then(data => {
                     if (!data.error) setStudentInfo(data.student);
                });
        }
    }, [studentId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!sessionId || !amount) {
            setError('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/student/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId,
                    sessionId: parseInt(sessionId),
                    amount: parseFloat(amount),
                    paymentDate,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Payment submission failed');

            setSuccess('Payment confirmed successfully. The admin office will verify and consolidate this transaction into your account.');
            setAmount('');
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Pay Mess Fee</h1>
                <p className="text-slate-500 mt-2 font-medium">Record and confirm your mess fee payments here.</p>
            </div>

            <Card className="p-8 border-l-4 border-l-indigo-500 bg-indigo-50/50">
               <h2 className="text-lg font-bold text-indigo-900 mb-2">Institute Payment Details</h2>
               <p className="text-sm text-indigo-800 mb-4 block">Please transfer your mess fee directly to the institute account below before proceeding to confirm your payment details.</p>
               <div className="grid grid-cols-2 gap-4 text-sm font-medium bg-white p-4 rounded-xl border border-indigo-100 shadow-sm text-slate-800">
                    <div><span className="text-slate-500 block text-xs uppercase tracking-wide">Account Name</span> IIT Ropar Mess Escrow</div>
                    <div><span className="text-slate-500 block text-xs uppercase tracking-wide">Account Number</span> 321XXXXXX108</div>
                    <div><span className="text-slate-500 block text-xs uppercase tracking-wide">IFSC Code</span> SBIN00XXXX</div>
                    <div><span className="text-slate-500 block text-xs uppercase tracking-wide">Bank Name</span> State Bank of India, IIT Branch</div>
               </div>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Submit Payment Confirmation</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <div className="p-4 mb-6 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm font-medium">{error}</div>}
                    {success && <div className="p-4 mb-6 rounded-xl bg-green-50 text-green-700 border border-green-100 text-sm font-medium">{success}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Student Name</label>
                                <input
                                    type="text"
                                    value={studentInfo?.name || 'Loading...'}
                                    disabled
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Roll Number</label>
                                <input
                                    type="text"
                                    value={studentInfo?.rollNo || 'Loading...'}
                                    disabled
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Select Session <span className="text-red-500">*</span></label>
                            <select
                                value={sessionId}
                                onChange={(e) => setSessionId(e.target.value)}
                                required
                                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-medium"
                            >
                                <option value="" disabled>Choose a session...</option>
                                {sessions.map(s => (
                                    <option key={s.id} value={s.id}>{s.name} ({s.semester} Semester, {s.startYear})</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Amount Paid (₹) <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-4 py-3 text-slate-400 font-medium">₹</span>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                        placeholder="e.g. 5000"
                                        className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-medium"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Date of Payment <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    value={paymentDate}
                                    onChange={(e) => setPaymentDate(e.target.value)}
                                    required
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-medium"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex justify-end">
                            <Button type="submit" disabled={loading || !studentId}>
                                {loading ? 'Submitting...' : 'Confirm Payment Validation'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
