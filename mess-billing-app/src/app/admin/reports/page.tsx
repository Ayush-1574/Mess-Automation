'use client';
import React, { useState } from 'react';

export default function ReportsPage() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [month, setMonth] = useState('January'); // Default month

    const downloadReport = async (type: 'consolidated' | 'hostel-wise' | 'monthly') => {
        setLoading(true);
        try {
            let url = `/api/reports/${type}?year=${year}`;
            if (type === 'monthly') {
                url += `&month=${month}`;
            }
            window.open(url, '_blank');
        } catch (e) {
            alert("Failed to download report");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Download Reports</h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-gray-700 mb-2">Select Year</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Select Month (for Monthly Report)</label>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                <div className="p-4 border rounded hover:bg-gray-50 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold">Monthly Student Report</h3>
                        <p className="text-sm text-gray-600">Detailed bill/rebate data for a specific month.</p>
                    </div>
                    <button
                        onClick={() => downloadReport('monthly')}
                        disabled={loading}
                        className="bg-purple-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    >
                        Download Excel
                    </button>
                </div>

                <div className="p-4 border rounded hover:bg-gray-50 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold">Consolidated Student Report (Yearly)</h3>
                        <p className="text-sm text-gray-600">Includes monthly rebate details and totals for all students.</p>
                    </div>
                    <button
                        onClick={() => downloadReport('consolidated')}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    >
                        Download Excel
                    </button>
                </div>

                <div className="p-4 border rounded hover:bg-gray-50 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold">Mess/Hostel Wise Report</h3>
                        <p className="text-sm text-gray-600">Total billing summary grouped by Mess.</p>
                    </div>
                    <button
                        onClick={() => downloadReport('hostel-wise')}
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    >
                        Download Excel
                    </button>
                </div>
            </div>
        </div>
    );
}
