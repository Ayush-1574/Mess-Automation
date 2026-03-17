'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState, Suspense } from 'react';
import { Card } from '../../../../components/ui/Card';

function UploadContent() {
    const searchParams = useSearchParams();
    const officerId = searchParams.get('id');

    const [activeTab, setActiveTab] = useState<'students' | 'officers'>('students');
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (!formData.get('file')) {
            setError('Please select a file');
            return;
        }

        setUploading(true);
        setResult(null);
        setError('');

        try {
            const endpoint = activeTab === 'students' ? '/api/noc/upload-students' : '/api/noc/upload-officers';
            const res = await fetch(endpoint, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Upload failed');
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    const tabs = [
        { id: 'students' as const, label: 'Upload Students', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
        { id: 'officers' as const, label: 'Upload Officers', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Upload Data</h1>
                <p className="text-slate-500 mt-2 font-medium">Bulk upload students and officers via Excel files.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setResult(null); setError(''); }}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${activeTab === tab.id
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                            : 'bg-white/50 text-slate-600 hover:bg-white/80 border border-slate-200/60'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} /></svg>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upload Form */}
                <div className="lg:col-span-2">
                    <Card className="p-0 overflow-hidden border border-slate-200/60 shadow-md">
                        <div className="p-6 border-b border-slate-100/50 flex items-center gap-3 bg-gradient-to-r from-emerald-50/50 to-transparent">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shadow-inner border border-emerald-100/50">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">
                                    {activeTab === 'students' ? 'Upload Students' : 'Upload Officers'}
                                </h2>
                                <p className="text-xs text-slate-500 font-medium">Upload an Excel (.xlsx) file with the required columns</p>
                            </div>
                        </div>

                        <form onSubmit={handleUpload} className="p-6 space-y-6">
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-emerald-300 transition-colors">
                                <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <input
                                    type="file"
                                    name="file"
                                    accept=".xlsx,.xls"
                                    className="block w-full max-w-xs mx-auto text-sm text-slate-500 font-medium file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 file:shadow-sm file:cursor-pointer transition-all"
                                />
                                <p className="text-xs text-slate-400 mt-3 font-medium">Supports .xlsx and .xls files</p>
                            </div>

                            {error && (
                                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-medium text-sm">{error}</div>
                            )}

                            {result && (
                                <div className={`p-4 rounded-xl border font-medium text-sm ${result.errors ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
                                    <p className="font-bold">{result.message}</p>
                                    <p className="mt-1 text-xs opacity-80">Total rows: {result.totalRows} · Processed: {result.processed}</p>
                                    {result.errors && (
                                        <div className="mt-3 space-y-1 max-h-40 overflow-y-auto">
                                            {result.errors.map((err: string, i: number) => (
                                                <p key={i} className="text-xs text-rose-600">• {err}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full bg-emerald-600 text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform transition-all active:scale-[0.98] shadow-md shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {uploading ? 'Uploading...' : `Upload ${activeTab === 'students' ? 'Students' : 'Officers'}`}
                            </button>
                        </form>
                    </Card>
                </div>

                {/* Expected Columns */}
                <div>
                    <Card className="p-5 bg-gradient-to-br from-slate-50/50 to-white border-slate-100/50">
                        <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                            Expected Columns
                        </h3>
                        {activeTab === 'students' ? (
                            <div className="space-y-1.5">
                                {['RollNo *', 'Name *', 'Department *', 'Course *', 'FatherName', 'Gender', 'Category', 'Batch', 'Hostel', 'RoomNo', 'Phone', 'Email', 'Address', 'FeesPaid', 'JoiningYear'].map((col) => (
                                    <div key={col} className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${col.includes('*') ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                                        <span className="text-xs font-medium text-slate-600">{col}</span>
                                    </div>
                                ))}
                                <p className="text-[10px] text-slate-400 mt-2">* = Required columns</p>
                            </div>
                        ) : (
                            <div className="space-y-1.5">
                                {['Name *', 'Email *', 'Role *', 'Course', 'Batch'].map((col) => (
                                    <div key={col} className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${col.includes('*') ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                                        <span className="text-xs font-medium text-slate-600">{col}</span>
                                    </div>
                                ))}
                                <p className="text-[10px] text-slate-400 mt-2">* = Required columns</p>
                                <hr className="border-slate-100 my-2" />
                                <p className="text-[10px] text-slate-500 font-medium">Role values: ADMIN_OFFICER, JOINT_SUPERINTENDENT, ASSISTANT_REGISTRAR (or short: AO, JS, AR)</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function UploadPage() {
    return (
        <Suspense fallback={<div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading upload page...</div>}>
            <UploadContent />
        </Suspense>
    );
}
