import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';

// GET /api/noc/officer/[id]/pending — Get applications pending this officer's action
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const officer = await nocPrisma.nocOfficer.findUnique({
            where: { id: Number(id) },
        });

        if (!officer) {
            return NextResponse.json({ error: 'Officer not found' }, { status: 404 });
        }

        // Determine which status this officer handles
        const roleStatusMap: Record<string, string> = {
            'ADMIN_OFFICER': 'PENDING_ADMIN',
            'JOINT_SUPERINTENDENT': 'PENDING_JOINT_SUPT',
            'ASSISTANT_REGISTRAR': 'PENDING_ASST_REGISTRAR',
        };

        const pendingStatus = roleStatusMap[officer.role];

        // Build the filter — routing by COURSE (not department)
        const whereClause: any = {
            status: pendingStatus,
        };

        // Admin Officer: filter by student's COURSE + BATCH
        if (officer.role === 'ADMIN_OFFICER') {
            whereClause.student = {};
            if (officer.course) {
                whereClause.student.course = officer.course;
            }
            if (officer.batch) {
                whereClause.student.batch = officer.batch;
            }
        }

        // Joint Superintendent: filter by student's COURSE
        if (officer.role === 'JOINT_SUPERINTENDENT') {
            if (officer.course) {
                whereClause.student = {
                    course: officer.course,
                };
            }
        }

        // AR: no additional filters (handles all)

        const applications = await nocPrisma.nocApplication.findMany({
            where: whereClause,
            include: {
                student: true,
                actions: {
                    include: { officer: true },
                    orderBy: { timestamp: 'asc' },
                },
            },
            orderBy: { createdAt: 'asc' },
        });

        return NextResponse.json({
            officer,
            pendingCount: applications.length,
            applications,
        });
    } catch (error) {
        console.error('Officer pending fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch pending applications' }, { status: 500 });
    }
}
