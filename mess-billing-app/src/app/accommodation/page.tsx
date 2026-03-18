'use client';

import Link from 'next/link';
import { BrandLogo } from '@/components/ui/BrandLogo';

export default function AccommodationPortalHome() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-y-auto">
      <div className="max-w-6xl w-full mx-auto pb-10">
        
        <div className="flex justify-between items-center mb-10 w-full max-w-4xl mx-auto px-6">
          <BrandLogo />
          <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-800 bg-white shadow-sm border border-slate-200 px-5 py-2.5 rounded-full transition-all hover:shadow-md">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Institute Portals
          </Link>
        </div>

        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
             Accommodation <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Central Portal</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium mt-6">
            Secure, centralized gateway for temporary institute stay applications and institutional authority clearances.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* APPLICANT SECTION */}
           <div className="lg:col-span-5 flex flex-col">
              <Link href="/accommodation/login" className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(16,185,129,0.12)] transition-all duration-300 relative overflow-hidden flex-1 group block cursor-pointer">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 border border-emerald-100">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">Student / Scholar</h2>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed text-lg">
                      Log in to submit your accommodation request, track your clearance status, and download your final allotment.
                    </p>
                    <div className="inline-flex mt-auto w-full justify-center items-center bg-emerald-600 text-white font-bold py-4 rounded-xl group-hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200">
                       ACCESS APPLICANT DASHBOARD
                       <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                 </div>
              </Link>
           </div>

           {/* AUTHORITIES SECTION */}
           <div className="lg:col-span-7 flex flex-col">
              <div className="bg-slate-800 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex-1 border border-slate-700">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-8">
                       <h2 className="text-3xl font-extrabold text-white mb-3">Institutional Authorities</h2>
                       <p className="text-slate-400 font-medium text-lg">Select your designated role to review, verify, and approve pending requests within your jurisdiction.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                       
                       {/* Mentor Portal Button */}
                       <Link href="/accommodation/reviewer-login?role=FACULTY" className="group bg-slate-700/50 hover:bg-blue-600 p-5 rounded-2xl border border-slate-600 hover:border-blue-500 transition-all duration-300 flex items-center">
                          <div className="w-12 h-12 bg-slate-800 group-hover:bg-blue-700 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-white transition-colors mr-4 shrink-0 shadow-inner">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                          </div>
                          <div>
                             <div className="text-white font-bold text-lg group-hover:translate-x-1 transition-transform">Faculty PI / Mentor</div>
                             <div className="text-slate-400 text-xs font-semibold group-hover:text-blue-200 mt-0.5">Primary Verification</div>
                          </div>
                       </Link>

                       {/* HOD Portal Button */}
                       <Link href="/accommodation/reviewer-login?role=HOD" className="group bg-slate-700/50 hover:bg-fuchsia-600 p-5 rounded-2xl border border-slate-600 hover:border-fuchsia-500 transition-all duration-300 flex items-center">
                          <div className="w-12 h-12 bg-slate-800 group-hover:bg-fuchsia-700 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-white transition-colors mr-4 shrink-0 shadow-inner">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                          </div>
                          <div>
                             <div className="text-white font-bold text-lg group-hover:translate-x-1 transition-transform">Head of Dept.</div>
                             <div className="text-slate-400 text-xs font-semibold group-hover:text-fuchsia-200 mt-0.5">Departmental Approval</div>
                          </div>
                       </Link>

                       {/* Registrar Portal Button */}
                       <Link href="/accommodation/reviewer-login?role=REGISTRAR" className="group bg-slate-700/50 hover:bg-violet-600 p-5 rounded-2xl border border-slate-600 hover:border-violet-500 transition-all duration-300 flex items-center">
                          <div className="w-12 h-12 bg-slate-800 group-hover:bg-violet-700 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-white transition-colors mr-4 shrink-0 shadow-inner">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          </div>
                          <div>
                             <div className="text-white font-bold text-lg group-hover:translate-x-1 transition-transform">Asst. Registrar</div>
                             <div className="text-slate-400 text-xs font-semibold group-hover:text-violet-200 mt-0.5">Administrative Clerance</div>
                          </div>
                       </Link>

                       {/* Warden Portal Button */}
                       <Link href="/accommodation/reviewer-login?role=WARDEN" className="group bg-slate-700/50 hover:bg-orange-600 p-5 rounded-2xl border border-slate-600 hover:border-orange-500 transition-all duration-300 flex items-center">
                          <div className="w-12 h-12 bg-slate-800 group-hover:bg-orange-700 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-white transition-colors mr-4 shrink-0 shadow-inner">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                          </div>
                          <div>
                             <div className="text-white font-bold text-lg group-hover:translate-x-1 transition-transform">Chief Warden</div>
                             <div className="text-slate-400 text-xs font-semibold group-hover:text-orange-200 mt-0.5">Final Accommodation</div>
                          </div>
                       </Link>

                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
