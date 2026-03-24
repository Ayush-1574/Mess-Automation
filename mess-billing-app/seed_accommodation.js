const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  console.log('Seeding dummy accommodation requests...');
  
  // Clear existing to avoid clutter if we run this multiple times
  await prisma.accommodationRequest.deleteMany({});
  
  // Create some requests for the current session (2026-3)
  const currentSession = "2026-I";
  const oldSession = "2025-11";
  
  const dummyData = [
    // 1. Completely pending in Current Session (Needs Mentor Action)
    {
      applicantType: "intern",
      applicantName: "John Doe",
      gender: "Male",
      department: "CSE",
      contactNo: "9876543210",
      address: "123 Elm St, NY",
      mentorName: "Dr. Smith",
      mentorEmail: "smith@college.edu",
      arrivalDate: new Date("2026-04-01T10:00:00Z"),
      arrivalTime: "10:00",
      departureDate: new Date("2026-06-01T10:00:00Z"),
      departureTime: "10:00",
      financialSupportAmount: 5000,
      category: "A",
      session: currentSession,
      mentorStatus: "PENDING",
      hodStatus: "PENDING",
      registrarStatus: "PENDING",
      wardenStatus: "PENDING",
      overallStatus: "PENDING",
    },
    // 2. Approved by Mentor, Pending HOD
    {
      applicantType: "project_staff",
      applicantName: "Alice Wonderland",
      gender: "Female",
      department: "EE",
      contactNo: "9876543211",
      address: "456 Oak St, CA",
      mentorName: "Dr. Smith",
      mentorEmail: "smith@college.edu",
      arrivalDate: new Date("2026-04-15T10:00:00Z"),
      arrivalTime: "12:00",
      departureDate: new Date("2026-08-15T10:00:00Z"),
      departureTime: "12:00",
      financialSupportAmount: 0,
      category: "B",
      session: currentSession,
      mentorStatus: "APPROVED",
      hodStatus: "PENDING",
      registrarStatus: "PENDING",
      wardenStatus: "PENDING",
      overallStatus: "PENDING",
      mentorRemarks: "Approved for summer project.",
    },
    // 3. Approved by Mentor, HOD, Pending Registrar
    {
      applicantType: "intern",
      applicantName: "Bob Builder",
      gender: "Male",
      department: "CSE",
      contactNo: "9876543212",
      address: "789 Pine St, TX",
      mentorName: "Dr. Clark",
      mentorEmail: "clark@college.edu",
      arrivalDate: new Date("2026-05-01T10:00:00Z"),
      arrivalTime: "14:00",
      departureDate: new Date("2026-07-01T10:00:00Z"),
      departureTime: "14:00",
      financialSupportAmount: 2000,
      category: "C",
      session: currentSession,
      mentorStatus: "APPROVED",
      hodStatus: "APPROVED",
      registrarStatus: "PENDING",
      wardenStatus: "PENDING",
      overallStatus: "PENDING",
    },
    // 4. Approved by Mentor, HOD, Registrar, Pending Warden
    {
      applicantType: "project_staff",
      applicantName: "Charlie Brown",
      gender: "Male",
      department: "EE",
      contactNo: "9876543213",
      address: "321 Cedar St, FL",
      mentorName: "Dr. Clark",
      mentorEmail: "clark@college.edu",
      arrivalDate: new Date("2026-03-20T10:00:00Z"),
      arrivalTime: "09:00",
      departureDate: new Date("2026-05-20T10:00:00Z"),
      departureTime: "09:00",
      financialSupportAmount: 3000,
      category: "A",
      session: currentSession,
      mentorStatus: "APPROVED",
      hodStatus: "APPROVED",
      registrarStatus: "APPROVED",
      wardenStatus: "PENDING",
      overallStatus: "PENDING",
    },
    // 5. Fully Approved in Current Session
    {
      applicantType: "intern",
      applicantName: "Diana Prince",
      gender: "Female",
      department: "CSE",
      contactNo: "9876543214",
      address: "654 Birch St, NY",
      mentorName: "Dr. Smith",
      mentorEmail: "smith@college.edu",
      arrivalDate: new Date("2026-03-01T10:00:00Z"),
      arrivalTime: "11:00",
      departureDate: new Date("2026-05-01T10:00:00Z"),
      departureTime: "11:00",
      financialSupportAmount: null,
      category: "B",
      session: currentSession,
      mentorStatus: "APPROVED",
      hodStatus: "APPROVED",
      registrarStatus: "APPROVED",
      wardenStatus: "APPROVED",
      overallStatus: "APPROVED",
      wardenRemarks: "Room 101 allocated.",
    },
    // 6. Rejected by Warden in Current Session
    {
      applicantType: "intern",
      applicantName: "Eve Polastri",
      gender: "Female",
      department: "EE",
      contactNo: "9876543215",
      address: "987 Walnut St, WA",
      mentorName: "Dr. Clark",
      mentorEmail: "clark@college.edu",
      arrivalDate: new Date("2026-04-10T10:00:00Z"),
      arrivalTime: "15:00",
      departureDate: new Date("2026-06-10T10:00:00Z"),
      departureTime: "15:00",
      financialSupportAmount: 0,
      category: "C",
      session: currentSession,
      mentorStatus: "APPROVED",
      hodStatus: "APPROVED",
      registrarStatus: "APPROVED",
      wardenStatus: "REJECTED",
      overallStatus: "REJECTED",
      wardenRemarks: "No rooms available.",
    },
    // 7. Fully Approved in Old Session
    {
      applicantType: "project_staff",
      applicantName: "Frank Castle",
      gender: "Male",
      department: "CSE",
      contactNo: "9876543216",
      address: "147 Spruce St, NV",
      mentorName: "Dr. Smith",
      mentorEmail: "smith@college.edu",
      arrivalDate: new Date("2025-11-01T10:00:00Z"),
      arrivalTime: "08:00",
      departureDate: new Date("2025-12-31T10:00:00Z"),
      departureTime: "08:00",
      financialSupportAmount: 4000,
      category: "A",
      session: oldSession,
      mentorStatus: "APPROVED",
      hodStatus: "APPROVED",
      registrarStatus: "APPROVED",
      wardenStatus: "APPROVED",
      overallStatus: "APPROVED",
      wardenRemarks: "Room 205 allocated.",
    },
    // 8. Rejected in Old Session
    {
      applicantType: "intern",
      applicantName: "Grace Shelby",
      gender: "Female",
      department: "EE",
      contactNo: "9876543217",
      address: "258 Ash St, UK",
      mentorName: "Dr. Clark",
      mentorEmail: "clark@college.edu",
      arrivalDate: new Date("2025-12-01T10:00:00Z"),
      arrivalTime: "13:00",
      departureDate: new Date("2026-02-01T10:00:00Z"),
      departureTime: "13:00",
      financialSupportAmount: 1500,
      category: "B",
      session: oldSession,
      mentorStatus: "APPROVED",
      hodStatus: "APPROVED",
      registrarStatus: "REJECTED",
      wardenStatus: "PENDING",
      overallStatus: "REJECTED",
      registrarRemarks: "Missing documents.",
    }
  ];

  await prisma.accommodationRequest.createMany({
    data: dummyData
  });

  console.log('Successfully seeded 8 dummy accommodation requests!');
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

