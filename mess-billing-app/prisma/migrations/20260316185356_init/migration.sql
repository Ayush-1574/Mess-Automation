/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeesDeposited` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hostel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mess` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessRate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MonthlyRebate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentMessAssignment` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OfficerRole" AS ENUM ('ADMIN_OFFICER', 'JOINT_SUPERINTENDENT', 'ASSISTANT_REGISTRAR');

-- CreateEnum
CREATE TYPE "CertificateType" AS ENUM ('BONAFIDE', 'CHARACTER', 'FEE_STRUCTURE', 'OTHER');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING_ADMIN', 'PENDING_JOINT_SUPT', 'PENDING_ASST_REGISTRAR', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "FeesDeposited" DROP CONSTRAINT "FeesDeposited_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "FeesDeposited" DROP CONSTRAINT "FeesDeposited_studentId_fkey";

-- DropForeignKey
ALTER TABLE "MessRate" DROP CONSTRAINT "MessRate_courseId_fkey";

-- DropForeignKey
ALTER TABLE "MessRate" DROP CONSTRAINT "MessRate_messId_fkey";

-- DropForeignKey
ALTER TABLE "MessRate" DROP CONSTRAINT "MessRate_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyRebate" DROP CONSTRAINT "MonthlyRebate_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyRebate" DROP CONSTRAINT "MonthlyRebate_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_hostelId_fkey";

-- DropForeignKey
ALTER TABLE "StudentMessAssignment" DROP CONSTRAINT "StudentMessAssignment_messId_fkey";

-- DropForeignKey
ALTER TABLE "StudentMessAssignment" DROP CONSTRAINT "StudentMessAssignment_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "StudentMessAssignment" DROP CONSTRAINT "StudentMessAssignment_studentId_fkey";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "FeesDeposited";

-- DropTable
DROP TABLE "Hostel";

-- DropTable
DROP TABLE "Mess";

-- DropTable
DROP TABLE "MessRate";

-- DropTable
DROP TABLE "MonthlyRebate";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "StudentMessAssignment";

-- CreateTable
CREATE TABLE "NocStudent" (
    "id" SERIAL NOT NULL,
    "rollNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fatherName" TEXT,
    "gender" "Gender",
    "category" TEXT,
    "department" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "batch" TEXT,
    "hostel" TEXT,
    "roomNo" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "feesPaid" BOOLEAN NOT NULL DEFAULT false,
    "joiningYear" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NocStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NocOfficer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "OfficerRole" NOT NULL,
    "department" TEXT,
    "batch" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NocOfficer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NocApplication" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "certificateType" "CertificateType" NOT NULL,
    "purpose" TEXT NOT NULL,
    "otherDetails" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING_ADMIN',
    "place" TEXT NOT NULL DEFAULT 'IIT Ropar',
    "applicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NocApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NocAction" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "officerId" INTEGER NOT NULL,
    "stage" "ApplicationStatus" NOT NULL,
    "action" "ActionType" NOT NULL,
    "remarks" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NocAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NocCertificate" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "fileNo" TEXT,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "certifiedText" TEXT NOT NULL,
    "signedBy" TEXT NOT NULL,
    "academicYear" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NocCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NocStudent_rollNo_key" ON "NocStudent"("rollNo");

-- CreateIndex
CREATE UNIQUE INDEX "NocOfficer_email_key" ON "NocOfficer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NocCertificate_applicationId_key" ON "NocCertificate"("applicationId");

-- AddForeignKey
ALTER TABLE "NocApplication" ADD CONSTRAINT "NocApplication_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "NocStudent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NocAction" ADD CONSTRAINT "NocAction_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "NocApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NocAction" ADD CONSTRAINT "NocAction_officerId_fkey" FOREIGN KEY ("officerId") REFERENCES "NocOfficer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NocCertificate" ADD CONSTRAINT "NocCertificate_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "NocApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
