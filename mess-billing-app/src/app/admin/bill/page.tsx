'use client';
import React, { useState } from 'react';

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
        <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Generate Monthly Bills</h1>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Month</label>
                        <select
                            value={formData.month}
                            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                            className="w-full border p-2 rounded"
                        >
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Year</label>
                        <input
                            type="number"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Total Days in Month</label>
                        <input
                            type="number"
                            value={formData.totalDays}
                            onChange={(e) => setFormData({ ...formData, totalDays: Number(e.target.value) })}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Rate Per Day (₹)</label>
                        <input
                            type="number"
                            value={formData.ratePerDay}
                            onChange={(e) => setFormData({ ...formData, ratePerDay: Number(e.target.value) })}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 disabled:bg-gray-400"
                >
                    {loading ? 'Processing...' : 'Generate Bills'}
                </button>
            </div>
            {message && <p className="mt-4 text-center font-bold">{message}</p>}
        </div>
    );
}
