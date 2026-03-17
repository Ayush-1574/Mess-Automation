import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';

// GET /api/noc/officers — List all officers
// POST /api/noc/officers — Create a single officer
export async function GET() {
    try {
        const officers = await nocPrisma.nocOfficer.findMany({
            orderBy: [{ role: 'asc' }, { department: 'asc' }, { name: 'asc' }],
            include: {
                _count: {
                    select: { actions: true },
                },
            },
        });
        return NextResponse.json(officers);
    } catch (error) {
        console.error('Officers fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch officers' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, role, department, batch } = body;

        if (!name || !email || !role) {
            return NextResponse.json(
                { error: 'name, email, and role are required' },
                { status: 400 }
            );
        }

        if (!['ADMIN_OFFICER', 'JOINT_SUPERINTENDENT', 'ASSISTANT_REGISTRAR'].includes(role)) {
            return NextResponse.json(
                { error: 'role must be ADMIN_OFFICER, JOINT_SUPERINTENDENT, or ASSISTANT_REGISTRAR' },
                { status: 400 }
            );
        }

        const officer = await nocPrisma.nocOfficer.create({
            data: {
                name,
                email,
                role,
                department: department || null,
                batch: batch || null,
            },
        });

        return NextResponse.json(officer, { status: 201 });
    } catch (error: any) {
        if (error?.code === 'P2002') {
            return NextResponse.json({ error: 'An officer with this email already exists' }, { status: 409 });
        }
        console.error('Officer create error:', error);
        return NextResponse.json({ error: 'Failed to create officer' }, { status: 500 });
    }
}
