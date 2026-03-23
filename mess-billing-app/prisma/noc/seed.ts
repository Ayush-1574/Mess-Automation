import { PrismaClient } from '../../src/generated/noc-client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding NOC database...\n');

  // --- Seed Students ---
  const students = [
    { rollNo: '2023CSB1100', name: 'Aarav Sharma', fatherName: 'Rajesh Sharma', gender: 'MALE' as const, category: 'General', department: 'Computer Science and Engineering', course: 'B.Tech', batch: '2023', hostel: 'Chenab', roomNo: 'A-201', phone: '9876543210', email: 'aarav@iitrpr.ac.in', address: 'Delhi, India', feesPaid: true, joiningYear: '2023-24' },
    { rollNo: '2023CSB1101', name: 'Priya Gupta', fatherName: 'Suresh Gupta', gender: 'FEMALE' as const, category: 'OBC', department: 'Computer Science and Engineering', course: 'B.Tech', batch: '2023', hostel: 'Sutlej', roomNo: 'B-105', phone: '9876543211', email: 'priya@iitrpr.ac.in', address: 'Chandigarh, India', feesPaid: true, joiningYear: '2023-24' },
    { rollNo: '2023CSB1107', name: 'Ayush Sonika', fatherName: 'Ramesh Sonika', gender: 'MALE' as const, category: 'General', department: 'Computer Science and Engineering', course: 'B.Tech', batch: '2023', hostel: 'Chenab', roomNo: 'C-312', phone: '9876543217', email: 'ayush@iitrpr.ac.in', address: 'Ropar, Punjab', feesPaid: true, joiningYear: '2023-24' },
    { rollNo: '2023EEB1050', name: 'Rohit Kumar', fatherName: 'Anil Kumar', gender: 'MALE' as const, category: 'SC', department: 'Electrical Engineering', course: 'B.Tech', batch: '2023', hostel: 'Beas', roomNo: 'D-110', phone: '9876543212', email: 'rohit@iitrpr.ac.in', address: 'Ludhiana, India', feesPaid: true, joiningYear: '2023-24' },
    { rollNo: '2023MEB1030', name: 'Neha Singh', fatherName: 'Vikram Singh', gender: 'FEMALE' as const, category: 'General', department: 'Mechanical Engineering', course: 'B.Tech', batch: '2023', hostel: 'Sutlej', roomNo: 'A-302', phone: '9876543213', email: 'neha@iitrpr.ac.in', address: 'Jaipur, India', feesPaid: false, joiningYear: '2023-24' },
    { rollNo: '2022MCM2010', name: 'Arjun Patel', fatherName: 'Dinesh Patel', gender: 'MALE' as const, category: 'OBC', department: 'Mathematics', course: 'M.Tech', batch: '2022', hostel: 'Ravi', roomNo: 'E-204', phone: '9876543214', email: 'arjun@iitrpr.ac.in', address: 'Ahmedabad, India', feesPaid: true, joiningYear: '2022-23' },
    { rollNo: '2021PHD0015', name: 'Dr. Kavita Reddy', fatherName: 'Subramaniam Reddy', gender: 'FEMALE' as const, category: 'General', department: 'Chemistry', course: 'PhD', batch: '2021', hostel: 'Sutlej', roomNo: 'F-101', phone: '9876543215', email: 'kavita@iitrpr.ac.in', address: 'Hyderabad, India', feesPaid: true, joiningYear: '2021-22' },
    { rollNo: '2024CSB1200', name: 'Vihaan Mehta', fatherName: 'Prakash Mehta', gender: 'MALE' as const, category: 'General', department: 'Computer Science and Engineering', course: 'B.Tech', batch: '2024', hostel: 'Chenab', roomNo: 'B-410', phone: '9876543216', email: 'vihaan@iitrpr.ac.in', address: 'Mumbai, India', feesPaid: true, joiningYear: '2024-25' },
  ];

  for (const s of students) {
    await prisma.nocStudent.upsert({
      where: { rollNo: s.rollNo },
      update: {},
      create: s,
    });
    console.log(`  ✅ Student: ${s.rollNo} — ${s.name}`);
  }

  // --- Seed Officers ---
  const officers = [
    { name: 'Mr. Sunil Verma', email: 'admin.officer@iitrpr.ac.in', role: 'ADMIN_OFFICER' as const, course: 'B.Tech', batch: '2023' },
    { name: 'Mr. Rajiv Kapoor', email: 'joint.supt@iitrpr.ac.in', role: 'JOINT_SUPERINTENDENT' as const, course: null, batch: null },
    { name: 'Dr. Meena Agarwal', email: 'asst.registrar@iitrpr.ac.in', role: 'ASSISTANT_REGISTRAR' as const, course: null, batch: null },
  ];

  for (const o of officers) {
    await prisma.nocOfficer.upsert({
      where: { email: o.email },
      update: {},
      create: o,
    });
    console.log(`  ✅ Officer: ${o.role} — ${o.name}`);
  }

  console.log('\n🎉 NOC database seeded successfully!');
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
