import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/hostel-assignments — assign a student to a hostel
export async function POST(request: Request) {
    try {
        const { entryNo, hostelName } = await request.json();
        if (!entryNo || !hostelName) {
            return NextResponse.json({ error: 'entryNo and hostelName are required' }, { status: 400 });
        }

        const student = await prisma.student.findUnique({ where: { entryNo } });
        if (!student) return NextResponse.json({ error: `Student ${entryNo} not found` }, { status: 404 });

        // Upsert hostel
        const hostel = await prisma.hostel.upsert({
            where: { name: hostelName.trim() },
            update: {},
            create: { name: hostelName.trim() },
        });

        const updated = await prisma.student.update({
            where: { id: student.id },
            data: { hostelId: hostel.id, hostel: hostel.name },
            include: { hostelRef: true, course: true },
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to assign hostel' }, { status: 500 });
    }
}

// DELETE /api/hostel-assignments — remove hostel assignment from a student
export async function DELETE(request: Request) {
    try {
        const { studentId } = await request.json();
        if (!studentId) return NextResponse.json({ error: 'studentId is required' }, { status: 400 });

        await prisma.student.update({
            where: { id: Number(studentId) },
            data: { hostelId: null, hostel: null },
        });

        return NextResponse.json({ message: 'Hostel assignment removed' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to remove assignment' }, { status: 500 });
    }
}
