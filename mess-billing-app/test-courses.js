// test-courses.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const students = await prisma.student.findMany({ select: { rollNo: true, courseId: true } });
    const withoutCourse = students.filter(s => !s.courseId);
    console.log(`Total students: ${students.length}`);
    console.log(`Students without course: ${withoutCourse.length}`);
    if (withoutCourse.length > 0) {
        console.log(`First 5 without course:`, withoutCourse.slice(0, 5).map(s => s.rollNo).join(', '));
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
