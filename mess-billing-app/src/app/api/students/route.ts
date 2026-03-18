import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeStudents } from '@/lib/sanitize';

// GET /api/students — list students, optionally filtered by hostelId
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const hostelId = searchParams.get('hostelId');

        const where: any = {};
        if (hostelId) where.hostelId = Number(hostelId);

        const students = await prisma.student.findMany({
            where,
            include: {
                course: true,
                hostelRef: true,
            },
            orderBy: { entryNo: 'asc' },
        });

        return NextResponse.json(sanitizeStudents(students));
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
    }
}
