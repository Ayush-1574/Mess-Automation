// This route is deprecated. Use /api/monthly-rebates instead.
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Deprecated. Use /api/monthly-rebates' }, { status: 301 });
}

export async function POST() {
    return NextResponse.json({ message: 'Deprecated. Use /api/monthly-rebates' }, { status: 301 });
}
