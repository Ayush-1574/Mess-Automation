'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '../../../../components/ui/Card';

export default function WardenHistory() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [allSessions, setAllSessions] = useState<string[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>('all');
  const router = useRouter();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/accommodation/requests');
      if (res.status === 401) { router.push('/accommodation/reviewer-login?role=WARDEN'); return; }
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
        setAllSessions(data.allSessions || []);
      }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const processedRequests = requests.filter(req => req.wardenStatus !== 'PENDING' && (selectedSession === 'all' || req.session === selectedSession));
  
  const filteredRequests = processedRequests.filter(req => 
    req.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    req.applicantType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.wardenStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Warden Processed History</h1>
          <p className="text-slate-500 mt-2 font-medium">History of all student accommodation requests you have already approved or rejected.</p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden shadow-sm border-slate-200 border-2 border-t-8 border-t-slate-50">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Filter by student name, type, or status..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium shadow-sm"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium text-slate-700 shadow-sm"
            >
              <option value="all">All Sessions</option>
              {allSessions.map(session => (
                <option key={session} value={session}>{session}</option>
              ))}
            </select>
            
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-xs">
              {filteredRequests.length} Results
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-16 flex justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div></div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center p-20">
            <p className="text-slate-500 font-medium">No processed requests found exactly matching your filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/95 backdrop-blur-sm shadow-sm">
                <tr className="border-b border-slate-200 uppercase text-xs font-extrabold text-slate-500 tracking-wider">
                  <th className="p-4 pl-8">Applicant Name</th>
                  <th className="p-4">Applicant Type</th>
                  <th className="p-4">Dates</th>
                  <th className="p-4">Your Decision</th>
                  <th className="p-4 pr-8 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {filteredRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-8">
                      <div className="font-bold text-slate-700 text-base">{req.applicantName}</div>
                      <div className="text-xs font-semibold text-slate-400">{req.contactNo}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-md mb-1 uppercase tracking-wide">{req.applicantType.replace('_', ' ')}</span>
                      <div className="text-xs font-bold text-emerald-600">Cat {req.category}</div>
                    </td>
                    <td className="p-4 text-xs font-medium text-slate-600">
                      <div>{new Date(req.arrivalDate).toLocaleDateString()}</div>
                      <div className="text-slate-400 mt-1">to {new Date(req.departureDate).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-lg border ${req.wardenStatus === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {req.wardenStatus}
                      </span>
                    </td>
                    <td className="p-4 pr-8 text-right space-x-2">
                       <Link href={`/accommodation/review/${req.id}`} className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold transition-all shadow-sm">
                         View Full Print
                       </Link>
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
