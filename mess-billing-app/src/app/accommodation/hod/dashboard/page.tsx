'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '../../../../components/ui/Card';

export default function HodDashboard() {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [viewRequest, setViewRequest] = useState<any>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/accommodation/requests');
      if (res.status === 401) {
        router.push('/accommodation/reviewer-login?role=HOD');
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

  const handleBulkAction = async (action: 'APPROVE' | 'REJECT') => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to bulk ${action} ${selectedIds.length} requests?`)) return;
    
    try {
      const res = await fetch('/api/accommodation/requests/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestIds: selectedIds, action })
      });
      if (res.ok) {
        setSelectedIds([]);
        fetchRequests();
      } else {
        alert("Failed to perform bulk action");
      }
    } catch (e) {
       alert("Error performing bulk action");
    }
  };

  const pendingRequests = requests.filter(req => req.hodStatus === 'PENDING');
  const processedRequests = requests.filter(req => req.hodStatus !== 'PENDING');
  const approvedRequests = processedRequests.filter(req => req.hodStatus === 'APPROVED');
  const rejectedRequests = processedRequests.filter(req => req.hodStatus === 'REJECTED');

  const toggleSelectAll = () => {
     if (selectedIds.length === pendingRequests.length && pendingRequests.length > 0) {
        setSelectedIds([]);
     } else {
        setSelectedIds(pendingRequests.map(r => r.id));
     }
  };

  const toggleSelect = (id: number) => {
     setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">HOD Portal</h1>
          <p className="text-slate-500 mt-2 font-medium">Approve departmental temporary accommodation requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-blue-500 shadow-sm relative overflow-hidden" hoverEffect={true}>
          <div className="flex items-center justify-between z-10 relative">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Queue</p>
              <h2 className="text-3xl font-black text-slate-800">{requests.length}</h2>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
          </div>
        </Card>
        <Card className="p-5 border-l-4 border-l-emerald-500 shadow-sm relative overflow-hidden" hoverEffect={true}>
          <div className="flex items-center justify-between z-10 relative">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Action</p>
              <h2 className="text-3xl font-black text-slate-800">{pendingRequests.length}</h2>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        </Card>
        <Card className="p-5 border-l-4 border-l-green-500 shadow-sm relative overflow-hidden" hoverEffect={true}>
          <div className="flex items-center justify-between z-10 relative">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Approved</p>
              <h2 className="text-3xl font-black text-slate-800">{approvedRequests.length}</h2>
            </div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>
        </Card>
        <Card className="p-5 border-l-4 border-l-red-500 shadow-sm relative overflow-hidden" hoverEffect={true}>
          <div className="flex items-center justify-between z-10 relative">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Rejected</p>
              <h2 className="text-3xl font-black text-slate-800">{rejectedRequests.length}</h2>
            </div>
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
          </div>
        </Card>
      </div>


    </div>
  );
}
