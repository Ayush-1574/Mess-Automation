import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        // Try to find by ID first (legacy), if fails, try RollNo (new standard)
        // Actually ID passed might be string "2023CSB..."
        // If it's numeric, it might be DB ID.

        let student;
        if (!isNaN(Number(id))) {
            student = await prisma.student.findUnique({
                where: { id: Number(id) },
                include: { bills: true, rebates: true },
            });
        }

        if (!student) {
            student = await prisma.student.findUnique({
                where: { rollNo: id },
                include: { bills: true, rebates: true },
            });
        }

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        // Fetch Mess Base Rate if student has a mess assigned
        let messDetails = null;
        if (student.mess) {
            messDetails = await prisma.mess.findUnique({
                where: { name: student.mess }
            });
        }

        return NextResponse.json({ ...student, messBaseRate: messDetails?.baseRate });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 });
    }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const body = await request.json();

        // Identify student
        let studentId: number | undefined;
        if (!isNaN(Number(id))) {
            studentId = Number(id);
        } else {
            const s = await prisma.student.findUnique({ where: { rollNo: id } });
            if (s) studentId = s.id;
        }

        if (!studentId) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        // Check Update Type: Bank Details or Admin Toggle?
        // Since we don't have auth middleware yet, we'll allow both but in real app check roles.
        // For Bank Details, check if allowed.

        const currentStudent = await prisma.student.findUnique({ where: { id: studentId } });

        if (body.bankAccountNo !== undefined) {
            // Trying to update bank details
            if (!currentStudent?.isBankEditable) {
                return NextResponse.json({ error: 'Bank details editing is disabled' }, { status: 403 });
            }

            const updated = await prisma.student.update({
                where: { id: studentId },
                data: {
                    bankAccountNo: body.bankAccountNo,
                    bankName: body.bankName,
                    ifsc: body.ifsc,
                }
            });
            return NextResponse.json(updated);
        }

        if (body.isBankEditable !== undefined) {
            // Admin toggling permission
            const updated = await prisma.student.update({
                where: { id: studentId },
                data: {
                    isBankEditable: body.isBankEditable
                }
            });
            return NextResponse.json(updated);
        }

        return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });

    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update student' }, { status: 500 });
    }
}
