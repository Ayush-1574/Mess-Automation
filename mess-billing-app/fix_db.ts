import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function run() {
  await prisma.$executeRaw`DELETE FROM "AccommodationRequest" WHERE "applicantId" NOT IN (SELECT id FROM "Student")`;
  console.log("Fixed!");
}
run();
