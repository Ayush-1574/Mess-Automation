import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const students = await prisma.student.findMany({
            select: {
                id: true,
                rollNo: true,
                name: true,
                batch: true,
                hostel: true,
                isBankEditable: true,
                course: { select: { id: true, name: true } },
                messAssignments: {
                    include: { mess: true, session: true }
                },
            },
            orderBy: { rollNo: 'asc' }
        });
        return NextResponse.json(students);
    } catch (error) {
        console.error('Failed to fetch students:', error);
        return NextResponse.json({ error: 'Failed to fetch students', details: String(error) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { rollNo, name, batch, courseId, hostel, email, address, messSecurity, bankAccountNo, bankName, ifsc } = body;

        if (!rollNo || !name) {
            return NextResponse.json({ error: 'Roll Number and Name are required' }, { status: 400 });
        }

        // Check for duplicate rollNo
        const existing = await prisma.student.findUnique({ where: { rollNo } });
        if (existing) {
            return NextResponse.json({ error: `Student with Roll No ${rollNo} already exists` }, { status: 409 });
        }

        const student = await prisma.student.create({
            data: {
                rollNo,
                name,
                batch: batch || null,
                courseId: courseId ? Number(courseId) : null,
                hostel: hostel || null,
                email: email || null,
                address: address || null,
                messSecurity: messSecurity ? Number(messSecurity) : 0,
                bankAccountNo: bankAccountNo || null,
                bankName: bankName || null,
                ifsc: ifsc || null,
            },
            include: { course: true }
        });

        return NextResponse.json({ message: 'Student added successfully', student }, { status: 201 });
    } catch (error) {
        console.error('Failed to add student:', error);
        return NextResponse.json({ error: 'Failed to add student', details: String(error) }, { status: 500 });
    }
}

