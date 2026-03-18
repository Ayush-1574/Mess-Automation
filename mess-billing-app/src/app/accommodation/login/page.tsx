'use client';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function ApplicantLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/accommodation/applicant-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Login failed');
      router.push(`/accommodation/dashboard`);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 relative overflow-y-auto">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-md mx-auto relative z-10 bg-white/60 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgb(16,185,129,0.1)]">
        <div className="flex flex-col items-center mb-8 pb-6 border-b border-slate-100">
          <BrandLogo />
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-4 text-center">Accommodation Portals</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium text-center">Applicant Sign In / Register</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm font-medium">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
             <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full border border-slate-200 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 hover:border-emerald-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.02)] transition-all duration-300 placeholder:text-slate-400"
               placeholder="intern@example.com"
               required
               disabled={loading}
             />
           </div>
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
             <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full border border-slate-200 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 hover:border-emerald-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.02)] transition-all duration-300 placeholder:text-slate-400"
               placeholder="••••••••"
               required
               disabled={loading}
             />
           </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 transform transition-all active:scale-[0.98] shadow-md shadow-emerald-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Continue'}
          </button>

          <div className="mt-4 text-center text-xs text-slate-500">
             New here? We'll automatically create your account.
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
          <Link href="/accommodation" className="text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
             &larr; Back to Accommodation Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
