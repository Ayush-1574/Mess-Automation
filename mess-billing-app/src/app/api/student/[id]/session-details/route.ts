import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

import { Prisma } from '@prisma/client';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        let studentId: number;

        if (!isNaN(Number(id))) {
            studentId = Number(id);
        } else {
            const tempStudent = await prisma.student.findUnique({
                where: { rollNo: id },
                select: { id: true },
            });
            if (!tempStudent) {
                return NextResponse.json({ error: 'Student not found' }, { status: 404 });
            }
            studentId = tempStudent.id;
        }

        // Define the exact payload type based on what we're including
        type StudentWithRelations = {
            id: number;
            courseId: number | null;
            course: any;
            feesDeposited: any[];
            messAssignments: any[];
            monthlyRebates: any[];
        };

        const studentData = await prisma.student.findUnique({
            where: { id: studentId },
            include: {
                course: true,
                feesDeposited: { include: { session: true } } as any,
                messAssignments: true,
                monthlyRebates: { include: { session: true } } as any,
            },
        } as any);
        
        const student = studentData as unknown as StudentWithRelations | null;

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        // Get all sessions sequentially
        const sessions = await prisma.session.findMany({
            orderBy: [{ startYear: 'desc' }, { semester: 'desc' }],
        });

        const sessionDetails = await Promise.all(sessions.map(async (session) => {
            // Check if student has data for this session
            const deposited = student.feesDeposited.filter((f: any) => f.sessionId === session.id);
            const totalDeposited = deposited.reduce((sum: number, f: any) => sum + f.amount, 0);

            const assignments = student.messAssignments.filter((a: any) => a.sessionId === session.id);
            const rebates = student.monthlyRebates.filter((r: any) => r.sessionId === session.id);

            // Fetch distinct months that have rebate records for this session overall
            const sessionMonths = await prisma.monthlyRebate.findMany({
                where: { sessionId: session.id },
                distinct: ['month', 'year'],
                select: { month: true, year: true },
                orderBy: [{ year: 'asc' }, { month: 'asc' }],
            });

            // If no data at all for this session, skip
            if (deposited.length === 0 && assignments.length === 0 && rebates.length === 0 && sessionMonths.length === 0) {
                return null;
            }

            // Fetch mess rates for this session and this student's course
            const messRates = await prisma.messRate.findMany({
                where: {
                    sessionId: session.id,
                    courseId: student.courseId ?? -1,
                },
            });

            const assignment = assignments[0];
            let totalBill = 0;
            const months = [];

            for (const { month, year } of sessionMonths) {
                const daysInMonth = new Date(year, month, 0).getDate();
                const rebate = student.monthlyRebates.find((r: any) => r.month === month && r.year === year && r.sessionId === session.id);
                const rebateDays = rebate?.rebateDays ?? 0;
                const chargeableDays = daysInMonth - rebateDays;

                const rate = messRates.find(
                    (mr) =>
                        mr.messId === assignment?.messId &&
                        mr.month === month
                );

                const dailyRate = rate?.monthlyRate ?? 0;
                const gst = rate?.gstPercentage ?? 0;
                const amount = chargeableDays * dailyRate * (1 + gst / 100);

                totalBill += amount;

                months.push({
                    month,
                    year,
                    totalDays: daysInMonth,
                    rebateDays,
                    chargeableDays,
                    ratePerDay: dailyRate,
                    gst,
                    amount: parseFloat(amount.toFixed(2)),
                });
            }

            return {
                session,
                totalDeposited: parseFloat(totalDeposited.toFixed(2)),
                totalBill: parseFloat(totalBill.toFixed(2)),
                balance: parseFloat((totalDeposited - totalBill).toFixed(2)),
                months,
            };
        }));

        // Filter out nulls
        const result = sessionDetails.filter(s => s !== null);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error fetching session details:', error);
        return NextResponse.json({ error: 'Failed to fetch session details' }, { status: 500 });
    }
}
