import { NextResponse } from 'next/server';
import { nocPrisma } from '@/lib/nocPrisma';

// PATCH /api/noc/applications/[id]/verify — Officer verifies or rejects
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const { officerId, action, remarks, signatureData } = body;

        if (!officerId || !action) {
            return NextResponse.json(
                { error: 'officerId and action (VERIFIED/REJECTED) are required' },
                { status: 400 }
            );
        }

        if (!['VERIFIED', 'REJECTED'].includes(action)) {
            return NextResponse.json(
                { error: 'action must be VERIFIED or REJECTED' },
                { status: 400 }
            );
        }

        const applicationId = Number(id);

        // Get the application
        const application = await nocPrisma.nocApplication.findUnique({
            where: { id: applicationId },
            include: { student: true },
        });

        if (!application) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 });
        }

        // Get the officer
        const officer = await nocPrisma.nocOfficer.findUnique({
            where: { id: Number(officerId) },
        }) as any;

        if (!officer) {
            return NextResponse.json({ error: 'Officer not found' }, { status: 404 });
        }

        // Validate that the officer can act on this application at the current stage
        const stageRoleMap: Record<string, string> = {
            'PENDING_ADMIN': 'ADMIN_OFFICER',
            'PENDING_JOINT_SUPT': 'JOINT_SUPERINTENDENT',
            'PENDING_ASST_REGISTRAR': 'ASSISTANT_REGISTRAR',
        };

        const requiredRole = stageRoleMap[application.status];
        if (!requiredRole) {
            return NextResponse.json(
                { error: 'Application is not in a verifiable state' },
                { status: 400 }
            );
        }

        if (officer.role !== requiredRole) {
            return NextResponse.json(
                { error: `This application requires a ${requiredRole} to act at this stage` },
                { status: 403 }
            );
        }

        // For Admin Officer: validate COURSE + BATCH match
        if (officer.role === 'ADMIN_OFFICER') {
            if (officer.course && officer.course !== application.student.course) {
                return NextResponse.json(
                    { error: 'This application belongs to a different course' },
                    { status: 403 }
                );
            }
            if (officer.batch && officer.batch !== application.student.batch) {
                return NextResponse.json(
                    { error: 'This application belongs to a different batch' },
                    { status: 403 }
                );
            }
        }

        // For Joint Superintendent: validate COURSE match
        if (officer.role === 'JOINT_SUPERINTENDENT') {
            if (officer.course && officer.course !== application.student.course) {
                return NextResponse.json(
                    { error: 'This application belongs to a different course' },
                    { status: 403 }
                );
            }
        }

        // AR must provide a signature when approving
        if (officer.role === 'ASSISTANT_REGISTRAR' && action === 'VERIFIED') {
            const finalSignature = signatureData || officer.signatureData;
            if (!finalSignature) {
                return NextResponse.json(
                    { error: 'A signature is required to approve. Please draw or upload your signature.' },
                    { status: 400 }
                );
            }
        }

        // Determine next status
        let nextStatus: string;
        if (action === 'REJECTED') {
            nextStatus = 'REJECTED';
        } else {
            const stageFlow: Record<string, string> = {
                'PENDING_ADMIN': 'PENDING_JOINT_SUPT',
                'PENDING_JOINT_SUPT': 'PENDING_ASST_REGISTRAR',
                'PENDING_ASST_REGISTRAR': 'APPROVED',
            };
            nextStatus = stageFlow[application.status];
        }

        // Use a transaction to create action + update status + generate certificate
        const result = await nocPrisma.$transaction(async (tx) => {
            await tx.nocAction.create({
                data: {
                    applicationId,
                    officerId: officer.id,
                    stage: application.status,
                    action,
                    remarks: remarks || null,
                },
            });

            const updated = await tx.nocApplication.update({
                where: { id: applicationId },
                data: { status: nextStatus as any },
                include: { student: true },
            });

            // If approved by AR, generate the certificate with signature
            if (nextStatus === 'APPROVED') {
                const student = updated.student;
                const certText = generateCertificateText(student, updated, officer);
                const finalSignature = signatureData || officer.signatureData;

                // Save sthe signature to the officer's profile if they provided a new one
                if (signatureData && signatureData !== officer.signatureData) {
                    await tx.nocOfficer.update({
                        where: { id: officer.id },
                        data: { signatureData } as any,
                    });
                }

                await tx.nocCertificate.create({
                    data: {
                        applicationId,
                        fileNo: `IITRPR/Acad-${student.course === 'PhD' ? 'PhD' : student.course === 'M.Tech' ? 'PG' : 'UG'}/${new Date().getFullYear()}`,
                        certifiedText: certText,
                        signedBy: officer.name,
                        signatureData: finalSignature || null,
                        academicYear: getAcademicYear(),
                    } as any,
                });
            }

            return updated;
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Verify error:', error);
        return NextResponse.json({ error: 'Failed to process verification' }, { status: 500 });
    }
}

function generateCertificateText(student: any, application: any, signingOfficer: any): string {
    const genderPrefix = student.gender === 'MALE' ? 'Mr.' : student.gender === 'FEMALE' ? 'Ms.' : 'Mr./Ms.';
    const genderPronoun = student.gender === 'MALE' ? 'He' : student.gender === 'FEMALE' ? 'She' : 'He/She';
    const courseType = student.course === 'PhD' ? 'PhD' : student.course === 'M.Tech' ? 'postgraduate' : 'undergraduate';

    let text = `This is to certify that ${genderPrefix} ${student.name}`;
    if (student.fatherName) {
        text += ` S/o ${student.fatherName}`;
    }
    text += ` bearing Entry No. ${student.rollNo} is a bonafide student of Indian Institute of Technology Ropar.`;
    text += ` ${genderPronoun} is studying in the ${courseType} course in the Department of ${student.department}.`;
    if (student.joiningYear) {
        text += ` ${genderPronoun} joined this Institute in the academic year ${student.joiningYear}.`;
    }
    if (student.hostel && student.roomNo) {
        text += ` ${genderPronoun} is currently staying in the Room No. ${student.roomNo}, ${student.hostel} Hostel, IIT Ropar, Rupnagar — 140001.`;
    }
    text += `\n\nThis certificate is issued on the request of the student to ${application.purpose} for the AY ${getAcademicYear()}.`;

    return text;
}

function getAcademicYear(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    if (month >= 6) {
        return `${year}-${(year + 1).toString().slice(2)}`;
    }
    return `${year - 1}-${year.toString().slice(2)}`;
}
