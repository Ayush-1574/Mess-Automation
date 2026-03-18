'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// The old bill page is replaced by /admin/fees + /admin/mess-rates
export default function BillRedirect() {
    const router = useRouter();
    useEffect(() => { router.replace('/admin/fees'); }, [router]);
    return (
        <div className="p-8 text-center text-slate-500 font-medium">
            Redirecting to Fees Deposited...
        </div>
    );
}
