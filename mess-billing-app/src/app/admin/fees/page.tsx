'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FeesRedirect() {
    const router = useRouter();
    useEffect(() => { router.replace('/admin/mess-assignments'); }, [router]);
    return (
        <div className="p-8 text-center text-slate-500 font-medium">
            Redirecting to Mess Assignments…
        </div>
    );
}
