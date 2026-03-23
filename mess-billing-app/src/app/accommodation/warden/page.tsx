'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '../../../components/ui/Card';

export default function WardenDashboard() {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewRequest, setViewRequest] = useState<any>(null);

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/accommodation/requests');
      if (res.status === 401) {
        router.push('/accommodation/reviewer-login?role=WARDEN');
        return;
      }
      if (res.ok) { const data = await res.json(); setRequests(data.requests || []); }
      else { setError('Failed to load requests'); }
    } catch (e) {
      console.error("Failed to load requests", e);
      setError('Network error. Please try again.');
    }
    finally { setLoading(false); }
  };

  const handleAction = async (requestId: number, action: 'APPROVE' | 'REJECT') => {
    if (!confirm(`Are you sure you want to ${action} this request?`)) return;
    try {
      const res = await fetch('/api/accommodation/requests/action', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, action })
      });
      if (res.ok) fetchRequests(); else alert("Failed to perform action");
    } catch (e) { alert("Error performing action"); }
  };

  const pendingRequests = requests.filter(req => req.wardenStatus === 'PENDING');
  const processedRequests = requests.filter(req => req.wardenStatus !== 'PENDING');

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Chief Warden Portal</h1>
          <p className="text-slate-500 mt-2 font-medium">Final approval and room allocation for accommodation requests</p>
        </div>
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-xs">
          {pendingRequests.length} Pending
        </span>
      </div>

      <Card className="p-0 overflow-hidden" hoverEffect={false}>
        {loading ? (
          <div className="flex items-center justify-center p-20">
            <svg className="animate-spin h-10 w-10 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : pendingRequests.length === 0 && processedRequests.length === 0 ? (
          <div className="text-center p-20">
            <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">You&apos;re all caught up!</h3>
            <p className="text-slate-500 font-medium">No pending applications right now.</p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-sm shadow-sm">
                <tr className="border-b border-slate-200 uppercase text-xs font-extrabold text-slate-500 tracking-wider">
                  <th className="p-4 pl-8">Applicant</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Type & Category</th>
                  <th className="p-4">Clearance</th>
                  <th className="p-4">Final Decision</th>
                  <th className="p-4 pr-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {pendingRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-8">
                      <div className="font-bold text-slate-800 text-base">{req.applicantName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{req.contactNo}</div>
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-600">
                      <div>{new Date(req.arrivalDate).toLocaleDateString()} <span className="text-slate-400">({req.arrivalTime})</span></div>
                      <div className="mt-1">to {new Date(req.departureDate).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md mb-1 uppercase tracking-wide">{req.applicantType.replace('_', ' ')}</span>
                      <div className="text-xs font-bold text-emerald-600">Category {req.category}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs text-slate-500 flex flex-col space-y-1">
                        <span>Mentor: {req.mentorStatus === 'APPROVED' ? '✅' : '❌'}</span>
                        <span>HOD: {req.hodStatus === 'APPROVED' ? '✅' : '❌'}</span>
                        <span>Registrar: {req.registrarStatus === 'APPROVED' ? '✅' : '❌'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${req.overallStatus === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' : req.overallStatus === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                        {req.wardenStatus === 'PENDING' ? 'PENDING' : req.overallStatus}
                      </span>
                    </td>
                    <td className="p-4 pr-8 text-right space-x-2">
                       <Link href={`/accommodation/review/${req.id}`} className="inline-flex items-center px-4 py-2 bg-slate-50 text-slate-700 hover:bg-slate-600 hover:text-white rounded-lg text-sm font-bold transition-all border border-slate-200 hover:border-slate-600 shadow-sm">
                         Review Request
                       </Link>
                      {req.wardenStatus === 'PENDING' && (<>
                        <button onClick={() => handleAction(req.id, 'APPROVE')} className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 hover:bg-green-600 hover:text-white rounded-lg text-sm font-bold transition-all border border-green-200 hover:border-green-600 shadow-sm">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>Approve
                        </button>
                        <button onClick={() => handleAction(req.id, 'REJECT')} className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white rounded-lg text-sm font-bold transition-all border border-red-200 hover:border-red-600 shadow-sm">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>Reject
                        </button>
                      </>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PROCESSED LIST */}
        {processedRequests.length > 0 && (
          <div className="flex flex-col border-t-8 border-slate-50">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Processed History</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">Applications you have already reviewed.</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/95 backdrop-blur-sm shadow-sm">
                  <tr className="border-b border-slate-200 uppercase text-xs font-extrabold text-slate-500 tracking-wider">
                    <th className="p-4 pl-8">Applicant</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Decision</th>
                    <th className="p-4 pr-8 text-right">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  {processedRequests.map(req => (
                    <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 pl-8">
                        <div className="font-bold text-slate-700">{req.applicantName}</div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-bold text-slate-500 uppercase">{req.applicantType.replace('_', ' ')}</span>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${req.wardenStatus === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                          {req.wardenStatus}
                        </span>
                      </td>
                      <td className="p-4 pr-8 text-right space-x-2">
                        <Link href={`/accommodation/review/${req.id}`} className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold transition-all shadow-sm">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>

      {viewRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-2xl font-extrabold text-slate-800">Application Details</h3>
              <button onClick={() => setViewRequest(null)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {[['Applicant Name', viewRequest.applicantName], ['Type', viewRequest.applicantType.replace('_',' ')], ['Contact', viewRequest.contactNo], ['Gender', viewRequest.gender], ['Department', viewRequest.department], ['Category', `Category ${viewRequest.category}`]].map(([label, val]) => (
                  <div key={label} className="space-y-1"><p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p><p className="text-slate-800 font-semibold">{val}</p></div>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-6 grid grid-cols-2 gap-6">
                <div className="space-y-1"><p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Arrival</p><p className="text-slate-800 font-semibold">{new Date(viewRequest.arrivalDate).toLocaleDateString()} at {viewRequest.arrivalTime}</p></div>
                <div className="space-y-1"><p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Departure</p><p className="text-slate-800 font-semibold">{new Date(viewRequest.departureDate).toLocaleDateString()} at {viewRequest.departureTime}</p></div>
              </div>
              <div className="border-t border-slate-100 pt-6"><p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Permanent Address</p><p className="text-slate-800 font-medium">{viewRequest.address}</p></div>
              {viewRequest.financialSupportAmount && (<div className="border-t border-slate-100 pt-6"><p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Financial Support Amount</p><p className="text-emerald-600 font-bold text-xl">₹{viewRequest.financialSupportAmount}</p></div>)}
              {viewRequest.documentUrl && (
                <div className="border-t border-slate-100 pt-6">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Uploaded Proof / Document</p>
                  <a href={viewRequest.documentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-xl text-sm font-bold transition-all border border-emerald-200 hover:border-emerald-600 shadow-sm w-fit">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    View Attached Document
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
