'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';

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
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Profile</h1>
                <p className="text-slate-500 mt-2 font-medium">Personal details registered with the Hostel Management.</p>
            </div>

            <Card className="p-0 relative overflow-hidden">
                {/* Header Banner */}
                <div className="h-32 bg-indigo-500 relative">
                    <div className="absolute inset-0 bg-white/20 mix-blend-overlay"></div>
                </div>

                <div className="px-8 pb-8">
                    {/* Avatar Area */}
                    <div className="relative -mt-16 mb-8">
                        <div className="w-32 h-32 rounded-2xl bg-white p-2 shadow-lg inline-block">
                            <div className="w-full h-full bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                                <span className="text-4xl font-extrabold">{student.name.charAt(0).toUpperCase()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                                <p className="text-xl font-bold text-slate-800">{student.name}</p>
                            </div>
                            <div className="border-t border-slate-100 pt-4">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Roll No / ID</label>
                                <div className="inline-flex py-1 px-3 bg-slate-100 text-slate-700 font-mono font-bold rounded-lg mt-1">
                                    {student.rollNo}
                                </div>
                            </div>
                            <div className="border-t border-slate-100 pt-4">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Batch</label>
                                <p className="text-lg font-medium text-slate-700">{student.batch}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                                <p className="text-lg font-medium text-slate-700 truncate">{student.email}</p>
                            </div>
                            <div className="border-t border-slate-100 pt-4">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mess Assignment</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                    <p className="text-lg font-medium text-slate-700">{student.mess}</p>
                                </div>
                            </div>
                            <div className="border-t border-slate-100 pt-4">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hostel</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                    <p className="text-lg font-medium text-slate-700">{student.hostel}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
