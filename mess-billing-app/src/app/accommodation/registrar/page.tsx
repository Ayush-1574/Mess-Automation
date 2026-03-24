'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '../../../components/ui/Card';

export default function RegistrarDashboard() {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/accommodation/requests');
      if (res.status === 401) {
        router.push('/accommodation/reviewer-login?role=REGISTRAR');
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      } else {
        setError('Failed to load requests');
      }
    } catch (e) {
      console.error("Failed to load requests", e);
      setError('Network error. Please try again.');
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
        fetchRequests();
      } else {
        alert("Failed to perform action");
      }
    } catch (e) {
       alert("Error performing action");
    }
  };

  const pendingRequests = requests.filter(req => req.registrarStatus === 'PENDING');
  const processedRequests = requests.filter(req => req.registrarStatus !== 'PENDING');
  const approvedRequests = processedRequests.filter(req => req.registrarStatus === 'APPROVED');
  const rejectedRequests = processedRequests.filter(req => req.registrarStatus === 'REJECTED');

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Assistant Registrar Portal</h1>
          <p className="text-slate-500 mt-2 font-medium">Verify administrative requests prior to Warden issuance</p>
        </div>
      </div>


      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-medium text-sm flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          {error}
        </div>
      )}

      <Card className="p-0 overflow-hidden" hoverEffect={false}>
        {loading ? (
          <div className="flex items-center justify-center p-20">
            <svg className="animate-spin h-10 w-10 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            <h3 className="text-2xl font-bold text-slate-700 mb-2">You&apos;re all caught up!</h3>
            <p className="text-slate-500 font-medium">There are no pending applications waiting for your approval right now.</p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-sm shadow-sm">
                <tr className="border-b border-slate-200 uppercase text-xs font-extrabold text-slate-500 tracking-wider">
                  <th className="p-4 pl-8">Applicant</th>
                  <th className="p-4">PI / Mentor</th>
                  <th className="p-4">Type & Category</th>
                  <th className="p-4">Your Decision</th>
                  <th className="p-4 pr-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {pendingRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 pl-8">
                      <div className="font-bold text-slate-800 text-base">{req.applicantName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{req.contactNo}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-700">{req.mentorName}</div>
                      <div className="text-xs text-slate-500">{req.mentorEmail}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md mb-1 uppercase tracking-wide">{req.applicantType.replace('_', ' ')}</span>
                      <div className="text-xs font-bold text-emerald-600">Category {req.category}</div>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${req.registrarStatus === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' : req.registrarStatus === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                        {req.registrarStatus}
                      </span>
                    </td>
                    <td className="p-4 pr-8 text-right space-x-2">
                       <Link href={`/accommodation/review/${req.id}`} title="Review in Detail" className="inline-flex items-center px-4 py-2 bg-slate-50 text-slate-700 hover:bg-slate-600 hover:text-white rounded-lg text-sm font-bold transition-all border border-slate-200 hover:border-slate-600 shadow-sm align-middle">
                         Review Request
                       </Link>
                       <button onClick={() => handleAction(req.id, 'APPROVE')} title="Quick Approve" className="inline-flex items-center justify-center w-9 h-9 bg-green-50 text-green-600 hover:bg-green-500 hover:text-white rounded-lg transition-colors border border-green-200 hover:border-green-500 shadow-sm align-middle">
                         <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                       </button>
                       <button onClick={() => handleAction(req.id, 'REJECT')} title="Quick Reject" className="inline-flex items-center justify-center w-9 h-9 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-200 hover:border-red-500 shadow-sm align-middle">
                         <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
