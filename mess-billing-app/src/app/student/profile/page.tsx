'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function StudentProfilePage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`/api/student/${id}`)
                .then(res => res.json())
                .then(data => setStudent(data))
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!student) return <div>Student not found</div>;

    return (
        <div className="max-w-2xl bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                    <div>
                        <label className="block text-sm text-gray-500">Full Name</label>
                        <p className="text-lg font-medium">{student.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500">Roll No</label>
                        <p className="text-lg font-medium">{student.rollNo}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                    <div>
                        <label className="block text-sm text-gray-500">Batch</label>
                        <p className="text-lg font-medium">{student.batch}</p>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500">Email</label>
                        <p className="text-lg font-medium">{student.email}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-500">Mess</label>
                        <p className="text-lg font-medium">{student.mess}</p>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500">Hostel</label>
                        <p className="text-lg font-medium">{student.hostel}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
