import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';

// GET /api/noc/officer/[id]/managed-data — Get data this officer can view/manage
// Supports query params: tab, course, batch, department, status, search
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const { searchParams } = new URL(request.url);
        const tab = searchParams.get('tab') || 'students';

        // Optional filters from query
        const filterCourse = searchParams.get('course');
        const filterBatch = searchParams.get('batch');
        const filterDepartment = searchParams.get('department');
        const filterStatus = searchParams.get('status');
        const filterRole = searchParams.get('role');
        const search = searchParams.get('search');

        const officer = await nocPrisma.nocOfficer.findUnique({
            where: { id: Number(id) },
        });

        if (!officer) {
            return NextResponse.json({ error: 'Officer not found' }, { status: 404 });
        }

        // Build base student filter from role
        const baseStudentFilter: any = {};
        if (officer.role === 'ADMIN_OFFICER') {
            if (officer.course) baseStudentFilter.course = officer.course;
            if (officer.batch) baseStudentFilter.batch = officer.batch;
        } else if (officer.role === 'JOINT_SUPERINTENDENT') {
            if (officer.course) baseStudentFilter.course = officer.course;
        }

        if (tab === 'students') {
            const where: any = { ...baseStudentFilter };
            // Apply additional user filters (only if within scope)
            if (filterCourse && !baseStudentFilter.course) where.course = filterCourse;
            if (filterBatch && !baseStudentFilter.batch) where.batch = filterBatch;
            if (filterDepartment) where.department = filterDepartment;
            if (search) {
                where.OR = [
                    { name: { contains: search, mode: 'insensitive' } },
                    { rollNo: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ];
            }

            const students = await nocPrisma.nocStudent.findMany({
                where,
                orderBy: [{ course: 'asc' }, { batch: 'asc' }, { rollNo: 'asc' }],
                include: { _count: { select: { applications: true } } },
            });

            // Get unique values for filter dropdowns
            const allStudents = await nocPrisma.nocStudent.findMany({
                where: baseStudentFilter,
                select: { course: true, batch: true, department: true },
                distinct: ['course', 'batch', 'department'],
            });
            const filterOptions = {
                courses: [...new Set(allStudents.map(s => s.course).filter(Boolean))].sort(),
                batches: [...new Set(allStudents.map(s => s.batch).filter(Boolean))].sort(),
                departments: [...new Set(allStudents.map(s => s.department).filter(Boolean))].sort(),
            };

            return NextResponse.json({ officer, students, filterOptions });
        }

        if (tab === 'officers') {
            if (officer.role === 'ADMIN_OFFICER') {
                return NextResponse.json({ officer, officers: [], filterOptions: { roles: [], courses: [] } });
            }

            const where: any = {};
            if (officer.role === 'JOINT_SUPERINTENDENT') {
                where.role = 'ADMIN_OFFICER';
                if (officer.course) where.course = officer.course;
            }
            if (filterRole && officer.role === 'ASSISTANT_REGISTRAR') where.role = filterRole;
            if (filterCourse && !where.course) where.course = filterCourse;
            if (search) {
                where.OR = [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ];
            }

            const officers = await nocPrisma.nocOfficer.findMany({
                where,
                orderBy: [{ role: 'asc' }, { course: 'asc' }, { name: 'asc' }],
                include: { _count: { select: { actions: true } } },
            });

            const allOfficers = await nocPrisma.nocOfficer.findMany({
                where: officer.role === 'JOINT_SUPERINTENDENT' ? { role: 'ADMIN_OFFICER', ...(officer.course ? { course: officer.course } : {}) } : {},
                select: { role: true, course: true },
                distinct: ['role', 'course'],
            });
            const filterOptions = {
                roles: [...new Set(allOfficers.map(o => o.role))].sort(),
                courses: [...new Set(allOfficers.map(o => o.course).filter(Boolean))].sort(),
            };

            return NextResponse.json({ officer, officers, filterOptions });
        }

        if (tab === 'applications') {
            const studentWhere: any = { ...baseStudentFilter };
            if (filterCourse && !baseStudentFilter.course) studentWhere.course = filterCourse;
            if (filterBatch && !baseStudentFilter.batch) studentWhere.batch = filterBatch;

            const appWhere: any = { student: studentWhere };
            if (filterStatus && filterStatus !== 'ALL') appWhere.status = filterStatus;
            if (search) {
                appWhere.student = {
                    ...studentWhere,
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { rollNo: { contains: search, mode: 'insensitive' } },
                    ],
                };
            }

            const applications = await nocPrisma.nocApplication.findMany({
                where: appWhere,
                include: {
                    student: true,
                    actions: { include: { officer: true }, orderBy: { timestamp: 'asc' } },
                    certificate: true,
                },
                orderBy: { createdAt: 'desc' },
            });
            return NextResponse.json({ officer, applications });
        }

        return NextResponse.json({ error: 'Invalid tab parameter' }, { status: 400 });
    } catch (error) {
        console.error('Managed data fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

// POST /api/noc/officer/[id]/managed-data — Add a student or officer individually
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const { type, data } = body;

        const officer = await nocPrisma.nocOfficer.findUnique({ where: { id: Number(id) } });
        if (!officer) return NextResponse.json({ error: 'Officer not found' }, { status: 404 });

        if (type === 'student') {
            if (!data.rollNo || !data.name || !data.department || !data.course) {
                return NextResponse.json({ error: 'rollNo, name, department, and course are required' }, { status: 400 });
            }
            // Check duplicate
            const existing = await nocPrisma.nocStudent.findUnique({ where: { rollNo: data.rollNo } });
            if (existing) return NextResponse.json({ error: `Student with roll number ${data.rollNo} already exists` }, { status: 409 });

            const created = await nocPrisma.nocStudent.create({ data });
            return NextResponse.json(created, { status: 201 });
        }

        if (type === 'officer') {
            if (officer.role === 'ADMIN_OFFICER') {
                return NextResponse.json({ error: 'Admin Officers cannot add officer records' }, { status: 403 });
            }
            if (!data.name || !data.email || !data.role) {
                return NextResponse.json({ error: 'name, email, and role are required' }, { status: 400 });
            }
            const validRoles = ['ADMIN_OFFICER', 'JOINT_SUPERINTENDENT', 'ASSISTANT_REGISTRAR'];
            if (!validRoles.includes(data.role)) {
                return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
            }
            // JS can only add admin officers
            if (officer.role === 'JOINT_SUPERINTENDENT' && data.role !== 'ADMIN_OFFICER') {
                return NextResponse.json({ error: 'Joint Superintendents can only add Admin Officers' }, { status: 403 });
            }
            const existing = await nocPrisma.nocOfficer.findUnique({ where: { email: data.email } });
            if (existing) return NextResponse.json({ error: `Officer with email ${data.email} already exists` }, { status: 409 });

            const created = await nocPrisma.nocOfficer.create({ data });
            return NextResponse.json(created, { status: 201 });
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    } catch (error) {
        console.error('Add error:', error);
        return NextResponse.json({ error: 'Failed to add record' }, { status: 500 });
    }
}

// PATCH /api/noc/officer/[id]/managed-data — Update a student or officer record
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const { type, targetId, data } = body;

        const officer = await nocPrisma.nocOfficer.findUnique({ where: { id: Number(id) } });
        if (!officer) return NextResponse.json({ error: 'Officer not found' }, { status: 404 });

        if (type === 'student') {
            const student = await nocPrisma.nocStudent.findUnique({ where: { id: Number(targetId) } });
            if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

            if (officer.role === 'ADMIN_OFFICER') {
                if (officer.course && officer.course !== student.course) return NextResponse.json({ error: 'Access denied: different course' }, { status: 403 });
                if (officer.batch && officer.batch !== student.batch) return NextResponse.json({ error: 'Access denied: different batch' }, { status: 403 });
            } else if (officer.role === 'JOINT_SUPERINTENDENT') {
                if (officer.course && officer.course !== student.course) return NextResponse.json({ error: 'Access denied: different course' }, { status: 403 });
            }

            const allowedFields = ['name', 'fatherName', 'gender', 'category', 'department', 'course', 'batch', 'hostel', 'roomNo', 'phone', 'email', 'address', 'feesPaid', 'joiningYear'];
            const updateData: any = {};
            for (const f of allowedFields) { if (data[f] !== undefined) updateData[f] = data[f]; }

            const updated = await nocPrisma.nocStudent.update({ where: { id: Number(targetId) }, data: updateData });
            return NextResponse.json(updated);
        }

        if (type === 'officer') {
            if (officer.role === 'ADMIN_OFFICER') return NextResponse.json({ error: 'Admin Officers cannot update officers' }, { status: 403 });
            const target = await nocPrisma.nocOfficer.findUnique({ where: { id: Number(targetId) } });
            if (!target) return NextResponse.json({ error: 'Officer not found' }, { status: 404 });
            if (officer.role === 'JOINT_SUPERINTENDENT') {
                if (target.role !== 'ADMIN_OFFICER') return NextResponse.json({ error: 'JS can only update Admin Officers' }, { status: 403 });
                if (officer.course && officer.course !== target.course) return NextResponse.json({ error: 'Access denied: different course' }, { status: 403 });
            }

            const allowedFields = ['name', 'email', 'course', 'batch', 'signatureData'];
            const updateData: any = {};
            for (const f of allowedFields) { if (data[f] !== undefined) updateData[f] = data[f]; }

            const updated = await nocPrisma.nocOfficer.update({ where: { id: Number(targetId) }, data: updateData });
            return NextResponse.json(updated);
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

// DELETE /api/noc/officer/[id]/managed-data — Delete a student or officer record
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const targetId = searchParams.get('targetId');

        if (!type || !targetId) {
            return NextResponse.json({ error: 'type and targetId query params are required' }, { status: 400 });
        }

        const officer = await nocPrisma.nocOfficer.findUnique({ where: { id: Number(id) } });
        if (!officer) return NextResponse.json({ error: 'Officer not found' }, { status: 404 });

        if (type === 'student') {
            const student = await nocPrisma.nocStudent.findUnique({
                where: { id: Number(targetId) },
                include: { _count: { select: { applications: true } } },
            });
            if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

            // Access check
            if (officer.role === 'ADMIN_OFFICER') {
                if (officer.course && officer.course !== student.course) return NextResponse.json({ error: 'Access denied: different course' }, { status: 403 });
                if (officer.batch && officer.batch !== student.batch) return NextResponse.json({ error: 'Access denied: different batch' }, { status: 403 });
            } else if (officer.role === 'JOINT_SUPERINTENDENT') {
                if (officer.course && officer.course !== student.course) return NextResponse.json({ error: 'Access denied: different course' }, { status: 403 });
            }

            // Cannot delete student with active applications
            if (student._count.applications > 0) {
                return NextResponse.json({ error: `Cannot delete: student has ${student._count.applications} application(s)` }, { status: 400 });
            }

            await nocPrisma.nocStudent.delete({ where: { id: Number(targetId) } });
            return NextResponse.json({ message: 'Student deleted successfully' });
        }

        if (type === 'officer') {
            if (officer.role === 'ADMIN_OFFICER') return NextResponse.json({ error: 'Admin Officers cannot delete officers' }, { status: 403 });

            const target = await nocPrisma.nocOfficer.findUnique({
                where: { id: Number(targetId) },
                include: { _count: { select: { actions: true } } },
            });
            if (!target) return NextResponse.json({ error: 'Officer not found' }, { status: 404 });

            // Can't delete yourself
            if (target.id === officer.id) return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });

            if (officer.role === 'JOINT_SUPERINTENDENT') {
                if (target.role !== 'ADMIN_OFFICER') return NextResponse.json({ error: 'JS can only delete Admin Officers' }, { status: 403 });
                if (officer.course && officer.course !== target.course) return NextResponse.json({ error: 'Access denied: different course' }, { status: 403 });
            }

            // Cannot delete officer with actions
            if (target._count.actions > 0) {
                return NextResponse.json({ error: `Cannot delete: officer has ${target._count.actions} action(s) on record` }, { status: 400 });
            }

            await nocPrisma.nocOfficer.delete({ where: { id: Number(targetId) } });
            return NextResponse.json({ message: 'Officer deleted successfully' });
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
