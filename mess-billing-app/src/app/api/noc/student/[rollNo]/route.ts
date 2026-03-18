import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';

// GET /api/noc/student/[rollNo] — Get student profile + their applications
export async function GET(request: Request, context: { params: Promise<{ rollNo: string }> }) {
    try {
        const { rollNo } = await context.params;

        const student = await nocPrisma.nocStudent.findUnique({
            where: { rollNo },
            include: {
                applications: {
                    include: {
                        actions: {
                            include: { officer: true },
                            orderBy: { timestamp: 'asc' },
                        },
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
        console.error('NOC Student fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 });
    }
}
