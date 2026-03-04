import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const batches = ['2023', '2024', '2025'];
    const messes = ['Anusha Mess', 'Konark Mess'];
    const hostels = ['Chenab', 'Bias', 'Sutluj'];

    console.log('Start seeding ...');

    // Seed Messes
    for (const name of messes) {
        await prisma.mess.upsert({
            where: { name },
            update: {},
            create: { name, baseRate: 150.0 },
        })
    }

    // Seed Students
    for (let i = 0; i < 30; i++) {
        const batch = batches[i % batches.length];

        // Distribute messed and hostels
        const mess = messes[i % messes.length];
        const hostel = hostels[i % hostels.length];

        const seq = 1100 + i;
        const rollNo = `${batch}CSB${seq}`;
        const name = `Student ${rollNo}`;

        const student = await prisma.student.upsert({
            where: { rollNo },
            update: {},
            create: {
                rollNo,
                name,
                batch,
                hostel,
                mess,
                email: `${rollNo.toLowerCase()}@example.com`,
                bankAccountNo: `SBI${rollNo}`,
                bankName: 'SBI',
                ifsc: 'SBIN0001234'
            }
        });

        // Create Bill
        await prisma.bill.upsert({
            where: {
                studentId_month_year: {
                    studentId: student.id,
                    month: 'January',
                    year: 2026
                }
            },
            update: {},
            create: {
                studentId: student.id,
                month: 'January',
                year: 2026,
                totalDays: 31,
                ratePerDay: 150,
                totalAmount: 4650,
                isPaid: false
            }
        });
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
