'use client';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from './Button';
import { Card } from './Card';

export type ErrorRow = Record<string, any> & { _rowNum: number; _issues: string[] };

interface UploadWithErrorsProps {
    /** API endpoint to POST the file + any extra formData fields */
    endpoint: string;
    /** Extra formData fields to append alongside the file (e.g. sessionId, month) */
    extraFields?: Record<string, string | number>;
    /** Columns to show in the editable error table (keys must match the errorRow shape returned by the API) */
    errorColumns: { key: string; label: string; width?: string }[];
    /** Colour theme for the upload card accent bar */
    accent?: 'emerald' | 'indigo' | 'orange' | 'teal';
    /** Button label overrides */
    uploadLabel?: string;
    /** Optional autocomplete hint lists per column key  */
    hints?: Record<string, string[]>;
    onSuccess?: (result: { imported: number; skipped: number }) => void;
}

const ACCENT_CLASSES = {
    emerald: { bar: 'bg-emerald-500', btn: 'success' as const, icon: 'text-emerald-600', iconBg: 'bg-emerald-50 border-emerald-100', drop: 'hover:border-emerald-400 hover:bg-emerald-50/20', file: 'file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200' },
    indigo: { bar: 'bg-indigo-500', btn: 'primary' as const, icon: 'text-indigo-600', iconBg: 'bg-indigo-50 border-indigo-100', drop: 'hover:border-indigo-400 hover:bg-indigo-50/20', file: 'file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200' },
    orange: { bar: 'bg-orange-500', btn: 'warning' as const, icon: 'text-orange-600', iconBg: 'bg-orange-50 border-orange-100', drop: 'hover:border-orange-400 hover:bg-orange-50/20', file: 'file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200' },
    teal: { bar: 'bg-teal-500', btn: 'success' as const, icon: 'text-teal-600', iconBg: 'bg-teal-50 border-teal-100', drop: 'hover:border-teal-400 hover:bg-teal-50/20', file: 'file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200' },
};

export function UploadWithErrors({
    endpoint, extraFields = {}, errorColumns, accent = 'emerald',
    uploadLabel = 'Upload Excel File', hints = {}, onSuccess,
}: UploadWithErrorsProps) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [retryLoading, setRetryLoading] = useState(false);
    const [summary, setSummary] = useState<{ imported: number; skipped: number } | null>(null);
    const [errorRows, setErrorRows] = useState<ErrorRow[]>([]);
    const [editedRows, setEditedRows] = useState<ErrorRow[]>([]);

    const colors = ACCENT_CLASSES[accent];
    const cellInput = 'border border-slate-200 bg-white rounded-lg px-2 py-1 text-xs font-medium text-slate-800 w-full focus:outline-none focus:ring-1 focus:ring-indigo-400';

    const doUpload = async (uploadFile: File) => {
        const formData = new FormData();
        formData.append('file', uploadFile);
        Object.entries(extraFields).forEach(([k, v]) => formData.append(k, String(v)));
        const res = await fetch(endpoint, { method: 'POST', body: formData });
        const data = await res.json();
        if (res.ok) {
            setSummary({ imported: data.imported, skipped: data.skipped });
            setErrorRows(data.errorRows ?? []);
            setEditedRows(data.errorRows ?? []);
            if (onSuccess) onSuccess({ imported: data.imported, skipped: data.skipped });
        } else {
            setSummary(null);
            setErrorRows([{ _rowNum: 0, _issues: [data.error || 'Upload failed'] }]);
            setEditedRows([{ _rowNum: 0, _issues: [data.error || 'Upload failed'] }]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true); setSummary(null); setErrorRows([]); setEditedRows([]);
        try { await doUpload(file); } catch { setErrorRows([{ _rowNum: 0, _issues: ['Network error'] }]); }
        finally { setLoading(false); }
    };

    const updateCell = (idx: number, key: string, val: string) =>
        setEditedRows(prev => prev.map((r, i) => i === idx ? { ...r, [key]: val } : r));

    const handleRetry = async () => {
        if (!editedRows.length) return;
        setRetryLoading(true);
        const sheetData = editedRows.map(r => {
            const out: Record<string, any> = {};
            errorColumns.forEach(c => { out[c.key] = r[c.key] ?? ''; });
            return out;
        });
        const ws = XLSX.utils.json_to_sheet(sheetData);
        const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Data');
        const buf = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
        const retryFile = new File([new Blob([buf])], 'retry.xlsx');
        try { await doUpload(retryFile); }
        catch { }
        finally { setRetryLoading(false); }
    };

    const downloadErrors = () => {
        const sheetData = editedRows.map(r => {
            const out: Record<string, any> = {};
            errorColumns.forEach(c => { out[c.key] = r[c.key] ?? ''; });
            out['Issues'] = (r._issues ?? []).join('; ');
            return out;
        });
        const ws = XLSX.utils.json_to_sheet(sheetData);
        const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Errors');
        XLSX.writeFile(wb, 'upload_errors.xlsx');
    };

    return (
        <div className="space-y-5">
            {/* Drop zone */}
            <div className={`border-2 border-dashed border-slate-200 rounded-2xl p-8 transition-all text-center group bg-slate-50 ${colors.drop}`}>
                <div className={`w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-400 group-hover:${colors.icon} group-hover:scale-110 transition-transform`}>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p className="text-sm font-semibold text-slate-700 mb-3">Drag &amp; drop or select a file (.xlsx / .xls)</p>
                <input type="file" accept=".xlsx,.xls"
                    onChange={e => { if (e.target.files) { setFile(e.target.files[0]); setSummary(null); setErrorRows([]); setEditedRows([]); } }}
                    className={`block w-full max-w-xs mx-auto text-sm text-slate-500 file:cursor-pointer file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold transition-colors ${colors.file}`}
                />
                {file && <p className="mt-2 text-xs font-medium text-slate-500">Selected: {file.name}</p>}
            </div>

            <Button variant={colors.btn} onClick={handleUpload} disabled={!file || loading} isLoading={loading} className="w-full py-3">
                {loading ? 'Processing…' : uploadLabel}
            </Button>

            {/* Summary */}
            {summary !== null && (
                <div className="flex gap-3">
                    <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                        <p className="text-2xl font-extrabold text-emerald-700">{summary.imported}</p>
                        <p className="text-xs font-semibold text-emerald-600 mt-0.5">Imported Successfully</p>
                    </div>
                    <div className="flex-1 bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
                        <p className="text-2xl font-extrabold text-rose-700">{summary.skipped}</p>
                        <p className="text-xs font-semibold text-rose-600 mt-0.5">Skipped (with issues)</p>
                    </div>
                </div>
            )}

            {/* Error table */}
            {errorRows.length > 0 && (
                <Card className="p-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
                    <div className="p-4 border-b border-slate-100 bg-rose-50/50 flex items-center justify-between gap-3">
                        <div>
                            <h3 className="text-base font-bold text-rose-800 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                {errorRows.length} Row{errorRows.length > 1 ? 's' : ''} with Issues
                            </h3>
                            <p className="text-xs text-rose-600 mt-0.5">Fix inline then re-upload, or download to fix in Excel.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={downloadErrors}>↓ Download</Button>
                            <Button size="sm" variant="warning" onClick={handleRetry} isLoading={retryLoading} disabled={retryLoading}>↺ Re-upload</Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs font-medium">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-3 py-2.5 text-left text-slate-600 font-bold uppercase tracking-wide">Row</th>
                                    {errorColumns.map(c => (
                                        <th key={c.key} className={`px-3 py-2.5 text-left text-slate-600 font-bold uppercase tracking-wide whitespace-nowrap ${c.width ?? ''}`}>{c.label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {editedRows.map((row, idx) => (
                                    <React.Fragment key={idx}>
                                        <tr className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                                            <td className="px-3 py-2 text-slate-500">
                                                <span className="flex items-center gap-1 font-medium">
                                                    {(row._issues ?? []).length > 0 && <span className="text-rose-500">⚠</span>}
                                                    #{row._rowNum || idx + 2}
                                                </span>
                                            </td>
                                            {errorColumns.map(c => (
                                                <td key={c.key} className="px-3 py-2 min-w-[100px]">
                                                    <input
                                                        className={cellInput}
                                                        value={row[c.key] ?? ''}
                                                        onChange={e => updateCell(idx, c.key, e.target.value)}
                                                        list={hints[c.key] ? `hint-${c.key}-${idx}` : undefined}
                                                    />
                                                    {hints[c.key] && (
                                                        <datalist id={`hint-${c.key}-${idx}`}>
                                                            {hints[c.key].map(h => <option key={h} value={h} />)}
                                                        </datalist>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                        {(row._issues ?? []).length > 0 && (
                                            <tr className="bg-rose-50/50 border-b border-rose-100">
                                                <td className="px-3 pb-2 pt-0"></td>
                                                <td colSpan={errorColumns.length} className="px-3 pb-2 pt-0">
                                                    <div className="flex flex-wrap gap-1">
                                                        {(row._issues ?? []).map((issue: string, ii: number) => (
                                                            <span key={ii} className="inline-block bg-rose-100 text-rose-700 rounded-md px-1.5 py-0.5 text-[10px] font-semibold">{issue}</span>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
}
