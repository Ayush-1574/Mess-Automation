'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function StudentDashboard() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`/api/student/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Student not found');
                    return res.json();
                })
                .then(data => setStudent(data))
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading profile...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    if (!student) return <div className="text-center mt-10">No student data found</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            {/* Summary Cards could go here */}

            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Bill History</h2>
                {student.bills && student.bills.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Month/Year</th>
                                <th className="p-2">Billable Days</th>
                                <th className="p-2">Rate/Day</th>
                                <th className="p-2">Bill Amount</th>
                                <th className="p-2">Rebate Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.bills.map((bill: any) => {
                                const daysInMonth = new Date(bill.year,
                                    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].indexOf(bill.month) + 1,
                                    0).getDate();
                                const rebateDays = daysInMonth - bill.totalDays;
                                const rebateAmount = rebateDays * bill.ratePerDay;

                                return (
                                    <tr key={bill.id} className="border-b">
                                        <td className="p-2">{bill.month} {bill.year}</td>
                                        <td className="p-2">{bill.totalDays}</td>
                                        <td className="p-2">₹{bill.ratePerDay}</td>
                                        <td className="p-2 font-bold">₹{bill.totalAmount}</td>
                                        <td className="p-2 text-green-600 font-bold">
                                            ₹{rebateAmount > 0 ? rebateAmount : 0}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No bill history available.</p>
                )}
            </div>

            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Rebate History</h2>
                {student.rebates && student.rebates.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Start Date</th>
                                <th className="p-2">End Date</th>
                                <th className="p-2">Reason</th>
                                <th className="p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.rebates.map((rebate: any) => (
                                <tr key={rebate.id} className="border-b">
                                    <td className="p-2">{new Date(rebate.startDate).toLocaleDateString()}</td>
                                    <td className="p-2">{new Date(rebate.endDate).toLocaleDateString()}</td>
                                    <td className="p-2">{rebate.reason}</td>
                                    <td className="p-2">
                                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                                            {rebate.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No rebates found.</p>
                )}
            </div>
        </div>
    );
}
