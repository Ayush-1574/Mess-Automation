const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  await prisma.$executeRawUnsafe(`DELETE FROM "AccommodationRequest" WHERE "applicantId" NOT IN (SELECT id FROM "Student")`);
  console.log("Fixed!");
}
run();
