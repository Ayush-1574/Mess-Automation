import Link from 'next/link';
import React from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-slate-800 text-white">
                <div className="p-6">
                    <h2 className="text-2xl font-bold">Mess Admin</h2>
                </div>
                <nav className="mt-6">
                    <ul>
                        <li>
                            <Link href="/admin/dashboard" className="block px-6 py-3 hover:bg-slate-700">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/upload" className="block px-6 py-3 hover:bg-slate-700">
                                Upload Data
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/rebate" className="block px-6 py-3 hover:bg-slate-700">
                                Manage Rebates
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/bill" className="block px-6 py-3 hover:bg-slate-700">
                                Generate Bills
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/reports" className="block px-6 py-3 hover:bg-slate-700">
                                Reports
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/permissions" className="block px-6 py-3 hover:bg-slate-700">
                                View Details
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/reports/view" className="block px-6 py-3 hover:bg-slate-700">
                                Consolidated Report
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
