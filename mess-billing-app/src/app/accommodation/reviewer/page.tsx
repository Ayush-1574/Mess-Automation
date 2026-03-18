'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReviewerDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/accommodation/requests');
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      }
    } catch (e) {
      console.error("Failed to load requests", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId: number, action: 'APPROVE' | 'REJECT') => {
    if (!confirm(`Are you sure you want to ${action} this request?`)) return;
    
    try {
      const res = await fetch('/api/accommodation/requests/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, action })
      });
      if (res.ok) {
        fetchRequests(); // Refresh list
      } else {
        alert("Failed to perform action");
      }
    } catch (e) {
       alert("Error performing action");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-80 bg-teal-600 rounded-b-[4rem] z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-32 -left-24 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 text-white">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Reviewer Dashboard</h1>
            <p className="mt-2 text-teal-100 font-medium text-lg">Manage pending accommodation approvals</p>
          </div>
          <div className="flex space-x-4">
             <Link href="/" className="bg-white/20 text-white font-medium py-3 px-6 rounded-xl hover:bg-white/30 backdrop-blur-md transition-all active:scale-95 shadow-md flex items-center border border-white/30">
               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
               </svg>
               Logout
             </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 min-h-[50vh]">
          {loading ? (
             <div className="flex items-center justify-center p-20">
                <svg className="animate-spin h-10 w-10 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
             </div>
          ) : requests.length === 0 ? (
             <div className="text-center p-20">
                <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-700 mb-2">You're all caught up!</h3>
                <p className="text-slate-500 font-medium">There are no pending applications waiting for your approval right now.</p>
             </div>
          ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-100 uppercase text-xs font-extrabold text-slate-500 tracking-wider">
                         <th className="p-4 pl-8">Applicant</th>
                         <th className="p-4">Type & Category</th>
                         <th className="p-4">Dates</th>
                         <th className="p-4">Mentor Status</th>
                         <th className="p-4">HOD Status</th>
                         <th className="p-4">Registrar Status</th>
                         <th className="p-4">Warden Status</th>
                         <th className="p-4 pr-8 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100/80">
                      {requests.map(req => (
                         <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="p-4 pl-8">
                               <div className="font-bold text-slate-800">{req.applicantName}</div>
                               <div className="text-xs text-slate-500">{req.contactNo}</div>
                            </td>
                            <td className="p-4">
                               <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md mb-1">{req.applicantType.replace('_', ' ')}</span>
                               <div className="text-xs font-semibold text-teal-600">Category {req.category}</div>
                            </td>
                            <td className="p-4 text-sm font-medium text-slate-600">
                               <div>{new Date(req.arrivalDate).toLocaleDateString()}</div>
                               <div className="text-xs text-slate-400">to {new Date(req.departureDate).toLocaleDateString()}</div>
                            </td>
                            <td className="p-4">
                               <span className={`text-xs font-bold px-2 py-1 rounded-md ${req.mentorStatus === 'APPROVED' ? 'bg-green-100 text-green-700' : req.mentorStatus === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                  {req.mentorStatus}
                               </span>
                            </td>
                            <td className="p-4">
                               <span className={`text-xs font-bold px-2 py-1 rounded-md ${req.hodStatus === 'APPROVED' ? 'bg-green-100 text-green-700' : req.hodStatus === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                  {req.hodStatus}
                               </span>
                            </td>
                            <td className="p-4">
                               <span className={`text-xs font-bold px-2 py-1 rounded-md ${req.registrarStatus === 'APPROVED' ? 'bg-green-100 text-green-700' : req.registrarStatus === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                  {req.registrarStatus}
                               </span>
                            </td>
                            <td className="p-4">
                               <span className={`text-xs font-bold px-2 py-1 rounded-md ${req.wardenStatus === 'APPROVED' ? 'bg-green-100 text-green-700' : req.wardenStatus === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                  {req.wardenStatus}
                               </span>
                            </td>
                            <td className="p-4 pr-8 text-right space-x-2">
                               <button onClick={() => handleAction(req.id, 'APPROVE')} className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 rounded-lg text-xs font-bold transition-colors">
                                 <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                 Approve
                               </button>
                               <button onClick={() => handleAction(req.id, 'REJECT')} className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 rounded-lg text-xs font-bold transition-colors">
                                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                  Reject
                               </button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
