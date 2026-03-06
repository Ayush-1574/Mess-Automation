import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        let student: any;
        if (!isNaN(Number(id))) {
            student = await prisma.student.findUnique({
                where: { id: Number(id) },
                include: {
                    course: true,
                    messAssignments: { include: { mess: true, session: true } },
                    monthlyRebates: { include: { session: true }, orderBy: [{ year: 'desc' }, { month: 'desc' }] },
                    feesDeposited: { include: { session: true }, orderBy: { paymentDate: 'desc' } },
                },
            });
        }

        if (!student) {
            student = await prisma.student.findUnique({
                where: { rollNo: id },
                include: {
                    course: true,
                    messAssignments: { include: { mess: true, session: true } },
                    monthlyRebates: { include: { session: true }, orderBy: [{ year: 'desc' }, { month: 'desc' }] },
                    feesDeposited: { include: { session: true }, orderBy: { paymentDate: 'desc' } },
                },
            });
        }

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json(student);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch student' }, { status: 500 });
    }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const body = await request.json();

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

        const currentStudent = await prisma.student.findUnique({ where: { id: studentId } });

        if (body.bankAccountNo !== undefined) {
            if (!currentStudent?.isBankEditable) {
                return NextResponse.json({ error: 'Bank details editing is disabled' }, { status: 403 });
            }
            const updated = await prisma.student.update({
                where: { id: studentId },
                data: { bankAccountNo: body.bankAccountNo, bankName: body.bankName, ifsc: body.ifsc }
            });
            return NextResponse.json(updated);
        }

        if (body.isBankEditable !== undefined) {
            const updated = await prisma.student.update({
                where: { id: studentId },
                data: { isBankEditable: body.isBankEditable }
            });
            return NextResponse.json(updated);
        }

        // General student profile update (address, messSecurity, courseId etc.)
        const allowedFields = ['address', 'messSecurity', 'courseId', 'hostel', 'batch', 'email'];
        const updateData: any = {};
        for (const field of allowedFields) {
            if (body[field] !== undefined) updateData[field] = body[field];
        }
        if (Object.keys(updateData).length > 0) {
            const updated = await prisma.student.update({ where: { id: studentId }, data: updateData });
            return NextResponse.json(updated);
        }

        return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });

    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update student' }, { status: 500 });
    }
}
