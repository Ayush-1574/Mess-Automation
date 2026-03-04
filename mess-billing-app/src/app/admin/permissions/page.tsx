'use client';
import React, { useEffect, useState } from 'react';

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
        <div className="bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">View Details</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="flex justify-between items-center mb-4 gap-4">
                <input
                    type="text"
                    placeholder="Search by Roll No or Name..."
                    className="w-full border p-2 rounded max-w-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="space-x-2">
                    <button
                        onClick={() => handleBulkAction(false)} // Freeze
                        disabled={selectedStudents.length === 0 || actionLoading || loading}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
                    >
                        Freeze Selected ({selectedStudents.length})
                    </button>
                    <button
                        onClick={() => handleBulkAction(true)} // Allow
                        disabled={selectedStudents.length === 0 || actionLoading || loading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                    >
                        Allow Selected ({selectedStudents.length})
                    </button>
                </div>
            </div>

            {loading ? (
                <div>Loading students...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-3 w-10">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length}
                                    />
                                </th>
                                <th className="p-3">Roll No</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Mess</th>
                                <th className="p-3">Hostel</th>
                                <th className="p-3">Bank Edit Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedStudents.includes(student.id)}
                                            onChange={() => handleSelectStudent(student.id)}
                                        />
                                    </td>
                                    <td className="p-3">{student.rollNo}</td>
                                    <td className="p-3">{student.name}</td>
                                    <td className="p-3">{student.mess || '-'}</td>
                                    <td className="p-3">{student.hostel || '-'}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs ${student.isBankEditable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {student.isBankEditable ? 'Allowed' : 'Frozen'}
                                        </span>
                                    </td>
                                    <td className="p-3 space-x-2">
                                        <button
                                            onClick={() => togglePermission(student.id, student.isBankEditable)}
                                            className={`px-2 py-1 rounded text-white text-xs ${student.isBankEditable ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                                        >
                                            {student.isBankEditable ? 'Freeze' : 'Allow'}
                                        </button>
                                        <a
                                            href={`/admin/students/${student.id}`}
                                            className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 inline-block"
                                        >
                                            View Details
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            {filteredStudents.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="p-4 text-center text-gray-500">No students found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
