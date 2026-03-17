import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';

// GET /api/noc/student-detail/[id] — Full student record with applications
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const student = await nocPrisma.nocStudent.findUnique({
            where: { id: Number(id) },
            include: {
                applications: {
                    include: {
                        actions: { include: { officer: true }, orderBy: { timestamp: 'asc' } },
                        certificate: true,
                    },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json(student);
    } catch (error) {
        console.error('Student detail error:', error);
        return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 });
    }
}
