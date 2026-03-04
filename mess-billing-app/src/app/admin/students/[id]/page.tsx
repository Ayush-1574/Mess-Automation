'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow space-y-8">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-2xl font-bold">Student Details: {student.name} ({student.rollNo})</h1>
                <a href="/admin/permissions" className="text-blue-600 hover:underline">← Back to List</a>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                    <label className="text-sm text-gray-500 block">Batch</label>
                    <span className="font-medium">{student.batch}</span>
                </div>
                <div>
                    <label className="text-sm text-gray-500 block">Mess</label>
                    <span className="font-medium">{student.mess}</span>
                </div>
                <div>
                    <label className="text-sm text-gray-500 block">Hostel</label>
                    <span className="font-medium">{student.hostel}</span>
                </div>
                <div>
                    <label className="text-sm text-gray-500 block">Email</label>
                    <span className="font-medium">{student.email}</span>
                </div>
                <div>
                    <label className="text-sm text-gray-500 block">Base Rate</label>
                    <span className="font-medium">₹{student.messBaseRate || 'N/A'}</span>
                </div>
                <div>
                    <label className="text-sm text-gray-500 block">Bank Editing</label>
                    <span className={`px-2 py-0.5 text-xs rounded ${student.isBankEditable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {student.isBankEditable ? 'Allowed' : 'Frozen'}
                    </span>
                </div>
            </div>

            {/* Bank Details Section */}
            <div className="bg-gray-50 p-6 rounded border">
                <h2 className="text-lg font-bold mb-4 text-indigo-700">Bank Details (Read Only)</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm text-gray-500 block">Account Number</label>
                        <span className="font-mono bg-white px-2 py-1 rounded border block">{student.bankAccountNo || 'Not Provided'}</span>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500 block">Bank Name</label>
                        <span className="font-medium block mt-1">{student.bankName || '-'}</span>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500 block">IFSC Code</label>
                        <span className="font-mono bg-white px-2 py-1 rounded border block">{student.ifsc || '-'}</span>
                    </div>
                </div>
            </div>

            {/* Rebate History Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-indigo-700">Rebate History</h2>
                    <select
                        value={rebateFilterMonth}
                        onChange={(e) => setRebateFilterMonth(e.target.value)}
                        className="border p-2 rounded text-sm"
                    >
                        <option value="All">All Months</option>
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                {/* Summary Cards for Selected Month */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 p-4 rounded border border-blue-200">
                        <label className="text-sm text-blue-600 block">Total Rebate Days</label>
                        <span className="text-xl font-bold text-blue-800">{totalRebateDays}</span>
                    </div>
                    <div className="bg-green-50 p-4 rounded border border-green-200">
                        <label className="text-sm text-green-600 block">Total Rebate Amount</label>
                        <span className="text-xl font-bold text-green-800">₹{totalRebateAmount.toFixed(2)}</span>
                    </div>
                </div>

                {filteredRebates && filteredRebates.length > 0 ? (
                    <table className="w-full text-left border text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border-b">Period</th>
                                <th className="p-3 border-b">Days</th>
                                <th className="p-3 border-b">Rate Applied</th>
                                <th className="p-3 border-b">Amount</th>
                                <th className="p-3 border-b">Reason</th>
                                <th className="p-3 border-b">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRebates.map((rebate: any) => {
                                const start = new Date(rebate.startDate);
                                const end = new Date(rebate.endDate);
                                const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

                                const rMonth = start.toLocaleString('default', { month: 'long' });
                                const rYear = start.getFullYear();
                                const bill = student.bills.find((b: any) => b.month === rMonth && b.year === rYear);
                                const rate = bill ? bill.ratePerDay : (student.messBaseRate || 0);

                                return (
                                    <tr key={rebate.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">
                                            {start.toLocaleDateString()} - {end.toLocaleDateString()}
                                        </td>
                                        <td className="p-3 font-bold">{diffDays}</td>
                                        <td className="p-3 text-gray-500">₹{rate}</td>
                                        <td className="p-3 font-bold text-green-600">₹{(diffDays * rate).toFixed(2)}</td>
                                        <td className="p-3">{rebate.reason}</td>
                                        <td className="p-3">
                                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                                                {rebate.status}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 italic border p-4 rounded text-center">No rebate records found for this selection.</p>
                )}
            </div>
        </div>
    );
}
