'use client';

import Link from 'next/link';
import { Card } from '../../../components/ui/Card';

export default function ApplySelection() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Link href="/accommodation/dashboard" className="text-slate-400 hover:text-emerald-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </Link>
          <span className="text-sm text-slate-400 font-medium">Dashboard</span>
          <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="text-sm text-slate-700 font-semibold">New Application</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Select Application Type</h1>
        <p className="text-slate-500 mt-2 font-medium">Choose the correct category for your accommodation request at IIT Ropar Hostels.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Summer Intern */}
        <Link href="/accommodation/apply/intern" className="block group">
          <Card className="p-0 overflow-hidden border-2 border-transparent hover:border-emerald-400 transition-all duration-300 h-full" hoverEffect={true}>
            <div className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
            <div className="p-8 flex flex-col h-full">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-emerald-100">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-xl font-extrabold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">Summer Internship Student</h2>
              <p className="text-slate-500 mb-6 flex-1 text-sm font-medium leading-relaxed">For students currently undergoing their summer internship programs at IIT Ropar. Requires Faculty Mentor approval.</p>
              <div className="inline-flex items-center text-emerald-600 font-bold text-sm">
                Apply Now
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          </Card>
        </Link>

        {/* Project Staff */}
        <Link href="/accommodation/apply/staff" className="block group">
          <Card className="p-0 overflow-hidden border-2 border-transparent hover:border-teal-400 transition-all duration-300 h-full" hoverEffect={true}>
            <div className="h-2 bg-gradient-to-r from-teal-400 to-teal-600"></div>
            <div className="p-8 flex flex-col h-full">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-teal-100">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-extrabold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors">Project Staff & JRF / Post Doc</h2>
              <p className="text-slate-500 mb-6 flex-1 text-sm font-medium leading-relaxed">For all Project Staff, JRFs, SRFs, RAs, Post Docs, and general Visiting Scholars requiring temporary stay.</p>
              <div className="inline-flex items-center text-teal-600 font-bold text-sm">
                Apply Now
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
