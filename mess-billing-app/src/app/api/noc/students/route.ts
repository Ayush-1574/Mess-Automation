import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';

// GET /api/noc/students — List all NOC students (for AR dashboard)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('department');
        const course = searchParams.get('course');
        const batch = searchParams.get('batch');

        const where: any = {};
        if (department) where.department = department;
        if (course) where.course = course;
        if (batch) where.batch = batch;

        const students = await nocPrisma.nocStudent.findMany({
            where,
            orderBy: [{ department: 'asc' }, { rollNo: 'asc' }],
            include: {
                _count: {
                    select: { applications: true },
                },
            },
        });

        return NextResponse.json(students);
    } catch (error) {
        console.error('Students fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
    }
}
