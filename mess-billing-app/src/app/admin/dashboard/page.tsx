'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/ui/Card';

export default function AdminDashboard() {
    const [sessions, setSessions] = useState<any[]>([]);
    const [selectedSessionId, setSelectedSessionId] = useState<string>('');
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean, title: string, type: 'assigned' | 'left' | 'total' | null }>({ isOpen: false, title: '', type: null });
    const [modalData, setModalData] = useState<any[]>([]);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        // Fetch available sessions
        fetch('/api/sessions')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setSessions(data);
                    // Select most recently created session by default
                    if (data.length > 0) {
                        const defaultSession = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
                        setSelectedSessionId(String(defaultSession.id));
                    }
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (!selectedSessionId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        fetch(`/api/dashboard/stats?sessionId=${selectedSessionId}`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [selectedSessionId]);

    const openModal = (title: string, type: 'assigned' | 'left' | 'total') => {
        if (!selectedSessionId) return;
        setModalConfig({ isOpen: true, title, type });
        setModalLoading(true);
        setModalData([]);
        
        fetch(`/api/dashboard/details?sessionId=${selectedSessionId}&type=${type}`)
            .then(r => r.json())
            .then(d => {
                setModalData(Array.isArray(d) ? d : []);
            })
            .catch(console.error)
            .finally(() => setModalLoading(false));
    };

    const dashboardMertics = [
        {
            title: 'Assigned to Session',
            value: loading ? '--' : (stats?.sessionStudents || 0).toLocaleString(),
            subtext: 'Students mapped to this session',
            icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
            color: 'bg-indigo-500', shadow: 'shadow-indigo-200',
            onClick: () => openModal('Students Assigned to Session', 'assigned')
        },
        {
            title: 'Left Mid-Session',
            value: loading ? '--' : (stats?.sessionLeft || 0).toLocaleString(),
            subtext: 'Students who left during session',
            icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
            color: 'bg-rose-500', shadow: 'shadow-rose-200',
            onClick: () => openModal('Students Left Mid-Session', 'left')
        },
        {
            title: 'Total Students',
            value: loading ? '--' : (stats?.totalStudents || 0).toLocaleString(),
            subtext: 'Absolute student count in DB',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
            color: 'bg-emerald-500', shadow: 'shadow-teal-200',
            onClick: () => openModal('All Registered Students', 'total')
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
                    <p className="text-slate-500 mt-2 font-medium">Welcome back! Here's what's happening today.</p>
                </div>
                
                {/* Session Filter */}
                <div className="flex flex-col items-start min-w-[200px]">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Session Context</label>
                    <div className="relative w-full">
                        <select
                            value={selectedSessionId}
                            onChange={(e) => setSelectedSessionId(e.target.value)}
                            className="appearance-none w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-slate-800 font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
                        >
                            <option value="" disabled>Select Session</option>
                            {sessions.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dashboardMertics.map((stat, idx) => (
                    <Card key={idx} className="p-0 overflow-hidden group relative hover:shadow-lg transition-all duration-300">
                        <button 
                            onClick={stat.onClick} 
                            disabled={loading}
                            className="w-full text-left p-6 flex flex-col justify-between focus:outline-none disabled:cursor-not-allowed"
                        >
                            <div className="flex justify-between items-start w-full relative z-10 w-full">
                                <div>
                                    <h3 className="text-slate-500 font-semibold text-xs mb-1 uppercase tracking-widest">{stat.title}</h3>
                                    <p className="text-4xl font-extrabold text-slate-800 tracking-tight mt-2">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-xl ${stat.shadow} transform group-hover:-translate-y-1 group-hover:rotate-6 transition-all duration-300`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={stat.icon}></path></svg>
                                </div>
                            </div>
                            <p className="text-sm text-slate-400 mt-5 relative z-10 font-medium flex items-center justify-between w-full">
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                    {stat.subtext}
                                </span>
                                <span className="text-xs font-bold uppercase text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">View Details &rarr;</span>
                            </p>
                        </button>
                    </Card>
                ))}
            </div>

            <Card className="mt-10 p-8 border-transparent bg-slate-50/50 shadow-inner">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100/80 flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Quick Actions</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'View Detail', path: '/admin/permissions', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
                        { label: 'Monthly Rebate', path: '/admin/monthly-rebates', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zm-7-8V7m0 6v.01' },
                        { label: 'Bill Generation', path: '/admin/mess-rates', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
                        { label: 'Mess Assignment', path: '/admin/mess-assignments', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
                        { label: 'Hostel Assignment', path: '/admin/hostel-assignments', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2' },
                        { label: 'Generate Reports', path: '/admin/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                        { label: 'Consolidated View', path: '/admin/reports/view', icon: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2' }
                    ].map((btn, idx) => (
                        <a key={idx} href={btn.path} className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-100 transition-all group text-center cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-indigo-50 transition-colors">
                                <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={btn.icon}></path></svg>
                            </div>
                            <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-700">{btn.label}</span>
                        </a>
                    ))}
                </div>
            </Card>

            {/* Detailed View Modal */}
            {modalConfig.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-4 duration-300">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">{modalConfig.title}</h2>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{modalData.length} records found</p>
                                </div>
                            </div>
                            <button onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} className="text-slate-400 hover:text-rose-600 bg-white hover:bg-rose-50 rounded-full p-2 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        
                        {/* Modal Body */}
                        <div className="p-0 overflow-y-auto flex-1 bg-slate-50/30">
                            {modalLoading ? (
                                <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-500">
                                    <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                                    <span className="font-bold tracking-wide">Fetching data...</span>
                                </div>
                            ) : modalData.length > 0 ? (
                                <table className="min-w-full text-sm">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr className="text-xs uppercase tracking-wider text-slate-500 font-semibold sticky top-0 bg-slate-50/90 backdrop-blur-md shadow-sm">
                                            <th className="p-4 text-left w-24">Entry No</th>
                                            <th className="p-4 text-left">Student Name</th>
                                            <th className="p-4 text-left">Hostel</th>
                                            <th className="p-4 text-left">{modalConfig.type === 'left' ? 'Leave Timestamp' : (modalConfig.type === 'assigned' ? 'Mess Mapping' : 'Additional Info')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {modalData.map(st => (
                                            <tr key={st.id} className="hover:bg-indigo-50/50 transition-colors group cursor-default">
                                                <td className="p-4 font-bold text-indigo-700">{st.entryNo}</td>
                                                <td className="p-4 font-bold text-slate-800">{st.name}</td>
                                                <td className="p-4 text-slate-500 font-medium">{st.hostel || '-'}</td>
                                                <td className="p-4 text-slate-600">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${modalConfig.type === 'left' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-100 text-slate-700 border-slate-200'} group-hover:bg-white`}>
                                                        {st.info}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-20 text-center text-slate-400 font-medium">No students found matching this criteria for the selected session.</div>
                            )}
                        </div>
                        
                        {/* Modal Footer */}
                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                            <button onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} className="px-5 py-2.5 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-900 transition-colors shadow-sm">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
