import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    console.log('GET /api/admin/students called');
    try {
        const students = await prisma.student.findMany({
            select: {
                id: true,
                rollNo: true,
                name: true,
                batch: true,
                mess: true,
                hostel: true,
                isBankEditable: true,
            },
            orderBy: {
                rollNo: 'asc'
            }
        });
        return NextResponse.json(students);
    } catch (error) {
        console.error('Failed to fetch students:', error);
        return NextResponse.json({ error: 'Failed to fetch students', details: String(error) }, { status: 500 });
    }
}
