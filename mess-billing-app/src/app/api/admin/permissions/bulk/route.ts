import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { studentIds, isBankEditable } = body;

        if (!Array.isArray(studentIds) || typeof isBankEditable !== 'boolean') {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const updated = await prisma.student.updateMany({
            where: {
                id: {
                    in: studentIds
                }
            },
            data: {
                isBankEditable
            }
        });

        return NextResponse.json({ message: 'Permissions updated', count: updated.count });
    } catch (error) {
        console.error('Bulk update error:', error);
        return NextResponse.json({ error: 'Failed to update permissions' }, { status: 500 });
    }
}
