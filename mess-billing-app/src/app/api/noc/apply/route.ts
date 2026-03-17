import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';

// POST /api/noc/apply — Student submits a new NOC application
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { rollNo, certificateType, purpose, otherDetails } = body;

        if (!rollNo || !certificateType || !purpose) {
            return NextResponse.json(
                { error: 'rollNo, certificateType, and purpose are required' },
                { status: 400 }
            );
        }

        // Find the student
        const student = await nocPrisma.nocStudent.findUnique({
            where: { rollNo },
        });

        if (!student) {
            return NextResponse.json(
                { error: 'Student not found. Please contact the Assistant Registrar to register your details.' },
                { status: 404 }
            );
        }

        // Create the application
        const application = await nocPrisma.nocApplication.create({
            data: {
                studentId: student.id,
                certificateType,
                purpose,
                otherDetails: otherDetails || null,
                status: 'PENDING_ADMIN',
            },
            include: {
                student: true,
            },
        });

        return NextResponse.json(application, { status: 201 });
    } catch (error) {
        console.error('NOC Apply error:', error);
        return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
    }
}
