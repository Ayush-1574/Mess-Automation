'use client';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';

function ApplyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const rollNo = searchParams.get('rollNo');
    const getLink = (path: string) => rollNo ? `${path}?rollNo=${rollNo}` : path;

    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const [certificateType, setCertificateType] = useState('');
    const [purpose, setPurpose] = useState('');
    const [otherDetails, setOtherDetails] = useState('');

    useEffect(() => {
        if (rollNo) {
            fetch(`/api/noc/student/${rollNo}`)
                .then(res => {
                    if (!res.ok) throw new Error('Student not found');
                    return res.json();
                })
                .then(data => setStudent(data))
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setError('No roll number provided');
        }
    }, [rollNo]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!certificateType || !purpose) return;
        setSubmitting(true);

        try {
            const res = await fetch('/api/noc/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rollNo,
                    certificateType,
                    purpose,
                    otherDetails: certificateType === 'OTHER' ? otherDetails : null,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Submission failed');
            }

            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading form...</div>;
    if (error && !student) return (
        <div className="text-center mt-20">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"><svg className="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Error</h3>
            <p className="text-slate-500">{error}</p>
        </div>
    );

    if (submitted) {
        return (
            <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
                <Card className="p-0 overflow-hidden max-w-2xl mx-auto">
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-1 ring-emerald-100">
                            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-3">Application Submitted!</h2>
                        <p className="text-slate-500 font-medium max-w-sm mx-auto mb-8">Your certificate application has been submitted for review. You can track its status from your dashboard.</p>
                        <Link href={getLink('/noc/student/dashboard')}>
                            <Button variant="secondary">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
            {/* Header with breadcrumb */}
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <Link href={getLink('/noc/student/dashboard')} className="text-slate-400 hover:text-emerald-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </Link>
                    <span className="text-sm text-slate-400 font-medium">My Applications</span>
                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    <span className="text-sm text-slate-700 font-semibold">New Application</span>
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">New Certificate Application</h1>
                <p className="text-slate-500 mt-2 font-medium">Fill in the details below to apply for a certificate.</p>
            </div>

            {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-medium text-sm">{error}</div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form */}
                <div className="lg:col-span-2">
                    <Card className="p-0 overflow-hidden border border-slate-200/60 shadow-md">
                        <div className="p-6 border-b border-slate-100/50 flex items-center gap-3 bg-gradient-to-r from-emerald-50/50 to-transparent">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shadow-inner border border-emerald-100/50">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Application Form</h2>
                                <p className="text-xs text-slate-500 font-medium">Bonafide / Character / Fee Structure / Other Certificate</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Student Info - Read Only */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Name', value: student?.name },
                                    { label: 'Entry No.', value: student?.rollNo },
                                    { label: "Father's Name", value: student?.fatherName },
                                    { label: 'Gender', value: student?.gender },
                                    { label: 'Department', value: student?.department },
                                    { label: 'Course', value: student?.course },
                                    { label: 'Category', value: student?.category },
                                    { label: 'Batch', value: student?.batch },
                                    { label: 'Hostel', value: student?.hostel },
                                    { label: 'Room No.', value: student?.roomNo },
                                    { label: 'Phone', value: student?.phone },
                                    { label: 'Email', value: student?.email },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</label>
                                        <div className="w-full bg-slate-50/80 border border-slate-200/60 px-4 py-2.5 rounded-xl text-slate-700 font-medium text-sm">
                                            {value || 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-slate-100" />

                            {/* Certificate Type */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Certificate Type <span className="text-rose-500">*</span></label>
                                <select
                                    value={certificateType}
                                    onChange={(e) => setCertificateType(e.target.value)}
                                    required
                                    className="w-full appearance-none bg-white/80 border border-slate-200/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 hover:border-emerald-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 cursor-pointer"
                                >
                                    <option value="">Select certificate type</option>
                                    <option value="BONAFIDE">Bonafide Certificate</option>
                                    <option value="CHARACTER">Character Certificate</option>
                                    <option value="FEE_STRUCTURE">Fee Structure Certificate</option>
                                    <option value="OTHER">Other Certificate</option>
                                </select>
                            </div>

                            {certificateType === 'OTHER' && (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Specify Certificate Type <span className="text-rose-500">*</span></label>
                                    <input
                                        type="text"
                                        value={otherDetails}
                                        onChange={(e) => setOtherDetails(e.target.value)}
                                        required
                                        className="w-full bg-white/80 border border-slate-200/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 hover:border-emerald-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
                                        placeholder="e.g. Migration Certificate"
                                    />
                                </div>
                            )}

                            {/* Purpose */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Purpose <span className="text-rose-500">*</span></label>
                                <textarea
                                    value={purpose}
                                    onChange={(e) => setPurpose(e.target.value)}
                                    rows={3}
                                    required
                                    className="w-full bg-white/80 border border-slate-200/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 hover:border-emerald-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 placeholder:text-slate-400 resize-none"
                                    placeholder="e.g. apply for Railway Pass, apply for Passport..."
                                />
                            </div>

                            {/* Info */}
                            <div className="flex items-start gap-3 p-4 bg-amber-50/80 border border-amber-200/60 rounded-xl">
                                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <p className="text-sm text-amber-800 font-medium">Your application will be reviewed by: Admin Officer → Joint Superintendent → Assistant Registrar.</p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-2">
                                <Link href={getLink('/noc/student/dashboard')}>
                                    <Button variant="secondary" type="button">Cancel</Button>
                                </Link>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform transition-all active:scale-[0.98] shadow-md shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                            Submit Application
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-4">
                    <Card className="p-5 bg-gradient-to-br from-emerald-50/50 to-white border-emerald-100/50">
                        <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Approval Process
                        </h3>
                        <div className="space-y-3">
                            {['Admin Officer reviews', 'Joint Superintendent verifies', 'Asst. Registrar stamps & signs', 'Certificate generated'].map((step, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                                    <span className="text-sm text-slate-600 font-medium">{step}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-5 bg-gradient-to-br from-blue-50/50 to-white border-blue-100/50">
                        <h3 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Processing Time
                        </h3>
                        <p className="text-sm text-slate-500 font-medium">Usually takes 2-3 working days for complete processing.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function NocStudentApply() {
    return (
        <Suspense fallback={<div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading form...</div>}>
            <ApplyContent />
        </Suspense>
    );
}
