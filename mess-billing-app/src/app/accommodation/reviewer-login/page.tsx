'use client';

import { BrandLogo } from '@/components/ui/BrandLogo';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReviewerLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('FACULTY'); // FACULTY, HOD, REGISTRAR, WARDEN
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    if (newRole === 'REGISTRAR') setEmail('ar@college.edu');
    else if (newRole === 'WARDEN') setEmail('warden@college.edu');
    else if (newRole === 'HOD') setEmail('cse_hod@college.edu');
    else if (newRole === 'FACULTY') setEmail('smith@college.edu');
    setPassword('password');
  };

  useEffect(() => {
    // Intelligently reading the role from URL params safely
    if (typeof window !== 'undefined') {
       const params = new URLSearchParams(window.location.search);
       const roleParam = params.get('role');
       if (roleParam && ['FACULTY', 'HOD', 'REGISTRAR', 'WARDEN'].includes(roleParam)) {
          handleRoleChange(roleParam);
       }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/accommodation/reviewer-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }), // pass the exact role
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Login failed');
      
      // Route intelligently based on role
      switch (role) {
         case 'FACULTY':
            router.push(`/accommodation/mentor`);
            break;
         case 'HOD':
            router.push(`/accommodation/hod`);
            break;
         case 'REGISTRAR':
            router.push(`/accommodation/registrar`);
            break;
         case 'WARDEN':
            router.push(`/accommodation/warden`);
            break;
         default:
            router.push(`/accommodation/reviewer`);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 relative overflow-y-auto">
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-md mx-auto relative z-10 bg-white/60 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-teal-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgb(20,184,166,0.1)]">
        <div className="flex flex-col items-center mb-8 pb-6 border-b border-slate-100">
          <BrandLogo />
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-4 text-center">Institutional Login</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium text-center">Stakeholder Authentication Module</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm font-medium">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-1.5">Are you logging in as?</label>
             <select
               value={role}
               onChange={(e) => handleRoleChange(e.target.value)}
               className="w-full border border-slate-200 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-teal-500/50 hover:border-teal-300 shadow-[0_4px_10px_rgb(0,0,0,0.02)] transition-all duration-300"
               required
               disabled={loading}
             >
               <option value="FACULTY">Faculty Mentor / PI</option>
               <option value="HOD">Head of Department</option>
               <option value="REGISTRAR">Assistant Registrar</option>
               <option value="WARDEN">Chief Warden</option>
             </select>
           </div>
           
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
             <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full border border-slate-200 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50 hover:border-teal-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.02)] transition-all duration-300 placeholder:text-slate-400"
               placeholder="stakeholder@iitrpr.ac.in"
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
               className="w-full border border-slate-200 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50 hover:border-teal-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.02)] transition-all duration-300 placeholder:text-slate-400"
               placeholder="••••••••"
               required
               disabled={loading}
             />
           </div>

                      
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-slate-800 text-white font-bold py-3.5 rounded-xl hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-500/50 transform transition-all active:scale-[0.98] shadow-md shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Sign In Securely'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center text-center">
          <Link href="/accommodation" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
             &larr; Back to Dashboard Grid
          </Link>
        </div>
      </div>
    </div>
  );
}


