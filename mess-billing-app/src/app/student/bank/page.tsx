'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function StudentBankPage() {
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
        <div className="max-w-2xl bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Bank Details</h2>

            {!editable && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p className="text-yellow-700">
                        Editing is currently disabled by the administrator. Please contact the office for changes.
                    </p>
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Account Number</label>
                    <input
                        type="text"
                        value={bankDetails.accountNo}
                        onChange={e => setBankDetails({ ...bankDetails, accountNo: e.target.value })}
                        className="w-full border p-2 rounded disabled:bg-gray-100"
                        disabled={!editable}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Bank Name</label>
                    <input
                        type="text"
                        value={bankDetails.bankName}
                        onChange={e => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                        className="w-full border p-2 rounded disabled:bg-gray-100"
                        disabled={!editable}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">IFSC Code</label>
                    <input
                        type="text"
                        value={bankDetails.ifsc}
                        onChange={e => setBankDetails({ ...bankDetails, ifsc: e.target.value })}
                        className="w-full border p-2 rounded disabled:bg-gray-100"
                        disabled={!editable}
                        required
                    />
                </div>

                {editable && (
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                )}
            </form>
            {message && <p className={`mt-4 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
        </div>
    );
}
