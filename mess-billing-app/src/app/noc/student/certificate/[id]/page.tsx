'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { Card } from '../../../../../components/ui/Card';

function CertificateContent({ params }: { params: Promise<{ id: string }> }) {
    const searchParams = useSearchParams();
    const rollNo = searchParams.get('rollNo');
    const getLink = (path: string) => rollNo ? `${path}?rollNo=${rollNo}` : path;

    const [cert, setCert] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [appId, setAppId] = useState<string>('');

    useEffect(() => {
        params.then(p => {
            setAppId(p.id);
            fetch(`/api/noc/certificate/${p.id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Certificate not found');
                    return res.json();
                })
                .then(data => setCert(data))
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        });
    }, [params]);

    if (loading) return <div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading certificate...</div>;
    if (error) return (
        <div className="text-center mt-20">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"><svg className="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Certificate Not Available</h3>
            <p className="text-slate-500">{error}</p>
        </div>
    );

    const student = cert?.application?.student;

    return (
        <>
            {/* Print-only styles — aggressively hide the sidebar/header and show only the certificate */}
            <style jsx global>{`
                @media print {
                    /* Hide the sidebar, nav, and everything outside the certificate */
                    aside,
                    nav,
                    header,
                    footer,
                    .no-print {
                        display: none !important;
                    }

                    /* Reset the flex layout so main takes full width */
                    body,
                    body > div,
                    body > div > div,
                    body > div > div > div,
                    body > div > div > div > div {
                        display: block !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        overflow: visible !important;
                        height: auto !important;
                        min-height: 0 !important;
                    }

                    main,
                    main > div {
                        display: block !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        overflow: visible !important;
                        height: auto !important;
                    }

                    /* The certificate card itself */
                    #certificate-print-area {
                        width: 100% !important;
                        max-width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                        border-radius: 0 !important;
                        break-inside: avoid;
                    }

                    /* Reset background gradients for print */
                    #certificate-print-area .cert-header {
                        background: white !important;
                    }

                    /* Ensure text is dark and visible */
                    #certificate-print-area * {
                        color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    /* Page setup */
                    @page {
                        margin: 20mm;
                        size: A4 portrait;
                    }
                }
            `}</style>

            <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
                {/* Breadcrumb - hidden on print */}
                <div className="flex items-center gap-3 no-print">
                    <Link href={getLink('/noc/student/dashboard')} className="text-slate-400 hover:text-emerald-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </Link>
                    <span className="text-sm text-slate-400 font-medium">My Applications</span>
                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    <span className="text-sm text-slate-700 font-semibold">Certificate</span>
                </div>

                {/* Certificate Document — this is the printable area */}
                <Card id="certificate-print-area" className="p-0 overflow-hidden max-w-3xl mx-auto border border-slate-200 shadow-lg">
                    {/* Header */}
                    <div className="cert-header bg-gradient-to-b from-slate-100/80 to-white p-8 text-center border-b border-slate-200">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mb-1">Indian Institute of Technology Ropar</h2>
                        <p className="text-[10px] text-slate-400 font-medium tracking-wider">RUPNAGAR, PUNJAB - 140001</p>
                        <div className="flex justify-between items-center mt-4 text-xs text-slate-500 font-medium px-4">
                            <span>File No.: {cert?.fileNo || '—'}</span>
                            <span>Date: {cert?.issueDate ? new Date(cert.issueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</span>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 md:p-12">
                        <h3 className="text-center text-lg font-bold text-slate-800 underline underline-offset-4 mb-8 tracking-wide">TO WHOMSOEVER IT MAY CONCERN</h3>

                        <p className="text-slate-700 leading-relaxed text-[15px] font-medium whitespace-pre-line">
                            {cert?.certifiedText}
                        </p>
                    </div>

                    {/* Signature */}
                    <div className="px-8 md:px-12 pb-10">
                        <div className="flex justify-end">
                            <div className="text-center">
                                {cert?.signatureData ? (
                                    <div className="mb-2">
                                        <img src={cert.signatureData} alt="Signature" className="h-16 max-w-[180px] mx-auto object-contain" />
                                    </div>
                                ) : (
                                    <div className="w-32 border-b border-slate-300 mb-2"></div>
                                )}
                                <div className="border-t border-slate-300 pt-2">
                                    <p className="text-sm font-bold text-slate-800">Authorised Signatory</p>
                                    <p className="text-xs text-slate-500 font-medium">Academics</p>
                                    <p className="text-xs text-slate-500 font-medium mt-1">{cert?.signedBy}</p>
                                    <p className="text-[10px] text-slate-400 font-medium mt-1">Indian Institute of Technology Ropar</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Approval Trail — hidden on print */}
                    <div className="border-t border-slate-200 bg-slate-50/40 p-6 no-print">
                        <h4 className="text-sm font-bold text-slate-700 mb-4">Verification Trail</h4>
                        <div className="space-y-3">
                            {cert?.application?.actions?.map((action: any, i: number) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${action.action === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.action === 'VERIFIED' ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"}></path></svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-800">{action.officer?.name} <span className="text-slate-400 font-normal">({action.officer?.role?.replace(/_/g, ' ')})</span></p>
                                        <p className="text-xs text-slate-500">{new Date(action.timestamp).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${action.action === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                        {action.action}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Print button — hidden on print */}
                <div className="text-center no-print">
                    <button 
                        onClick={() => window.print()} 
                        className="inline-flex items-center gap-2 bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl hover:bg-slate-900 transition-all shadow-md"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Print Certificate
                    </button>
                </div>
            </div>
        </>
    );
}

export default function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<div className="text-center mt-10 text-slate-500 font-medium animate-pulse">Loading certificate...</div>}>
            <CertificateContent params={params} />
        </Suspense>
    );
}
