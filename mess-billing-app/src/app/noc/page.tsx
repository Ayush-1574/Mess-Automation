'use client';
import { BrandLogo } from '@/components/ui/BrandLogo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Select } from '../../components/ui/Select';

export default function NocLogin() {
    const router = useRouter();
    const [role, setRole] = useState('student');
    const [identifier, setIdentifier] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!identifier) return;

        if (role === 'student') {
            router.push(`/noc/student/dashboard?rollNo=${identifier}`);
        } else {
            // Officer login: identifier is officer email or ID
            router.push(`/noc/officer/dashboard?id=${identifier}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            <div className="bg-white/20 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 w-full max-w-md relative z-10 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/30 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/30">
                    <div className="text-left">
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">NOC Portal</h1>
                        <p className="text-sm text-slate-500 mt-2 font-medium">Certificate Application System</p>
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
                                { label: 'Admin Officer', value: 'admin_officer' },
                                { label: 'Joint Superintendent', value: 'joint_superintendent' },
                                { label: 'Assistant Registrar', value: 'assistant_registrar' },
                            ]}
                            className="bg-white/80"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">
                            {role === 'student' ? 'Roll Number' : 'Officer ID'}
                        </label>
                        <input
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full border border-white/60 bg-white/60 backdrop-blur-md px-4 py-3 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 hover:border-emerald-300 focus:bg-white shadow-[0_4px_10px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-md transition-all duration-300 placeholder:text-slate-400"
                            placeholder={role === 'student' ? 'e.g. 2023CSB1107' : 'e.g. 1'}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 bg-emerald-600 text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transform transition-all active:scale-[0.98] shadow-md shadow-emerald-200"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 pt-4 border-t border-white/30 text-center">
                    <Link href="/" className="text-sm text-slate-500 hover:text-emerald-600 font-medium transition-colors inline-flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to Services
                    </Link>
                </div>
            </div>
        </div>
    );
}
