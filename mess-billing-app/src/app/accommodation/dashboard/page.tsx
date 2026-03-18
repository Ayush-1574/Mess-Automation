'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ApplicantDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch('/api/accommodation/requests');
        if (res.ok) {
          const data = await res.json();
          setRequests(data.requests);
        }
      } catch (e) {
        console.error("Failed to load requests", e);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-80 bg-emerald-600 rounded-b-[4rem] z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-32 -left-24 w-72 h-72 bg-teal-500 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 text-white">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">My Stay Applications</h1>
            <p className="mt-2 text-emerald-100 font-medium text-lg">Manage your accommodation applications</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
             <Link href="/" className="bg-white/20 text-white font-medium py-3 px-6 rounded-xl hover:bg-white/30 backdrop-blur-md transition-all active:scale-95 shadow-md flex items-center border border-white/30 justify-center">
               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
               </svg>
               Logout
             </Link>
             <Link href="/accommodation/apply" className="bg-white text-emerald-600 font-bold py-3 px-6 rounded-xl hover:bg-emerald-50 hover:shadow-lg transition-all active:scale-95 shadow-md flex items-center justify-center">
               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
               </svg>
               New Application
             </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 sm:p-10 min-h-[50vh]">
          {loading ? (
             <div className="flex items-center justify-center p-20">
                <svg className="animate-spin h-10 w-10 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
             </div>
          ) : requests.length === 0 ? (
             <div className="text-center p-16">
                <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No Applications Found</h3>
                <p className="text-slate-500 font-medium">You haven't submitted any accommodation requests yet.</p>
             </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map(req => (
                   <div key={req.id} className="border border-slate-200 rounded-2xl p-6 hover:border-emerald-300 transition-colors shadow-sm">
                      <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
                         <div>
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-1 rounded-md mb-2 inline-block">App #{req.id}</span>
                            <h3 className="font-bold text-slate-800 text-lg">Category {req.category}</h3>
                         </div>
                         <div className="text-right">
                            <div className="text-sm font-bold text-slate-700">{new Date(req.arrivalDate).toLocaleDateString()}</div>
                            <div className="text-xs text-slate-500 font-medium">to {new Date(req.departureDate).toLocaleDateString()}</div>
                         </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                         <div className="text-sm border border-slate-100 rounded-lg p-3 bg-slate-50">
                            <div className="font-bold text-slate-700 text-xs uppercase mb-1">Status</div>
                            <div className={`font-semibold ${req.overallStatus === 'APPROVED' ? 'text-green-600' : req.overallStatus === 'REJECTED' ? 'text-red-600' : 'text-yellow-600'}`}>
                               {req.overallStatus}
                            </div>
                         </div>
                         <div className="text-sm">
                            <span className="text-slate-500">Mentor:</span> <span className="font-semibold text-slate-800">{req.mentorName}</span>
                         </div>
                         <div className="text-sm">
                            <span className="text-slate-500">Mentor Clearance:</span> <span className="font-semibold text-slate-800">{req.mentorStatus}</span>
                         </div>
                         <div className="text-sm">
                            <span className="text-slate-500">HOD Clearance:</span> <span className="font-semibold text-slate-800">{req.hodStatus}</span>
                         </div>
                         <div className="text-sm">
                            <span className="text-slate-500">Registrar Clearance:</span> <span className="font-semibold text-slate-800">{req.registrarStatus}</span>
                         </div>
                         <div className="text-sm">
                            <span className="text-slate-500">Warden Clearance:</span> <span className="font-semibold text-slate-800">{req.wardenStatus}</span>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
