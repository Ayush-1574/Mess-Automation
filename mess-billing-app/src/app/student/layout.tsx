'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const id = searchParams.get('id'); // Persist ID in links

    // In a real app, we'd use session/context for ID. 
    // Since we rely on query param ?id=..., we must append it to navigation.
    // However, if we navigate using Next.js Link without query, we lose it.
    // A better approach for this "prototype" with query-param auth is to persist it or use context.

    // Let's wrapping links to preserve ID.
    const getLink = (path: string) => id ? `${path}?id=${id}` : path;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md flex flex-col">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-indigo-600">Student Portal</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href={getLink('/student/dashboard')}
                        className={`block px-4 py-2 rounded ${pathname === '/student/dashboard' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href={getLink('/student/profile')}
                        className={`block px-4 py-2 rounded ${pathname === '/student/profile' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        My Profile
                    </Link>
                    <Link
                        href={getLink('/student/bank')}
                        className={`block px-4 py-2 rounded ${pathname === '/student/bank' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Bank Details
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <Link href="/" className="block text-center text-red-500 hover:underline">
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
