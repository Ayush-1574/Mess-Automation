'use client';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Select } from '../components/ui/Select';

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState('student');
  const [studentId, setStudentId] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      if (studentId) {
        router.push(`/student/dashboard?id=${studentId}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">

      <div className="bg-white/20 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 w-full max-w-md relative z-10 transition-all duration-500 hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] hover:bg-white/30 hover:-translate-y-2">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/30">
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Mess Portal</h1>
            <p className="text-sm text-slate-500 mt-2 font-medium">Sign in to manage your account</p>
          </div>
          <BrandLogo />
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Select
              label="Select Role"
              value={role}
              onChange={(val: string | number) => setRole(val as string)}
              options={[
                { label: 'Student', value: 'student' },
                { label: 'Admin', value: 'admin' }
              ]}
              className="bg-white/80"
            />
          </div>

          <div className={`transition-all duration-500 overflow-hidden ${role === 'student' ? 'max-h-24 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}`}>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Roll Number</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full border border-white/60 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
              placeholder="e.g. 2023CSB1107"
              required={role === 'student'}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all active:scale-[0.98] shadow-md shadow-indigo-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
