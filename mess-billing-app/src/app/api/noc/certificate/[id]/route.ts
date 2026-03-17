import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';

// GET /api/noc/certificate/[id] — Get the generated certificate for an approved application
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const certificate = await nocPrisma.nocCertificate.findUnique({
            where: { applicationId: Number(id) },
            include: {
                application: {
                    include: {
                        student: true,
                        actions: {
                            include: { officer: true },
                            orderBy: { timestamp: 'asc' },
                        },
                    },
                },
            },
        });

        if (!certificate) {
            return NextResponse.json(
                { error: 'Certificate not found. The application may not be approved yet.' },
                { status: 404 }
            );
        }

        return NextResponse.json(certificate);
    } catch (error) {
        console.error('Certificate fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch certificate' }, { status: 500 });
    }
}
