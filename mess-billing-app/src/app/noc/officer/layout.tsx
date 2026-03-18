'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import { BrandLogo } from '../../../components/ui/BrandLogo';

const ROLE_LABELS: Record<string, string> = {
    ADMIN_OFFICER: 'Admin Officer',
    JOINT_SUPERINTENDENT: 'Joint Superintendent',
    ASSISTANT_REGISTRAR: 'Asst. Registrar',
};

function OfficerNavInner({
    children,
    pathname,
    isCollapsed,
    toggleSidebar
}: {
    children: React.ReactNode;
    pathname: string;
    isCollapsed: boolean;
    toggleSidebar: () => void;
}) {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const getLink = (path: string) => id ? `${path}?id=${id}` : path;

    const [officer, setOfficer] = useState<any>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/noc/officer/${id}/pending`)
                .then(res => res.json())
                .then(data => setOfficer(data.officer))
                .catch(() => {});
        }
    }, [id]);

    const navLinks = [
        { name: 'Pending Applications', path: '/noc/officer/dashboard', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
        { name: 'All Applications', path: '/noc/officer/applications', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { name: 'Students', path: '/noc/officer/students', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    ];

    // JS and AR can see officers tab
    if (officer && (officer.role === 'JOINT_SUPERINTENDENT' || officer.role === 'ASSISTANT_REGISTRAR')) {
        navLinks.push({ name: 'Officers', path: '/noc/officer/officers', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' });
    }

    // All officers get the upload page, but their permissions differ
    if (officer) {
        navLinks.push({ name: 'Upload Data', path: '/noc/officer/upload', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' });
    }

    return (
        <>
            <aside className={`bg-white/20 backdrop-blur-2xl border-r border-white/40 flex flex-col z-20 transition-all duration-300 shadow-[4px_0_24px_rgb(0,0,0,0.02)] relative ${isCollapsed ? 'w-20' : 'w-72'}`}>
                <div className="p-4 border-b border-white/30 bg-transparent flex items-center justify-between min-h-[5rem] gap-2">
                    <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 flex-1'}`}>
                        <BrandLogo className="!p-1.5 !rounded-xl border-white/40" />
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 tracking-tight whitespace-nowrap">NOC Admin</h2>
                            {officer && <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{ROLE_LABELS[officer.role]}</p>}
                        </div>
                    </div>
                    <button onClick={toggleSidebar} className={`p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} /></svg>
                    </button>
                </div>

                {/* Officer Info Card */}
                {!isCollapsed && officer && (
                    <div className="mx-3 mt-4 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
                        <p className="text-sm font-bold text-slate-800 truncate">{officer.name}</p>
                        <div className="flex gap-2 mt-1">
                            {officer.course && <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-bold">{officer.course}</span>}
                            {officer.batch && <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold">Batch {officer.batch}</span>}
                        </div>
                    </div>
                )}

                <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto custom-scrollbar bg-transparent overflow-x-hidden">
                    <ul className="space-y-1.5">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path || pathname.startsWith(link.path + '/');
                            return (
                                <li key={link.path} title={isCollapsed ? link.name : undefined}>
                                    <Link href={getLink(link.path)} className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'} ${isCollapsed ? 'justify-center border-transparent' : ''}`}>
                                        <svg className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} /></svg>
                                        {!isCollapsed && <span className="text-sm whitespace-nowrap">{link.name}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-3 border-t border-white/30 bg-transparent">
                    <Link href="/noc" title={isCollapsed ? "Sign Out" : undefined} className={`flex items-center gap-3 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors group ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}>
                        <svg className="w-5 h-5 flex-shrink-0 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Sign Out</span>}
                    </Link>
                </div>
            </aside>

            <main className="flex-1 bg-transparent h-screen overflow-y-auto pb-10">
                <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto w-full transition-all duration-300 relative">
                    {children}
                </div>
            </main>
        </>
    );
}

export default function NocOfficerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    return (
        <div className="flex h-screen bg-transparent font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden">
            <Suspense fallback={<div className="flex-1 bg-transparent h-screen"></div>}>
                <OfficerNavInner pathname={pathname} isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
                    {children}
                </OfficerNavInner>
            </Suspense>
        </div>
    );
}
