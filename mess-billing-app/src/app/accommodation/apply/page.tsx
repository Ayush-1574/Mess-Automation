'use client';

import Link from 'next/link';

export default function ApplySelection() {
  return (
    <div className="min-h-screen bg-slate-50 relative py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[32rem] bg-emerald-600 rounded-b-[4rem] z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-32 -left-24 w-72 h-72 bg-teal-500 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center justify-center mb-12 text-white text-center">
          <Link href="/accommodation/dashboard" className="flex items-center text-emerald-100 hover:text-white font-medium mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Select Application Type</h1>
          <p className="mt-4 text-emerald-100 font-medium text-lg max-w-2xl">
            Choose the correct category for your accommodation request at IIT Ropar Hostels to proceed to the specific form.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Summer Intern */}
          <Link href="/accommodation/apply/intern" className="group relative bg-white rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 flex flex-col items-center text-center">
            <div className="absolute top-0 inset-x-0 h-2 bg-emerald-500 rounded-t-3xl"></div>
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
               </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Summer Internship Student</h2>
            <p className="text-slate-500 mb-6 flex-1 text-sm font-medium">For students currently undergoing their summer internship programs at IIT Ropar. Requires a Mentor approval.</p>
            <div className="inline-flex items-center text-emerald-600 font-bold group-hover:text-emerald-700">
              Apply Now 
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </Link>

          {/* Project Staff */}
          <Link href="/accommodation/apply/staff" className="group relative bg-white rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 flex flex-col items-center text-center">
            <div className="absolute top-0 inset-x-0 h-2 bg-teal-500 rounded-t-3xl"></div>
            <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Project Staff & JRF / Post Doc</h2>
            <p className="text-slate-500 mb-6 flex-1 text-sm font-medium">For all Project Staff, JRFs, SRFs, RAs, Post Docs, and general Visiting Scholars requiring temporary stay.</p>
            <div className="inline-flex items-center text-teal-600 font-bold group-hover:text-teal-700">
              Apply Now 
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
