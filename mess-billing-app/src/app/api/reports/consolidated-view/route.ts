import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // Default to current year/sem if not provided, but for now let's just fetch all bills
    // In a real app, parsing start/end range is needed.
    // Let's assume the frontend asks for a specific range or we return "Current Semester" by default.
    // For simplicity, we fetch all bills for now to populate the view.

    try {
        const students = await prisma.student.findMany({
            include: {
                bills: true,
                // mess: true // mess is a string name, not a relation in this schema version
            },
            orderBy: {
                rollNo: 'asc'
            }
        });

        // Transform data
        const reportData = students.map(s => {
            const bills = s.bills;
            const totalBilled = bills.reduce((sum, b) => sum + b.totalAmount, 0);

            // Refund logic is custom, usually rebate is a reduction in bill, but if "Refund Process" is separate:
            // For now, hardcode 0 or derive from something else.
            const refund = 0;

            return {
                id: s.id,
                rollNo: s.rollNo,
                name: s.name,
                batch: s.batch,
                mess: s.mess,
                hostel: s.hostel,
                bankAccountNo: s.bankAccountNo,
                bankName: s.bankName,
                ifsc: s.ifsc,
                feeCollected: s.openingBalance || 0,
                bills: bills.map(b => ({
                    month: b.month,
                    year: b.year,
                    amount: b.totalAmount
                })),
                totalBilled,
                refund,
                balance: (s.openingBalance || 0) - totalBilled + refund
            };
        });

        return NextResponse.json(reportData);
    } catch (error) {
        console.error('Consolidated view error:', error);
        return NextResponse.json({ error: 'Failed to fetch report data' }, { status: 500 });
    }
}
