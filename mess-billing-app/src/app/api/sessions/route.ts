import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const sessions = await prisma.session.findMany({ orderBy: { startYear: 'desc' } });
        return NextResponse.json(sessions);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, startYear, semester } = await request.json();
        if (!name || !startYear || !semester) {
            return NextResponse.json({ error: 'name, startYear and semester are required' }, { status: 400 });
        }
        const session = await prisma.session.create({ data: { name, startYear: Number(startYear), semester } });
        return NextResponse.json(session, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') return NextResponse.json({ error: 'Session already exists' }, { status: 409 });
        return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await prisma.session.delete({ where: { id: Number(id) } });
        return NextResponse.json({ message: 'Session deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
    }
}
