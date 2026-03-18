import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';

// GET /api/noc/officer-detail/[id] — Full officer record with action count
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const officer = await nocPrisma.nocOfficer.findUnique({
            where: { id: Number(id) },
            include: {
                actions: {
                    include: {
                        application: { include: { student: true } },
                    },
                    orderBy: { timestamp: 'desc' },
                    take: 20,
                },
                _count: { select: { actions: true } },
            },
        });

        if (!officer) {
            return NextResponse.json({ error: 'Officer not found' }, { status: 404 });
        }

        return NextResponse.json(officer);
    } catch (error) {
        console.error('Officer detail error:', error);
        return NextResponse.json({ error: 'Failed to fetch officer' }, { status: 500 });
    }
}
