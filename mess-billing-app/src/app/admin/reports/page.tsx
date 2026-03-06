'use client';
import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';

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

    const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => ({ label: m, value: m }));

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Download Reports</h1>
                <p className="text-slate-500 mt-2 font-medium">Export monthly and yearly billing data easily in Excel format.</p>
            </div>

            <Card className="p-8 mb-8 z-20">
                <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Timeline Selection</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <Input
                        label="Select Year"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                    />
                    <Select
                        label="Select Month"
                        value={month}
                        onChange={(val) => setMonth(val as string)}
                        options={monthOptions}
                    />
                </div>
            </Card>

            <div className="space-y-4">
                <Card className="p-6 hover:border-purple-300 hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">Monthly Student Report</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">Detailed bill & rebate data for the selected month.</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => downloadReport('monthly')}
                        disabled={loading}
                        variant="secondary"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Excel
                    </Button>
                </Card>

                <Card className="p-6 hover:border-blue-300 hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">Consolidated Yearly Report</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">Includes monthly totals and rebates for all students for the year.</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => downloadReport('consolidated')}
                        disabled={loading}
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-600"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Excel
                    </Button>
                </Card>

                <Card className="p-6 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">Mess/Hostel Wise Report</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">Total billing summary aggregated and grouped by Mess.</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => downloadReport('hostel-wise')}
                        disabled={loading}
                        variant="secondary"
                        className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Excel
                    </Button>
                </Card>
            </div>
        </div>
    );
}
