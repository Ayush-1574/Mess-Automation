'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// The old rebate page is replaced by /admin/monthly-rebates
export default function RebateRedirect() {
    const router = useRouter();
    useEffect(() => { router.replace('/admin/monthly-rebates'); }, [router]);
    return (
        <div className="p-8 text-center text-slate-500 font-medium">
            Redirecting to Monthly Rebates...
        </div>
    );
}
