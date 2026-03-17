import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';

// GET /api/noc/applications/[id] — Get full application details
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const application = await nocPrisma.nocApplication.findUnique({
            where: { id: Number(id) },
            include: {
                student: true,
                actions: {
                    include: { officer: true },
                    orderBy: { timestamp: 'asc' },
                },
                certificate: true,
            },
        });

        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 });
        }

        return NextResponse.json(application);
    } catch (error) {
        console.error('Application fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
    }
}
