'use client';
import { useState, useEffect, useRef } from 'react';
import { Card } from '../../../../components/ui/Card';

const AVAILABLE_COLUMNS = [
    { key: 'Course', label: 'Course' },
    { key: 'Batch', label: 'Batch' },
    { key: 'Hostel', label: 'Hostel' },
    { key: 'Mess', label: 'Mess' },
    { key: 'Mess Security', label: 'Mess Security' },
    { key: 'Address', label: 'Address' },
    { key: 'Gender', label: 'Gender' },
    { key: 'Mobile No', label: 'Mobile No' },
    { key: 'Name in Bank', label: 'Name in Bank' },
    { key: 'Parent Mobile No', label: 'Parent Mobile' },
    { key: 'Date of Joining', label: 'Date of Joining' },
    { key: 'Date of Leaving', label: 'Date of Leaving' },
    { key: 'Left Date', label: 'Left Date (Session)' },
    { key: 'Department', label: 'Department' },
    { key: 'JoSAA Roll No', label: 'JoSAA Roll No' },
    { key: 'Bank Account No', label: 'Bank Account No' },
    { key: 'Bank Name', label: 'Bank Name' },
    { key: 'IFSC', label: 'IFSC Code' },
    { key: 'Rebate Days', label: 'Rebate Days (Per Month)' },
];

const FILTERABLE_COLUMNS = ['Course', 'Batch', 'Hostel', 'Mess', 'Gender', 'Department', 'Bank Name'];

function MultiSelectFilter({ label, options, selected, onSelectionChange }: {
    label: string;
    options: string[];
    selected: Set<string>;
    onSelectionChange: (newSet: Set<string>) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const isFiltered = selected.size > 0 && selected.size < options.length;
    const allSelected = selected.size === 0 || selected.size === options.length;

    return (
        <div ref={ref} className="relative">
            <button onClick={() => setOpen(!open)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${isFiltered
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}>
                {label}
                {isFiltered && (
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">{selected.size}</span>
                )}
                <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && (
                <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-3 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => onSelectionChange(new Set(options))} className="text-[10px] uppercase font-bold text-indigo-600 hover:text-indigo-800">All</button>
                            <span className="text-slate-300">|</span>
                            <button onClick={() => onSelectionChange(new Set())} className="text-[10px] uppercase font-bold text-slate-500 hover:text-slate-800">Clear</button>
                        </div>
                    </div>
                    <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                        {options.map(opt => {
                            const isChecked = selected.size === 0 ? true : selected.has(opt);
                            return (
                                <label key={opt} className="flex items-center gap-2.5 cursor-pointer py-1 px-1 rounded-lg hover:bg-slate-50 group">
                                    <div className="relative flex items-center">
                                        <input type="checkbox" className="peer sr-only" checked={isChecked} onChange={(e) => {
                                            const newSet = new Set(selected.size === 0 ? options : selected);
                                            if (e.target.checked) newSet.add(opt); else newSet.delete(opt);
                                            // If all selected, reset to empty (means "all")
                                            if (newSet.size === options.length) onSelectionChange(new Set());
                                            else onSelectionChange(newSet);
                                        }} />
                                        <div className="w-3.5 h-3.5 border-2 border-slate-300 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-600 flex items-center justify-center transition-colors">
                                            <svg className={`w-2 h-2 text-white ${isChecked ? 'block' : 'hidden'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                    </div>
                                    <span className={`text-xs truncate ${isChecked ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>{opt || '(empty)'}</span>
                                </label>
                            );
                        })}
                        {options.length === 0 && <p className="text-xs text-slate-400 text-center py-2">No values</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ConsolidatedViewPage() {
    const [reportData, setReportData] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [sessions, setSessions] = useState<any[]>([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCols, setSelectedCols] = useState<Set<string>>(new Set(AVAILABLE_COLUMNS.map(c => c.key)));
    const [showColDropdown, setShowColDropdown] = useState(false);

    // Filters: key = column name (e.g. 'Course'), value = Set of selected values. Empty set = all selected.
    const [filters, setFilters] = useState<Record<string, Set<string>>>({});
    // Balance filter: 'all' | 'positive' | 'negative'
    const [balanceFilter, setBalanceFilter] = useState<'all' | 'positive' | 'negative'>('all');

    useEffect(() => {
        fetch('/api/sessions').then(r => r.json()).then(d => setSessions(Array.isArray(d) ? d : []));
    }, []);

    const fetchReport = async (sessionId: string) => {
        if (!sessionId) {
            setReportData([]);
            setColumns([]);
            return;
        }

        setLoading(true);
        setFilters({}); // Reset filters on session change
        setBalanceFilter('all');
        try {
            const res = await fetch(`/api/reports/consolidated-view?sessionId=${sessionId}`);
            const json = await res.json();
            if (json && json.data && json.columns) {
                setReportData(json.data);
                setColumns(json.columns);
            } else {
                setReportData([]);
                setColumns([]);
            }
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchReport(selectedSession); }, [selectedSession]);

    // Compute unique values for each filterable column from the full data
    const filterOptions: Record<string, string[]> = {};
    for (const col of FILTERABLE_COLUMNS) {
        const vals = new Set<string>();
        reportData.forEach(row => {
            const v = row[col];
            if (v && v !== '-') vals.add(String(v));
        });
        filterOptions[col] = Array.from(vals).sort();
    }

    const updateFilter = (col: string, newSet: Set<string>) => {
        setFilters(prev => ({ ...prev, [col]: newSet }));
    };

    // Apply search + filters
    const filteredData = reportData.filter(item => {
        // Search filter
        const matchesSearch =
            (item['Name'] || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item['Entry No'] || '').toLowerCase().includes(searchTerm.toLowerCase());
        if (!matchesSearch) return false;

        // Column filters
        for (const col of FILTERABLE_COLUMNS) {
            const filterSet = filters[col];
            if (filterSet && filterSet.size > 0) {
                const val = String(item[col] ?? '-');
                if (!filterSet.has(val)) return false;
            }
        }

        // Balance filter
        if (balanceFilter !== 'all') {
            const balance = item['Net Balance (₹)'];
            if (typeof balance === 'number') {
                if (balanceFilter === 'positive' && balance < 0) return false;
                if (balanceFilter === 'negative' && balance >= 0) return false;
            }
        }

        return true;
    });

    const displayColumns = columns.filter(c => {
        if (['Entry No', 'Name'].includes(c)) return true;
        if (c.includes('Amount') || c.includes('Balance') || c.includes('Fees') || c.includes('Refund')) return true;
        if (c.includes('Rebate Days')) return selectedCols.has('Rebate Days');
        return selectedCols.has(c);
    });

    const handleExport = () => {
        if (!displayColumns.length) return;
        const csv = [
            displayColumns.map(c => `"${c}"`).join(','),
            ...filteredData.map(row => displayColumns.map(c => `"${row[c] ?? ''}"`).join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url; link.download = 'consolidated_report.csv';
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
    };

    const activeFilterCount = Object.values(filters).filter(s => s.size > 0).length + (balanceFilter !== 'all' ? 1 : 0);

    return (
        <div className="max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Consolidated Session Report</h1>
                    <p className="text-slate-500 mt-1 font-medium">Dynamic, complete billing overview matching the Excel export.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <select value={selectedSession} onChange={e => setSelectedSession(e.target.value)}
                        className="border border-slate-200 bg-white px-3 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm">
                        <option value="">-- Select a Session --</option>
                        {sessions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>

                    {selectedSession && (
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" placeholder="Search student…"
                                className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm w-48 font-medium"
                                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>
                    )}

                    {selectedSession && (
                        <div className="relative">
                            <button onClick={() => setShowColDropdown(!showColDropdown)}
                                className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50 font-medium text-sm transition-all flex items-center gap-2 shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                Columns
                            </button>
                            {showColDropdown && (
                                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-xs font-bold text-slate-800 uppercase">Visible Columns</h3>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setSelectedCols(new Set(AVAILABLE_COLUMNS.map(c => c.key)))} className="text-[10px] uppercase font-bold text-indigo-600 hover:text-indigo-800">All</button>
                                            <span className="text-slate-300">|</span>
                                            <button onClick={() => setSelectedCols(new Set())} className="text-[10px] uppercase font-bold text-slate-500 hover:text-slate-800">Clear</button>
                                        </div>
                                    </div>
                                    <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                                        {AVAILABLE_COLUMNS.map(col => {
                                            const isChecked = selectedCols.has(col.key);
                                            return (
                                                <label key={col.key} className="flex items-center gap-3 cursor-pointer group">
                                                    <div className="relative flex items-center">
                                                        <input type="checkbox" className="peer sr-only" checked={isChecked} onChange={(e) => {
                                                            const newSet = new Set(selectedCols);
                                                            if (e.target.checked) newSet.add(col.key); else newSet.delete(col.key);
                                                            setSelectedCols(newSet);
                                                        }} />
                                                        <div className="w-4 h-4 border-2 border-slate-300 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-600 flex items-center justify-center transition-colors">
                                                            <svg className={`w-2.5 h-2.5 text-white ${isChecked ? 'block' : 'hidden'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                                        </div>
                                                    </div>
                                                    <span className={`text-sm tracking-tight ${isChecked ? 'text-slate-800 font-medium' : 'text-slate-500 group-hover:text-slate-700'}`}>{col.label}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {selectedSession && (
                        <button onClick={handleExport}
                            className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2.5 rounded-xl hover:bg-emerald-100 font-semibold text-sm transition-all flex items-center gap-2 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Export CSV
                        </button>
                    )}

                    <a href="/admin/reports" className="text-slate-500 hover:text-indigo-600 font-medium text-sm flex items-center gap-1 transition-colors px-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back
                    </a>
                </div>
            </div>

            {/* Filter Bar */}
            {selectedSession && reportData.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                        Filters
                    </div>
                    {FILTERABLE_COLUMNS.map(col => (
                        <MultiSelectFilter
                            key={col}
                            label={col}
                            options={filterOptions[col] || []}
                            selected={filters[col] || new Set()}
                            onSelectionChange={(s) => updateFilter(col, s)}
                        />
                    ))}

                    {/* Balance Filter */}
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                        {(['all', 'positive', 'negative'] as const).map(opt => (
                            <button key={opt} onClick={() => setBalanceFilter(opt)}
                                className={`px-3 py-2 text-xs font-semibold transition-colors ${
                                    balanceFilter === opt
                                        ? opt === 'positive' ? 'bg-emerald-100 text-emerald-700'
                                        : opt === 'negative' ? 'bg-rose-100 text-rose-700'
                                        : 'bg-slate-100 text-slate-700'
                                        : 'text-slate-500 hover:bg-slate-50'
                                }`}>
                                {opt === 'all' ? 'All' : opt === 'positive' ? 'Bal +ve' : 'Bal −ve'}
                            </button>
                        ))}
                    </div>

                    {activeFilterCount > 0 && (
                        <button onClick={() => { setFilters({}); setBalanceFilter('all'); }}
                            className="text-xs font-bold text-rose-600 hover:text-rose-800 px-2 py-1.5 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            Clear All ({activeFilterCount})
                        </button>
                    )}
                    <span className="text-xs text-slate-400 font-medium ml-auto">{filteredData.length} of {reportData.length} students</span>
                </div>
            )}

            <Card className="p-0 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex flex-col items-center justify-center text-slate-400">
                        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        <p className="font-medium animate-pulse">Calculating comprehensive billing report…</p>
                    </div>
                ) : !selectedSession ? (
                    <div className="p-16 text-center text-slate-500">
                        <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <p className="text-lg font-medium text-slate-600">Please select a session from the dropdown to view the report.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="min-w-full text-left border-collapse text-sm whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    {displayColumns.map(c => {
                                        // Auto-color the headers to make them readable
                                        const isRebate = c.includes('Rebate');
                                        const isAmount = c.includes('Amount');
                                        const isFees = c.includes('Fees');
                                        const isRefund = c.includes('Refund');
                                        const isTotal = c.startsWith('Total');
                                        const isBal = c.includes('Balance');
                                        
                                        let bgClass = '';
                                        if (isBal) bgClass = 'bg-blue-50/70 text-blue-800';
                                        else if (isTotal && isRefund) bgClass = 'bg-rose-50/60 text-rose-800';
                                        else if (isTotal && isAmount) bgClass = 'bg-rose-50/60 text-rose-800';
                                        else if (isTotal && isFees) bgClass = 'bg-teal-50/60 text-teal-800';
                                        else if (isRebate) bgClass = 'bg-amber-50/50 text-amber-800';
                                        else if (isAmount) bgClass = 'bg-indigo-50/50 text-indigo-800';

                                        return <th key={c} className={`p-4 ${bgClass}`}>{c}</th>;
                                    })}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredData.map((row, idx) => (
                                    <tr key={row.id || idx} className="hover:bg-slate-50/80 transition-colors">
                                        {displayColumns.map((c, colIdx) => {
                                            const val = row[c];
                                            const isSummary = c.startsWith('Total') || c.includes('Balance');
                                            const isBal = c.includes('Balance');
                                            const isAmountCol = typeof val === 'number' && (c.includes('₹') || c.includes('Security'));
                                            
                                            // Make Entry No bold
                                            if (c === 'Entry No') {
                                                return <td key={colIdx} className="p-4 font-bold text-slate-800">{val}</td>;
                                            }
                                            // Handle numbers formatting
                                            if (isAmountCol) {
                                                const formatted = `₹${val.toLocaleString(undefined, { minimumFractionDigits: isSummary ? 0 : 2 })}`;
                                                const classes = `p-4 text-right font-mono text-xs ${isBal ? (val < 0 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold') : isSummary ? 'font-bold text-slate-700 bg-slate-50/50' : 'text-slate-600'}`;
                                                return <td key={colIdx} className={classes}>{formatted}</td>;
                                            }
                                            if (c.includes('Rebate Days') && typeof val === 'number') {
                                                return <td key={colIdx} className="p-4 text-right font-medium text-amber-700 bg-amber-50/20">{val > 0 ? `${val}d` : '-'}</td>;
                                            }

                                            return <td key={colIdx} className={`p-4 ${isSummary ? 'font-bold bg-slate-50/30' : 'text-slate-700 font-medium'}`}>{val ?? '-'}</td>;
                                        })}
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan={displayColumns.length || 10} className="p-8 text-center text-slate-500">
                                            <p className="text-lg font-medium text-slate-700">No records found matching search</p>
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
