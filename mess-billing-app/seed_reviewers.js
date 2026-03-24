const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  await prisma.accommodationReviewer.deleteMany({});
  
  await prisma.accommodationReviewer.createMany({
    data: [
      { email: "smith@college.edu", name: "Dr. Smith", password: "password", role: "FACULTY", department: "CSE" },
      { email: "clark@college.edu", name: "Dr. Clark", password: "password", role: "FACULTY", department: "EE" },
      { email: "cse_hod@college.edu", name: "CSE HOD", password: "password", role: "HOD", department: "CSE" },
      { email: "ee_hod@college.edu", name: "EE HOD", password: "password", role: "HOD", department: "EE" },
      { email: "ar@college.edu", name: "Registrar", password: "password", role: "REGISTRAR", department: null },
      { email: "warden@college.edu", name: "Chief Warden", password: "password", role: "WARDEN", department: null }
    ]
  });
  console.log("Seeded explicit DB identities for CSE and EE HODs!");
}
run();
