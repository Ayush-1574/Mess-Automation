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

  const apps = [
    {
      name: 'Mess Billing & Rebate',
      description: 'Manage mess bills, rebates, fees, and student records.',
      path: '/mess',
      color: 'indigo',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      borderHover: 'hover:border-indigo-300',
      shadowHover: 'hover:shadow-indigo-100/50',
      icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zm-7-8V7m0 6v.01',
      status: 'Active',
      statusColor: 'bg-indigo-100 text-indigo-700',
    },
    {
      name: 'No Objection Certificate',
      description: 'Apply for and track NOC requests for various purposes.',
      path: '/noc',
      color: 'emerald',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderHover: 'hover:border-emerald-300',
      shadowHover: 'hover:shadow-emerald-100/50',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      status: 'Active',
      statusColor: 'bg-emerald-100 text-emerald-700',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative">

      <div className="w-full max-w-4xl relative z-10 px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <BrandLogo />
            <div className="text-left">
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">IIT Ropar</h1>
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-widest mt-0.5">Student Services Portal</p>
            </div>
          </div>
          <p className="text-slate-500 font-medium mt-3 max-w-md mx-auto">
            Access all university services and forms from one place.
          </p>
        </div>

        {/* App Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {apps.map((app) => (
            <button
              key={app.path}
              onClick={() => {
                if (app.status === 'Active') {
                  router.push(app.path);
                }
              }}
              disabled={app.status !== 'Active'}
              className={`group text-left bg-white/20 backdrop-blur-2xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 relative transition-all duration-500 ${
                app.status === 'Active'
                  ? `hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] hover:bg-white/30 hover:-translate-y-2 cursor-pointer ${app.borderHover}`
                  : 'opacity-70 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl ${app.iconBg} flex items-center justify-center shadow-inner border border-white/60 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className={`w-7 h-7 ${app.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={app.icon}></path>
                  </svg>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${app.statusColor}`}>
                  {app.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">{app.name}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{app.description}</p>

              {app.status === 'Active' && (
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                  <span>Open</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
