'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { Card } from '../../../components/ui/Card';

function BankContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [bankDetails, setBankDetails] = useState({
        accountNo: '',
        bankName: '',
        ifsc: '',
    });
    const [editable, setEditable] = useState(false); // Permission from DB
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`/api/student/${id}`)
                .then(res => res.json())
                .then(data => {
                    setBankDetails({
                        accountNo: data.bankAccountNo || '',
                        bankName: data.bankName || '',
                        ifsc: data.ifsc || '',
                    });
                    setEditable(data.isBankEditable !== false); // Default true if undefined
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const res = await fetch(`/api/student/${id}`, {
                method: 'PATCH', // We'll implement PATCH in the same route or create new
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bankAccountNo: bankDetails.accountNo,
                    bankName: bankDetails.bankName,
                    ifsc: bankDetails.ifsc,
                }),
            });

            if (res.ok) {
                setMessage('Bank details updated successfully!');
            } else {
                setMessage('Failed to update details');
            }
        } catch (error) {
            setMessage('Error saving details');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Bank Details</h1>
                <p className="text-slate-500 mt-2 font-medium">Manage your linked bank account for surplus refund transfers.</p>
            </div>

            {!editable && (
                <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    </div>
                    <div>
                        <h4 className="text-amber-800 font-bold mb-1">Editing Locked</h4>
                        <p className="text-amber-700 text-sm font-medium">
                            Your bank details have been verified and locked by the administrator. Contact the mess office if you need to make changes.
                        </p>
                    </div>
                </div>
            )}

            <Card className="p-8 pb-4">
                <div className="flex items-center gap-3 mb-8 relative z-10 border-b border-slate-50/20 pb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Account Information</h2>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5 flex justify-between">
                            Account Number
                            {editable ? null : <span className="text-indigo-500 font-semibold text-xs">Read Only</span>}
                        </label>
                        <input
                            type="text"
                            value={bankDetails.accountNo}
                            onChange={e => setBankDetails({ ...bankDetails, accountNo: e.target.value })}
                            className={`w-full border px-4 py-3 rounded-xl focus:outline-none transition-all font-bold tracking-wide ${editable ? 'border-slate-200 bg-slate-50/50 text-slate-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500' : 'border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed'}`}
                            disabled={!editable}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Bank Name</label>
                            <input
                                type="text"
                                value={bankDetails.bankName}
                                onChange={e => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                                className={`w-full border px-4 py-3 rounded-xl focus:outline-none transition-all font-medium ${editable ? 'border-slate-200 bg-slate-50/50 text-slate-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500' : 'border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed'}`}
                                disabled={!editable}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">IFSC Code</label>
                            <input
                                type="text"
                                value={bankDetails.ifsc}
                                onChange={e => setBankDetails({ ...bankDetails, ifsc: e.target.value })}
                                className={`w-full border px-4 py-3 rounded-xl focus:outline-none transition-all font-medium uppercase ${editable ? 'border-slate-200 bg-slate-50/50 text-slate-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500' : 'border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed'}`}
                                disabled={!editable}
                                required
                            />
                        </div>
                    </div>

                    {editable && (
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all active:scale-[0.98] shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                                        Saving Changes...
                                    </>
                                ) : (
                                    'Update Bank Details'
                                )}
                            </button>
                        </div>
                    )}
                </form>

                {message && (
                    <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${message.toLowerCase().includes('success') ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-rose-50 text-rose-800 border border-rose-100'}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.toLowerCase().includes('success') ? 'bg-emerald-200 text-emerald-700' : 'bg-rose-200 text-rose-700'}`}>
                            {message.toLowerCase().includes('success')
                                ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            }
                        </span>
                        <p className="font-semibold text-sm">{message}</p>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default function StudentBankPage() {
    return (
        <Suspense fallback={<div>Loading bank details...</div>}>
            <BankContent />
        </Suspense>
    );
}
