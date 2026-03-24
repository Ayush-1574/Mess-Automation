'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '../../components/ui/BrandLogo';

// Pages that should NOT get the sidebar shell (login, apply, landing)
// Exact paths (no sub-routes) that render standalone (no sidebar)
const STANDALONE_EXACT = [
    '/accommodation/login',
    '/accommodation/reviewer-login',
    '/accommodation/apply',
];

export default function AccommodationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // If the current path is a standalone page, render children without the sidebar
    // Only exact matches are standalone — sub-routes like /apply/intern get the sidebar
    const isStandalone = STANDALONE_EXACT.includes(pathname) || pathname === '/accommodation' || pathname.startsWith('/accommodation/review');
    if (isStandalone) {
        return <>{children}</>;
    }

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    const allNavGroups = [
        {
            label: 'Applicant',
            links: [
                { name: 'My Applications', path: '/accommodation/dashboard', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                { name: 'New Application', path: '/accommodation/apply', icon: 'M12 4v16m8-8H4' },
            ]
        },
        {
            label: 'Mentor Portal',
            links: [
                { name: 'Dashboard', path: '/accommodation/mentor/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                { name: 'Pending Approvals', path: '/accommodation/mentor', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                { name: 'Processed History', path: '/accommodation/mentor/history', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            ]
        },
        {
            label: 'HOD Portal',
            links: [
                { name: 'Dashboard', path: '/accommodation/hod/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                { name: 'Pending Approvals', path: '/accommodation/hod', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                { name: 'Processed History', path: '/accommodation/hod/history', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            ]
        },
        {
            label: 'Registrar Portal',
            links: [
                { name: 'Dashboard', path: '/accommodation/registrar/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                { name: 'Pending Approvals', path: '/accommodation/registrar', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                { name: 'Processed History', path: '/accommodation/registrar/history', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            ]
        },
        {
            label: 'Warden Portal',
            links: [
                { name: 'Dashboard', path: '/accommodation/warden/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                { name: 'Pending Approvals', path: '/accommodation/warden', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                { name: 'Processed History', path: '/accommodation/warden/history', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            ]
        },
        {
            label: 'Admin',
            links: [
                { name: 'Reviewer Overview', path: '/accommodation/reviewer', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
            ]
        },
    ];

    // Filter which groups to show based on the current context (pathname)
    let navGroups = [];
    if (pathname.startsWith('/accommodation/dashboard') || pathname.startsWith('/accommodation/apply')) {
        navGroups = allNavGroups.filter(g => g.label === 'Applicant');
    } else if (pathname.startsWith('/accommodation/mentor')) {
        navGroups = allNavGroups.filter(g => g.label === 'Mentor Portal');
    } else if (pathname.startsWith('/accommodation/hod')) {
        navGroups = allNavGroups.filter(g => g.label === 'HOD Portal');
    } else if (pathname.startsWith('/accommodation/registrar')) {
        navGroups = allNavGroups.filter(g => g.label === 'Registrar Portal');
    } else if (pathname.startsWith('/accommodation/warden')) {
        navGroups = allNavGroups.filter(g => g.label === 'Warden Portal');
    } else if (pathname.startsWith('/accommodation/reviewer')) {
        navGroups = allNavGroups.filter(g => g.label === 'Admin');
    } else {
        navGroups = allNavGroups.filter(g => g.label === 'Applicant'); // Default fallback
    }

    return (
        <div className="flex h-screen bg-transparent font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden">
            <aside className={`bg-white/20 backdrop-blur-2xl border-r border-white/40 flex flex-col z-20 transition-all duration-300 shadow-[4px_0_24px_rgb(0,0,0,0.02)] relative ${isCollapsed ? 'w-20' : 'w-72'}`}>
                <div className="p-4 border-b border-white/30 bg-transparent flex items-center justify-between min-h-[5rem] gap-2">
                    <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 flex-1'}`}>
                        <BrandLogo className="!p-1.5 !rounded-xl border-white/40" />
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight whitespace-nowrap">Accommodation</h2>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className={`p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
                        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isCollapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'} />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 py-4 px-3 overflow-y-auto custom-scrollbar bg-transparent overflow-x-hidden">
                    {navGroups.map((group) => (
                        <div key={group.label} className="mb-4">
                            {!isCollapsed && (
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-1.5">{group.label}</p>
                            )}
                            <ul className="space-y-0.5">
                                {group.links.map((link) => {
                                    const isActive = pathname === link.path;
                                    return (
                                        <li key={link.path} title={isCollapsed ? link.name : undefined}>
                                            <Link
                                                href={link.path}
                                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive
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
                        </div>
                    ))}
                </nav>

                <div className="p-3 border-t border-white/30 bg-transparent">
                    <Link href="/" title={isCollapsed ? 'Sign Out' : undefined} className={`flex items-center gap-3 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors group ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}>
                        <svg className="w-5 h-5 flex-shrink-0 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">Sign Out</span>}
                    </Link>
                </div>
            </aside>

            <main className="flex-1 bg-transparent h-screen overflow-y-auto pb-10">
                <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto w-full transition-all duration-300 relative group/content">
                    {children}
                </div>
            </main>
        </div>
    );
}
