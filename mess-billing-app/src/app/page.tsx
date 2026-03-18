'use client';
import Link from 'next/link';

export default function PortalLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-80 bg-indigo-600 rounded-b-[4rem] z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-32 -left-24 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 drop-shadow-md">
            Hostel Services Portal
          </h1>
          <p className="mt-4 text-indigo-100 font-medium text-lg md:text-xl max-w-2xl mx-auto drop-shadow">
            Streamlined digital platforms for managing mess rebates and student accommodation requests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Main Mess Module Card */}
          <Link href="/login" className="group block">
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              
              <div className="p-10 flex-grow content-center text-center items-center flex flex-col justify-center">
                <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-inner transform group-hover:rotate-6 transition-transform">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                <h2 className="text-3xl font-extrabold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">Mess & Rebates</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">
                  Manage monthly bills, view attendance, apply for rebates, and review comprehensive financial data.
                </p>
                
                <span className="inline-flex items-center text-indigo-600 font-bold text-lg bg-indigo-50 px-6 py-3 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  Access Portal
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          {/* Accommodation Card */}
          <Link href="/accommodation" className="group block">
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              
              <div className="p-10 flex-grow content-center text-center items-center flex flex-col justify-center">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-inner transform group-hover:-rotate-6 transition-transform">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                
                <h2 className="text-3xl font-extrabold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors">Accommodation</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed mb-8">
                  Submit forms for temporary stays, internships, and project staffing. Verified systematically by authorities.
                </p>
                
                <span className="inline-flex items-center text-emerald-600 font-bold text-lg bg-emerald-50 px-6 py-3 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  Access Portal
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

        </div>

        <div className="text-center mt-16 text-slate-500 font-medium pb-8 border-t border-slate-200/60 pt-8">
          &copy; {new Date().getFullYear()} Mess & Accommodation Authorities. All rights reserved.
        </div>
      </div>
    </div>
  );
}
