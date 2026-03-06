'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';

/* ── Types ──────────────────────────────────────── */
type ErrorRow = {
    _rowNum: number;
    _issues: string[];
    RollNo: string; Name: string; Batch: string; Course: string;
    Hostel: string; Email: string; Address: string; MessSecurity: string;
    BankAccountNo: string; BankName: string; IFSC: string;
};

const EMPTY_FORM = {
    rollNo: '', name: '', batch: '', courseId: '', hostel: '',
    email: '', address: '', messSecurity: '', bankAccountNo: '', bankName: '', ifsc: '',
};

/* ── Main Page ───────────────────────────────────── */
export default function StudentDataPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [form, setForm] = useState(EMPTY_FORM);
    const [addLoading, setAddLoading] = useState(false);
    const [addMsg, setAddMsg] = useState('');

    // Bulk upload
    const [file, setFile] = useState<File | null>(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadSummary, setUploadSummary] = useState<{ imported: number; skipped: number } | null>(null);
    const [errorRows, setErrorRows] = useState<ErrorRow[]>([]);
    const [editedRows, setEditedRows] = useState<ErrorRow[]>([]);
    const [retryLoading, setRetryLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch('/api/courses').then(r => r.json()).then(setCourses);
    }, []);

    /* ── Individual student add ─────────────────── */
    const setField = (key: keyof typeof EMPTY_FORM) => (val: any) =>
        setForm(p => ({ ...p, [key]: typeof val === 'object' && val?.target ? val.target.value : String(val) }));

    const handleAddStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddLoading(true); setAddMsg('');
        try {
            const res = await fetch('/api/admin/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, courseId: form.courseId ? Number(form.courseId) : null, messSecurity: form.messSecurity ? Number(form.messSecurity) : 0 }),
            });
            const data = await res.json();
            if (res.ok) { setAddMsg('✓ ' + data.message); setForm(EMPTY_FORM); }
            else setAddMsg('✗ ' + (data.error || 'Failed to add student'));
        } catch { setAddMsg('✗ An error occurred'); }
        finally { setAddLoading(false); }
    };

    /* ── Bulk upload ────────────────────────────── */
    const handleUpload = async () => {
        if (!file) return;
        setUploadLoading(true);
        setUploadSummary(null); setErrorRows([]); setEditedRows([]);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('/api/upload-students', { method: 'POST', body: formData });
            const data = await res.json();
            if (res.ok) {
                setUploadSummary({ imported: data.imported, skipped: data.skipped });
                setErrorRows(data.errorRows ?? []);
                setEditedRows(data.errorRows ?? []);
            } else {
                setUploadSummary(null);
                setErrorRows([{ _rowNum: 0, _issues: [data.error || 'Upload failed'], RollNo: '', Name: '', Batch: '', Course: '', Hostel: '', Email: '', Address: '', MessSecurity: '', BankAccountNo: '', BankName: '', IFSC: '' }]);
            }
        } catch { setErrorRows([{ _rowNum: 0, _issues: ['Network error'], RollNo: '', Name: '', Batch: '', Course: '', Hostel: '', Email: '', Address: '', MessSecurity: '', BankAccountNo: '', BankName: '', IFSC: '' }]); }
        finally { setUploadLoading(false); }
    };

    /* ── Edit a cell in the error table ───────── */
    const updateCell = (rowIdx: number, key: keyof ErrorRow, val: string) => {
        setEditedRows(prev => prev.map((r, i) => i === rowIdx ? { ...r, [key]: val } : r));
    };

    /* ── Retry uploading fixed rows ─────────────── */
    const handleRetry = async () => {
        if (editedRows.length === 0) return;
        setRetryLoading(true);
        // Convert editedRows to XLSX buffer and re-upload
        const sheetData = editedRows.map(r => ({
            RollNo: r.RollNo, Name: r.Name, Batch: r.Batch, Course: r.Course,
            Hostel: r.Hostel, Email: r.Email, Address: r.Address,
            MessSecurity: r.MessSecurity, BankAccountNo: r.BankAccountNo,
            BankName: r.BankName, IFSC: r.IFSC,
        }));
        const ws = XLSX.utils.json_to_sheet(sheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Students');
        const buf = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
        const blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const retryFile = new File([blob], 'fixed_students.xlsx');
        const formData = new FormData();
        formData.append('file', retryFile);
        try {
            const res = await fetch('/api/upload-students', { method: 'POST', body: formData });
            const data = await res.json();
            if (res.ok) {
                setUploadSummary(prev => ({ imported: (prev?.imported ?? 0) + data.imported, skipped: data.skipped }));
                setErrorRows(data.errorRows ?? []);
                setEditedRows(data.errorRows ?? []);
            }
        } catch { }
        finally { setRetryLoading(false); }
    };

    /* ── Download the (edited) error rows as Excel ─ */
    const downloadErrors = () => {
        const sheetData = editedRows.map(r => ({
            RollNo: r.RollNo, Name: r.Name, Batch: r.Batch, Course: r.Course,
            Hostel: r.Hostel, Email: r.Email, Address: r.Address,
            MessSecurity: r.MessSecurity, BankAccountNo: r.BankAccountNo,
            BankName: r.BankName, IFSC: r.IFSC, Issues: r._issues.join('; '),
        }));
        const ws = XLSX.utils.json_to_sheet(sheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Errors');
        XLSX.writeFile(wb, 'student_errors.xlsx');
    };

    /* ── Helpers ────────────────────────────────── */
    const inputCls = 'w-full border border-slate-200 bg-slate-50/50 px-4 py-2.5 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 focus:bg-white placeholder:text-slate-400 transition';
    const statusColor = (msg: string) =>
        msg.startsWith('✓') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200';
    const cellInput = 'border border-slate-200 bg-white rounded-lg px-2 py-1 text-xs font-medium text-slate-800 w-full focus:outline-none focus:ring-1 focus:ring-indigo-400';

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Data</h1>
                <p className="text-slate-500 mt-2 font-medium">Add individual students or batch-import records via Excel.</p>
            </div>

            {/* ── Add Individual Student ──────────────── */}
            <Card className="p-6 relative z-30">
                <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                    <span className="w-2 h-6 bg-indigo-500 rounded-full" />
                    Add Individual Student
                </h2>
                <form onSubmit={handleAddStudent} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Roll Number <span className="text-rose-500">*</span></label>
                            <input className={inputCls} placeholder="e.g. 2023CSB1101" value={form.rollNo} onChange={setField('rollNo')} required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Full Name <span className="text-rose-500">*</span></label>
                            <input className={inputCls} placeholder="e.g. Aditi Sharma" value={form.name} onChange={setField('name')} required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Batch</label>
                            <input className={inputCls} placeholder="e.g. 2023" value={form.batch} onChange={setField('batch')} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Course</label>
                            <Select theme="primary" value={form.courseId} onChange={val => setForm(p => ({ ...p, courseId: String(val) }))}
                                options={[{ label: 'Select course', value: '' }, ...courses.map(c => ({ label: c.name, value: c.id }))]} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Hostel</label>
                            <input className={inputCls} placeholder="e.g. Chenab" value={form.hostel} onChange={setField('hostel')} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Email</label>
                            <input type="email" className={inputCls} placeholder="student@example.com" value={form.email} onChange={setField('email')} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Address</label>
                            <input className={inputCls} placeholder="Permanent address" value={form.address} onChange={setField('address')} />
                        </div>
                    </div>
                    <div className="border-t border-slate-100 pt-4">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Bank Details <span className="normal-case text-slate-400 font-normal">(optional)</span></p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Mess Security (₹)</label>
                                <input type="number" className={inputCls} placeholder="0" value={form.messSecurity} onChange={setField('messSecurity')} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">A/C Number</label>
                                <input className={inputCls} placeholder="12345678901" value={form.bankAccountNo} onChange={setField('bankAccountNo')} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Bank Name</label>
                                <input className={inputCls} placeholder="SBI" value={form.bankName} onChange={setField('bankName')} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">IFSC</label>
                                <input className={inputCls} placeholder="SBIN0001234" value={form.ifsc} onChange={setField('ifsc')} />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" variant="primary" isLoading={addLoading} disabled={addLoading} className="w-full py-3">
                        {addLoading ? 'Adding Student…' : 'Add Student'}
                    </Button>
                    {addMsg && <div className={`p-3 rounded-xl text-sm font-semibold ${statusColor(addMsg)}`}>{addMsg}</div>}
                </form>
            </Card>

            {/* ── Bulk Upload ─────────────────────────── */}
            <Card className="p-0 overflow-hidden relative z-20">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Bulk Upload via Excel</h2>
                            <p className="text-xs text-slate-400 font-medium">Columns: RollNo, Name, Batch, Course, Hostel, Email…  Only valid rows are imported.</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={() => window.open('/api/template', '_blank')} className="gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Get Template
                    </Button>
                </div>

                <div className="p-6">
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:border-emerald-400 hover:bg-emerald-50/20 transition-all text-center group bg-slate-50">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-400 group-hover:text-emerald-500 group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-slate-700 mb-3">Drag &amp; drop or select a file to upload</p>
                        <input ref={fileInputRef} type="file" accept=".xlsx,.xls"
                            onChange={e => { if (e.target.files) { setFile(e.target.files[0]); setUploadSummary(null); setErrorRows([]); setEditedRows([]); } }}
                            className="block w-full max-w-xs mx-auto text-sm text-slate-500 file:cursor-pointer file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 transition-colors" />
                        {file && <p className="mt-2 text-xs font-medium text-slate-500">Selected: {file.name}</p>}
                    </div>

                    <Button variant="success" onClick={handleUpload} disabled={!file || uploadLoading} isLoading={uploadLoading} className="w-full py-3 mt-5">
                        {uploadLoading ? 'Processing File…' : 'Upload Excel File'}
                    </Button>

                    {/* Summary Banner */}
                    {uploadSummary !== null && (
                        <div className="mt-5 flex gap-3">
                            <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                                <p className="text-2xl font-extrabold text-emerald-700">{uploadSummary.imported}</p>
                                <p className="text-xs font-semibold text-emerald-600 mt-0.5">Imported Successfully</p>
                            </div>
                            <div className="flex-1 bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
                                <p className="text-2xl font-extrabold text-rose-700">{uploadSummary.skipped}</p>
                                <p className="text-xs font-semibold text-rose-600 mt-0.5">Skipped (with issues)</p>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* ── Error Review Table ─────────────────── */}
            {errorRows.length > 0 && (
                <Card className="p-0 overflow-hidden relative z-10">
                    <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
                    <div className="p-5 border-b border-slate-100 bg-rose-50/50 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-bold text-rose-800 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                {errorRows.length} Row{errorRows.length > 1 ? 's' : ''} with Issues
                            </h2>
                            <p className="text-xs text-rose-600 font-medium mt-0.5">Fix values inline below, then click "Re-upload Fixed Rows". You can also download the corrected file.</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <Button variant="outline" onClick={downloadErrors} className="gap-1.5 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Download
                            </Button>
                            <Button variant="warning" onClick={handleRetry} isLoading={retryLoading} disabled={retryLoading} className="gap-1.5 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                Re-upload Fixed Rows
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-xs font-medium">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-3 py-3 text-left text-slate-600 font-bold uppercase tracking-wide whitespace-nowrap">Row</th>
                                    <th className="px-3 py-3 text-left text-slate-600 font-bold uppercase tracking-wide whitespace-nowrap">Issues</th>
                                    <th className="px-3 py-3 text-left text-slate-600 font-bold uppercase tracking-wide whitespace-nowrap">Roll No</th>
                                    <th className="px-3 py-3 text-left text-slate-600 font-bold uppercase tracking-wide whitespace-nowrap">Name</th>
                                    <th className="px-3 py-3 text-left text-slate-600 font-bold uppercase tracking-wide whitespace-nowrap">Batch</th>
                                    <th className="px-3 py-3 text-left text-slate-600 font-bold uppercase tracking-wide whitespace-nowrap">Course</th>
                                    <th className="px-3 py-3 text-left text-slate-600 font-bold uppercase tracking-wide whitespace-nowrap">Hostel</th>
                                    <th className="px-3 py-3 text-left text-slate-600 font-bold uppercase tracking-wide whitespace-nowrap">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {editedRows.map((row, idx) => (
                                    <React.Fragment key={idx}>
                                        <tr className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                            <td className="px-3 py-2 text-slate-500 whitespace-nowrap">#{row._rowNum || idx + 2}</td>
                                            <td className="px-3 py-2 max-w-xs">
                                                {row._issues.map((issue, ii) => (
                                                    <span key={ii} className="inline-block bg-rose-100 text-rose-700 rounded-md px-1.5 py-0.5 text-[10px] font-semibold mr-1 mb-0.5 whitespace-nowrap">{issue}</span>
                                                ))}
                                            </td>
                                            <td className="px-3 py-2 min-w-[120px]">
                                                <input className={cellInput} value={row.RollNo} onChange={e => updateCell(idx, 'RollNo', e.target.value)} />
                                            </td>
                                            <td className="px-3 py-2 min-w-[140px]">
                                                <input className={cellInput} value={row.Name} onChange={e => updateCell(idx, 'Name', e.target.value)} />
                                            </td>
                                            <td className="px-3 py-2 min-w-[80px]">
                                                <input className={cellInput} value={row.Batch} onChange={e => updateCell(idx, 'Batch', e.target.value)} />
                                            </td>
                                            <td className="px-3 py-2 min-w-[120px]">
                                                <input className={cellInput} value={row.Course} onChange={e => updateCell(idx, 'Course', e.target.value)}
                                                    list={`courses-list-${idx}`} />
                                                <datalist id={`courses-list-${idx}`}>
                                                    {courses.map(c => <option key={c.id} value={c.name} />)}
                                                </datalist>
                                            </td>
                                            <td className="px-3 py-2 min-w-[100px]">
                                                <input className={cellInput} value={row.Hostel} onChange={e => updateCell(idx, 'Hostel', e.target.value)} />
                                            </td>
                                            <td className="px-3 py-2 min-w-[180px]">
                                                <input className={cellInput} value={row.Email} onChange={e => updateCell(idx, 'Email', e.target.value)} />
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-2">
                        <Button variant="outline" onClick={downloadErrors} className="gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            Download as Excel
                        </Button>
                        <Button variant="warning" onClick={handleRetry} isLoading={retryLoading} disabled={retryLoading}>
                            Re-upload Fixed Rows
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
