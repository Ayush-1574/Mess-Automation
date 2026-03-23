'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReviewActionForm({ requestId, dashboardPath }: { requestId: number, dashboardPath: string }) {
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAction = async (action: 'APPROVE' | 'REJECT') => {
    setLoading(true);
    try {
      const res = await fetch('/api/accommodation/requests/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, action, remarks })
      });
      if (res.ok) {
        alert(action === 'APPROVE' ? 'Application Approved successfully!' : 'Application Rejected successfully!');
        router.push(dashboardPath);
      } else {
        const errorData = await res.json();
        alert('Failed: ' + errorData.error);
      }
    } catch {
      alert('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Optional Remarks / Comments</label>
        <textarea 
          rows={3}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Add any internal notes, conditions, or reasons for rejection here..."
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 font-medium"
        />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button 
          disabled={loading}
          onClick={() => handleAction('APPROVE')} 
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm flex justify-center items-center gap-2 group disabled:opacity-70"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          Approve Application
        </button>
        <button 
          disabled={loading}
          onClick={() => handleAction('REJECT')} 
          className="flex-1 bg-white hover:bg-red-50 text-red-600 font-bold py-3.5 px-6 rounded-xl border-2 border-red-200 hover:border-red-500 transition-all shadow-sm flex justify-center items-center gap-2 group disabled:opacity-70"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          Reject Application
        </button>
      </div>
    </div>
  );
}
