import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const messes = await prisma.mess.findMany({ orderBy: { name: 'asc' } });
        return NextResponse.json(messes);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch messes' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        if (!name) return NextResponse.json({ error: 'Mess name is required' }, { status: 400 });
        const mess = await prisma.mess.create({ data: { name } });
        return NextResponse.json(mess, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') return NextResponse.json({ error: 'Mess already exists' }, { status: 409 });
        return NextResponse.json({ error: 'Failed to create mess' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await prisma.mess.delete({ where: { id: Number(id) } });
        return NextResponse.json({ message: 'Mess deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete mess' }, { status: 500 });
    }
}
