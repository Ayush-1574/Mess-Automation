import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json({ error: 'Fee uploads are no longer supported. Record fees on the Mess Assignments page.' }, { status: 410 });
}
