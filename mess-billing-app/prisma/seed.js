const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const messes = ['Anusha Mess', 'Konark Mess'];
    const courses = ['BTech', 'MTech', 'PhD'];
    const hostels = ['Chenab', 'Bias', 'Sutluj'];
    const batches = ['2023', '2024', '2025'];

    console.log('Start seeding ...');

    // Seed Courses
    for (const name of courses) {
        await prisma.course.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }

    // Seed Messes
    for (const name of messes) {
        await prisma.mess.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }

    // Seed a default Session
    await prisma.session.upsert({
        where: { name: '2026-I' },
        update: {},
        create: { name: '2026-I', startYear: 2026, semester: 'I' },
    });

    // Seed Students
    const allCourses = await prisma.course.findMany();
    for (let i = 0; i < 10; i++) {
        const batch = batches[i % batches.length];
        const hostel = hostels[i % hostels.length];
        const course = allCourses[i % allCourses.length];

        const seq = 1100 + i;
        const rollNo = `${batch}CSB${seq}`;
        const name = `Student ${rollNo}`;

        await prisma.student.upsert({
            where: { rollNo },
            update: {},
            create: {
                rollNo,
                name,
                batch,
                hostel,
                courseId: course.id,
                email: `${rollNo.toLowerCase()}@example.com`,
                bankAccountNo: `SBI${rollNo}`,
                bankName: 'SBI',
                ifsc: 'SBIN0001234',
                messSecurity: 5000.0,
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
