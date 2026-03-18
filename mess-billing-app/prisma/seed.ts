import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const batches = ['2023', '2024', '2025'];
    const messes = ['Anusha Mess', 'Konark Mess'];
    const hostels = ['Chenab', 'Bias', 'Sutluj'];

    console.log('Start seeding ...');

    // Seed Courses
    const courses = [];
    for (const name of ['BTech', 'MTech', 'PhD']) {
        const course = await prisma.course.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        courses.push(course);
    }

    // Seed Session
    const session = await prisma.session.upsert({
        where: { name: '2026-I' },
        update: {},
        create: { name: '2026-I', startYear: 2026, semester: 'I' },
    });

    // Seed Messes
    const messesData = [];
    for (const name of messes) {
        const mess = await prisma.mess.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        messesData.push(mess);
    }

    // Seed Mess Rates
    for (const mess of messesData) {
        await prisma.messRate.upsert({
            where: { messId_sessionId_month: { messId: mess.id, sessionId: session.id, month: 1 } },
            update: {},
            create: { messId: mess.id, sessionId: session.id, month: 1, monthlyRate: 150.0 },
        });
    }

    // Seed Students
    for (let i = 0; i < 30; i++) {
        const batch = batches[i % batches.length];
        const hostel = hostels[i % hostels.length];
        const mess = messesData[i % messesData.length];
        const course = courses[i % courses.length];

        const seq = 1100 + i;
        const entryNo = `${batch}CSB${seq}`;
        const name = `Student ${entryNo}`;

        const student = await prisma.student.upsert({
            where: { entryNo },
            update: {},
            create: {
                entryNo,
                name,
                batch,
                hostel,
                email: `${entryNo.toLowerCase()}@example.com`,
                bankAccountNo: `SBI${entryNo}`,
                bankName: 'SBI',
                ifsc: 'SBIN0001234',
                courseId: course.id
            }
        });

        // Create Mess Assignment
        await prisma.studentMessAssignment.upsert({
            where: {
                studentId_sessionId: { studentId: student.id, sessionId: session.id }
            },
            update: {},
            create: { studentId: student.id, messId: mess.id, sessionId: session.id }
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
