// Seed script for NOC database
// Run with: node prisma/noc/seed.js
// Requires: NOC_DATABASE_URL in .env and prisma client generated

const { PrismaClient } = require('../../src/generated/noc-client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding NOC database...\n');

    // --- Officers ---
    // Admin Officers: assigned by COURSE + BATCH
    // Joint Superintendents: assigned by COURSE
    // Assistant Registrar: handles all
    const officers = [
        // Admin Officers (by course + batch)
        { name: 'Dr. Rakesh Sharma', email: 'rakesh.ao@iitrpr.ac.in', role: 'ADMIN_OFFICER', course: 'B.Tech', batch: '2023' },
        { name: 'Dr. Priya Mehta', email: 'priya.ao@iitrpr.ac.in', role: 'ADMIN_OFFICER', course: 'B.Tech', batch: '2022' },
        { name: 'Dr. Amit Gupta', email: 'amit.ao@iitrpr.ac.in', role: 'ADMIN_OFFICER', course: 'M.Tech', batch: '2023' },
        { name: 'Dr. Sunita Verma', email: 'sunita.ao@iitrpr.ac.in', role: 'ADMIN_OFFICER', course: 'M.Tech', batch: '2022' },
        { name: 'Dr. Rajesh Kumar', email: 'rajesh.ao@iitrpr.ac.in', role: 'ADMIN_OFFICER', course: 'PhD', batch: null },

        // Joint Superintendents (by course)
        { name: 'Mr. Vikram Singh', email: 'vikram.js@iitrpr.ac.in', role: 'JOINT_SUPERINTENDENT', course: 'B.Tech', batch: null },
        { name: 'Mr. Harish Patel', email: 'harish.js@iitrpr.ac.in', role: 'JOINT_SUPERINTENDENT', course: 'M.Tech', batch: null },
        { name: 'Mr. Suresh Agarwal', email: 'suresh.js@iitrpr.ac.in', role: 'JOINT_SUPERINTENDENT', course: 'PhD', batch: null },

        // Assistant Registrar (one for all)
        { name: 'Dr. Anil Kumar', email: 'anil.ar@iitrpr.ac.in', role: 'ASSISTANT_REGISTRAR', course: null, batch: null },
    ];

    for (const off of officers) {
        await prisma.nocOfficer.upsert({
            where: { email: off.email },
            update: off,
            create: off,
        });
    }
    console.log(`✓ Seeded ${officers.length} officers`);

    // --- Students ---
    const students = [
        { rollNo: '2023CSB1107', name: 'Vishwan Goud', fatherName: 'Mr. Goud', gender: 'MALE', category: 'General', department: 'Computer Science and Engineering', course: 'B.Tech', batch: '2023', hostel: 'Chenab', roomNo: 'CW-208', phone: '9876543210', email: 'vishwan@iitrpr.ac.in', feesPaid: true, joiningYear: '2023-24' },
        { rollNo: '2023CEB1021', name: 'Aaditya Sagar', fatherName: 'Mr. Vineet Kumar Sagar', gender: 'MALE', category: 'General', department: 'Civil Engineering', course: 'B.Tech', batch: '2023', hostel: 'Chenab', roomNo: 'CW-208', phone: '9876543211', email: 'aaditya@iitrpr.ac.in', feesPaid: true, joiningYear: '2023-24' },
        { rollNo: '2023EEB1050', name: 'Ravi Kumar', fatherName: 'Mr. Suresh Kumar', gender: 'MALE', category: 'OBC', department: 'Electrical Engineering', course: 'B.Tech', batch: '2023', hostel: 'Beas', roomNo: 'BW-105', phone: '9876543212', email: 'ravi@iitrpr.ac.in', feesPaid: true, joiningYear: '2023-24' },
        { rollNo: '2022MCS2010', name: 'Sneha Reddy', fatherName: 'Mr. Reddy', gender: 'FEMALE', category: 'General', department: 'Computer Science and Engineering', course: 'M.Tech', batch: '2022', hostel: 'Satluj', roomNo: 'SW-301', phone: '9876543213', email: 'sneha@iitrpr.ac.in', feesPaid: true, joiningYear: '2022-23' },
        { rollNo: '2023MEB1030', name: 'Arjun Patel', fatherName: 'Mr. Dinesh Patel', gender: 'MALE', category: 'General', department: 'Mechanical Engineering', course: 'B.Tech', batch: '2023', hostel: 'Chenab', roomNo: 'CE-120', phone: '9876543214', email: 'arjun@iitrpr.ac.in', feesPaid: true, joiningYear: '2023-24' },
    ];

    for (const stu of students) {
        await prisma.nocStudent.upsert({
            where: { rollNo: stu.rollNo },
            update: stu,
            create: stu,
        });
    }
    console.log(`✓ Seeded ${students.length} students`);

    console.log('\n✅ NOC database seeded successfully!');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
