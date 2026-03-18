'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState, Suspense } from 'react';
import { BrandLogo } from '../../../components/ui/BrandLogo';

function StudentNavInner({
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
    const rollNo = searchParams.get('rollNo');
    const getLink = (path: string) => rollNo ? `${path}?rollNo=${rollNo}` : path;

    return (
        <>
            <aside className={`bg-white/20 backdrop-blur-2xl border-r border-white/40 flex flex-col z-20 transition-all duration-300 shadow-[4px_0_24px_rgb(0,0,0,0.02)] relative ${isCollapsed ? 'w-20' : 'w-72'}`}>
                <div className="p-4 border-b border-white/30 bg-transparent flex items-center justify-between min-h-[5rem] gap-2">
                    <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 flex-1'}`}>
                        <BrandLogo className="!p-1.5 !rounded-xl border-white/40" />
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight whitespace-nowrap">NOC Portal</h2>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className={`p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
                        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto custom-scrollbar bg-transparent overflow-x-hidden">
                    <ul className="space-y-1.5">
                        {[
                            { name: 'My Applications', path: '/noc/student/dashboard', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                            { name: 'New Application', path: '/noc/student/apply', icon: 'M12 4v16m8-8H4' },
                        ].map((link) => {
                            const isActive = pathname === link.path || pathname.startsWith(link.path + '/');
                            return (
                                <li key={link.path} title={isCollapsed ? link.name : undefined}>
                                    <Link
                                        href={getLink(link.path)}
                                        className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${isActive
                                            ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100 font-semibold'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                                            } ${isCollapsed ? 'justify-center border-transparent' : ''}`}
                                    >
                                        <svg className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} />
                                        </svg>
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
                <div className="p-6 md:p-10 lg:p-12 max-w-6xl mx-auto w-full transition-all duration-300 relative">
                    {children}
                </div>
            </main>
        </>
    );
}

export default function NocStudentLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    return (
        <div className="flex h-screen bg-transparent font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden">
            <Suspense fallback={<div className="flex-1 bg-transparent h-screen"></div>}>
                <StudentNavInner pathname={pathname} isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
                    {children}
                </StudentNavInner>
            </Suspense>
        </div>
    );
}
