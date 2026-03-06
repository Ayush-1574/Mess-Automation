import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ error: 'Fees Deposited has been removed. Fees are now recorded on Mess Assignments.' }, { status: 410 });
}

export async function POST() {
    return NextResponse.json({ error: 'Fees Deposited has been removed. Fees are now recorded on Mess Assignments.' }, { status: 410 });
}
