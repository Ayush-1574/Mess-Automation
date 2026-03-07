import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/hostels — list all hostels, optionally filtered by messId (via assignments)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const messId = searchParams.get('messId');

        if (messId) {
            // Return hostels whose students are assigned to this mess (any session)
            const assignments = await prisma.studentMessAssignment.findMany({
                where: { messId: Number(messId) },
                include: { student: { include: { hostelRef: true } } },
                distinct: ['studentId'],
            });
            const hostelMap = new Map<number, any>();
            assignments.forEach(a => {
                const h = a.student.hostelRef;
                if (h && !hostelMap.has(h.id)) hostelMap.set(h.id, h);
            });
            return NextResponse.json(Array.from(hostelMap.values()).sort((a, b) => a.name.localeCompare(b.name)));
        }

        const hostels = await prisma.hostel.findMany({ orderBy: { name: 'asc' } });
        return NextResponse.json(hostels);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch hostels' }, { status: 500 });
    }
}

// POST /api/hostels — create a hostel by name (upsert)
export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        if (!name?.trim()) return NextResponse.json({ error: 'name is required' }, { status: 400 });
        const hostel = await prisma.hostel.upsert({
            where: { name: name.trim() },
            update: {},
            create: { name: name.trim() },
        });
        return NextResponse.json(hostel, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create hostel' }, { status: 500 });
    }
}
