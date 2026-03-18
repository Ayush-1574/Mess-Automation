'use client';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Select } from '@/components/ui/Select';

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState('student');
  const [loginMethod, setLoginMethod] = useState<'otp' | 'password'>('password');
  
  // Student Auth State
  const [studentId, setStudentId] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  
  // Shared OTP State
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailPartial, setEmailPartial] = useState('');
  
  // Admin Auth State
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (role === 'admin') {
        if (loginMethod === 'password') {
          const res = await fetch('/api/auth/admin-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: adminUsername, password: adminPassword }),
          });
          const data = await res.json();
          
          if (!res.ok) throw new Error(data.error || 'Login failed');
          router.push('/admin/dashboard');
        } else {
          // Admin OTP
          if (!otpSent) {
            const res = await fetch('/api/auth/admin-send-otp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
            
            setEmailPartial(data.emailPartial || 'your email');
            setOtpSent(true);
          } else {
            const res = await fetch('/api/auth/admin-verify-otp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, otp }),
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || 'OTP Verification failed');
            router.push('/admin/dashboard');
          }
        }
      } else {
        // Student Logic
        if (loginMethod === 'password') {
          const res = await fetch('/api/auth/student-login-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rollNo: studentId, password: studentPassword }),
          });
          const data = await res.json();
          
          if (!res.ok) throw new Error(data.error || 'Login failed');
          router.push(`/student/dashboard?id=${data.studentId}`);
        } else {
          // Student OTP
          if (!otpSent) {
            const res = await fetch('/api/auth/send-otp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
            
            setEmailPartial(data.emailPartial || 'your email');
            setOtpSent(true);
          } else {
            const res = await fetch('/api/auth/verify-otp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, otp }),
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || 'OTP Verification failed');
            router.push(`/student/dashboard?id=${data.studentId}`);
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (loading) return 'Processing...';
    if (loginMethod === 'otp' && !otpSent) return 'Send OTP';
    return 'Sign In';
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

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${loginMethod === 'password' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white/50 text-slate-600 hover:bg-white/80'}`}
            onClick={() => { setLoginMethod('password'); setOtpSent(false); setError(''); }}
          >
            Password
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${loginMethod === 'otp' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white/50 text-slate-600 hover:bg-white/80'}`}
            onClick={() => { setLoginMethod('otp'); setError(''); }}
          >
            Email OTP
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Select
              label="Select Role"
              value={role}
              onChange={(val: string | number) => {
                setRole(val as string);
                setOtpSent(false); // reset OTP state
                setError('');
              }}
              options={[
                { label: 'Student', value: 'student' },
                { label: 'Admin', value: 'admin' }
              ]}
              className="bg-white/80"
            />
          </div>

          <div className={`transition-all duration-500 overflow-hidden ${role === 'student' ? 'max-h-96 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}`}>
            {!otpSent ? (
              <div className="space-y-4">
                {loginMethod === 'password' ? (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Roll Number</label>
                      <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full border border-white/60 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
                        placeholder="e.g. 2023CSB1107"
                        required={role === 'student' && loginMethod === 'password'}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                      <input
                        type="password"
                        value={studentPassword}
                        onChange={(e) => setStudentPassword(e.target.value)}
                        className="w-full border border-white/60 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
                        placeholder="••••••••"
                        required={role === 'student' && loginMethod === 'password'}
                        disabled={loading}
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-white/60 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
                      placeholder="e.g. 2023CSB1107@iitrpr.ac.in"
                      required={role === 'student' && loginMethod === 'otp'}
                      disabled={loading}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-green-700 font-medium bg-green-50 p-3 rounded-lg border border-green-200">
                  OTP sent to {emailPartial}. Please check your inbox.
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border border-white/60 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
                    placeholder="6-digit OTP"
                    required={role === 'student' && loginMethod === 'otp'}
                    disabled={loading}
                    maxLength={6}
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <button type="button" onClick={() => setOtpSent(false)} className="text-indigo-600 font-semibold hover:underline">Change Email</button>
                </div>
              </div>
            )}
          </div>

          <div className={`transition-all duration-500 overflow-hidden ${role === 'admin' ? 'max-h-96 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}`}>
             {!otpSent ? (
               <div className="space-y-4">
                {loginMethod === 'password' ? (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Username</label>
                      <input
                        type="text"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        className="w-full border border-white/60 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
                        placeholder="Admin Username"
                        required={role === 'admin' && loginMethod === 'password'}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full border border-white/60 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
                        placeholder="••••••••"
                        required={role === 'admin' && loginMethod === 'password'}
                        disabled={loading}
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Admin Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-white/60 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
                      placeholder="e.g. admin@iitrpr.ac.in"
                      required={role === 'admin' && loginMethod === 'otp'}
                      disabled={loading}
                    />
                  </div>
                )}
              </div>
            ) : (
               <div className="space-y-4">
                <div className="text-sm text-green-700 font-medium bg-green-50 p-3 rounded-lg border border-green-200">
                  OTP sent to {emailPartial}. Please check your inbox.
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border border-white/60 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:border-indigo-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
                    placeholder="6-digit OTP"
                    required={role === 'admin' && loginMethod === 'otp'}
                    disabled={loading}
                    maxLength={6}
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <button type="button" onClick={() => setOtpSent(false)} className="text-indigo-600 font-semibold hover:underline">Change Email</button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all active:scale-[0.98] shadow-md shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {getButtonText()}
          </button>
        </form>
      </div>
    </div>
  );
}
