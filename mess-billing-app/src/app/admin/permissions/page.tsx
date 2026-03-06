'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';

export default function PermissionsPage() {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await fetch('/api/admin/students');
            if (!res.ok) throw new Error('API failed - Server restart likely required');
            const data = await res.json();
            console.log('Students fetched:', data);
            if (Array.isArray(data)) {
                setStudents(data);
            } else {
                console.error('Data is not an array:', data);
                setError('Invalid data received');
            }
        } catch (error) {
            console.error('Error fetching students:', error);
            setError('Failed to load students. Please restart the server to apply database changes.');
        } finally {
            setLoading(false);
        }
    };

    const togglePermission = async (id: number, currentStatus: boolean | null) => {
        // Toggle: true -> false (Freeze), false -> true (Allow)
        const newStatus = !(currentStatus === true); // If true, make false. If false/null, make true.

        try {
            const res = await fetch(`/api/student/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isBankEditable: newStatus })
            });

            if (res.ok) {
                // Optimistic update
                setStudents(prev => prev.map(s => s.id === id ? { ...s, isBankEditable: newStatus } : s));
            } else {
                alert('Failed to update permission');
            }
        } catch (error) {
            alert('Error updating permission');
        }
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedStudents(filteredStudents.map(s => s.id));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelectStudent = (id: number) => {
        if (selectedStudents.includes(id)) {
            setSelectedStudents(prev => prev.filter(sid => sid !== id));
        } else {
            setSelectedStudents(prev => [...prev, id]);
        }
    };

    const handleBulkAction = async (status: boolean) => {
        if (selectedStudents.length === 0) return;
        if (!confirm(`Are you sure you want to ${status ? 'Allow' : 'Freeze'} editing for ${selectedStudents.length} students?`)) return;

        setActionLoading(true);
        try {
            const res = await fetch('/api/admin/permissions/bulk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentIds: selectedStudents, isBankEditable: status })
            });

            if (res.ok) {
                // Refresh list
                await fetchStudents();
                setSelectedStudents([]);
                alert('Permissions updated successfully');
            } else {
                alert('Failed to update permissions');
            }
        } catch (error) {
            console.error('Bulk action error:', error);
            alert('Error performing bulk action');
        } finally {
            setActionLoading(false);
        }
    };

    const filteredStudents = students.filter(s =>
        s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-[1200px] mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Access Control</h1>
                    <p className="text-slate-500 mt-1 font-medium">Manage student permissions for bank detail editing.</p>
                </div>
            </div>

            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl flex items-start gap-3 shadow-sm animate-in slide-in-from-top-2">
                    <svg className="w-5 h-5 text-rose-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                </div>
            )}

            <Card className="p-0 overflow-hidden relative">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
                    <div className="relative w-full sm:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by Roll No or Name..."
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm w-full font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => handleBulkAction(false)} // Freeze
                            disabled={selectedStudents.length === 0 || actionLoading || loading}
                            className="flex-1 sm:flex-none bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-200 hover:border-transparent px-4 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            Freeze <span className="opacity-80">({selectedStudents.length})</span>
                        </button>
                        <button
                            onClick={() => handleBulkAction(true)} // Allow
                            disabled={selectedStudents.length === 0 || actionLoading || loading}
                            className="flex-1 sm:flex-none bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 hover:border-transparent px-4 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
                            Allow <span className="opacity-80">({selectedStudents.length})</span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="p-16 flex flex-col items-center justify-center text-slate-400">
                        <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        <p className="font-medium">Loading permissions data...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="min-w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    <th className="p-4 indent-4 w-10">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length}
                                            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                        />
                                    </th>
                                    <th className="p-4">Roll No</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Mess</th>
                                    <th className="p-4">Hostel</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 text-right pr-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredStudents.map(student => (
                                    <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors group">
                                        <td className="p-4 indent-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedStudents.includes(student.id)}
                                                onChange={() => handleSelectStudent(student.id)}
                                                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="p-4 font-bold text-slate-800">{student.rollNo}</td>
                                        <td className="p-4 font-medium text-slate-700">{student.name}</td>
                                        <td className="p-4 text-slate-600">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                                {student.mess || '-'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-600">{student.hostel || '-'}</td>
                                        <td className="p-4 text-center">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${student.isBankEditable ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${student.isBankEditable ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                                {student.isBankEditable ? 'Allowed' : 'Frozen'}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right pr-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => togglePermission(student.id, student.isBankEditable)}
                                                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors ${student.isBankEditable ? 'bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white'}`}
                                                >
                                                    {student.isBankEditable ? 'Freeze Access' : 'Allow Access'}
                                                </button>
                                                <a
                                                    href={`/admin/students/${student.id}`}
                                                    className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-600 hover:text-white transition-colors inline-flex items-center gap-1"
                                                >
                                                    Details
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredStudents.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="p-10 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                                <p className="text-lg font-medium text-slate-700">No students found</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}
