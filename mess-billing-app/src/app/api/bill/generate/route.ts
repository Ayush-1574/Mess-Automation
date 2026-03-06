// This route is deprecated. Bills are replaced by mess-rates and fees-deposited.
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: 'Deprecated. Use /api/fees-deposited and /api/mess-rates' }, { status: 301 });
}

export async function POST() {
    return NextResponse.json({ message: 'Deprecated. Use /api/fees-deposited and /api/mess-rates' }, { status: 301 });
}
