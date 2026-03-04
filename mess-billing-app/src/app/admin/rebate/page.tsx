'use client';
import React, { useState } from 'react';

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
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Manage Rebates</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Roll No (e.g. 2023CSB1008)</label>
                    <input
                        type="text"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        className="w-full border p-2 rounded"
                        placeholder="Enter Roll No"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Start Date</label>
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">End Date</label>
                        <input
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700">Reason</label>
                    <input
                        type="text"
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Create Rebate
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}
