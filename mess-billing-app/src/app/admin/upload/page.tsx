'use client';
import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setMessage('');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload-students', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.error || 'Upload failed');
            }
        } catch (error) {
            setMessage('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadTemplate = () => {
        window.open('/api/template', '_blank');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Upload Student Data</h1>
                <p className="text-slate-500 mt-2 font-medium">Batch import student records using the standard Excel template.</p>
            </div>

            <Card className="p-0 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
                <div className="flex justify-between items-center bg-slate-50/20 p-8 mb-8 pb-4 border-b border-white/60">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        </div>
                        <div className="px-8 pb-8">
                            <h2 className="text-lg font-bold text-slate-800">File Importer</h2>
                            <p className="text-xs text-slate-400 font-medium">Supports .xlsx and .xls formats</p>
                        </div>
                    </div>
                    <button
                        onClick={handleDownloadTemplate}
                        className="text-sm font-bold flex items-center gap-2 text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Get Template
                    </button>
                </div>

                <div className="mb-8">
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all text-center group bg-slate-50">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-400 group-hover:text-indigo-500 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <label className="block text-sm font-semibold text-slate-700 mb-4 cursor-pointer">
                            Drag and drop or select a file to upload
                        </label>
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileChange}
                            className="block w-full max-w-xs mx-auto text-sm text-slate-500 file:cursor-pointer file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-colors"
                        />
                    </div>
                </div>

                <button
                    onClick={handleUpload}
                    disabled={!file || loading}
                    className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 shadow-lg shadow-indigo-200"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                            Processing Document...
                        </span>
                    ) : 'Upload Data File'}
                </button>

                {message && (
                    <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${message.toLowerCase().includes('success') ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-rose-50 text-rose-800 border border-rose-100'}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center ${message.toLowerCase().includes('success') ? 'bg-emerald-200 text-emerald-700' : 'bg-rose-200 text-rose-700'}`}>
                            {message.toLowerCase().includes('success')
                                ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            }
                        </span>
                        <p className="font-semibold text-sm">{message}</p>
                    </div>
                )}
            </Card>
        </div>
    );
}
