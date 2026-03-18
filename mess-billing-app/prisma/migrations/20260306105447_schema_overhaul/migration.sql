/*
  Warnings:

  - You are about to drop the column `baseRate` on the `Mess` table. All the data in the column will be lost.
  - You are about to drop the column `mess` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `openingBalance` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Bill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rebate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Rebate" DROP CONSTRAINT "Rebate_studentId_fkey";

-- AlterTable
ALTER TABLE "Mess" DROP COLUMN "baseRate";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "mess",
DROP COLUMN "openingBalance",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "courseId" INTEGER,
ADD COLUMN     "messSecurity" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Bill";

-- DropTable
DROP TABLE "Rebate";

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentMessAssignment" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "messId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "StudentMessAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyRebate" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "rebateDays" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonthlyRebate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessRate" (
    "id" SERIAL NOT NULL,
    "messId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "monthlyRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MessRate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeesDeposited" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeesDeposited_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Session_name_key" ON "Session"("name");

-- CreateIndex
CREATE UNIQUE INDEX "StudentMessAssignment_studentId_sessionId_key" ON "StudentMessAssignment"("studentId", "sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyRebate_studentId_sessionId_month_year_key" ON "MonthlyRebate"("studentId", "sessionId", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "MessRate_messId_courseId_sessionId_key" ON "MessRate"("messId", "courseId", "sessionId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMessAssignment" ADD CONSTRAINT "StudentMessAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMessAssignment" ADD CONSTRAINT "StudentMessAssignment_messId_fkey" FOREIGN KEY ("messId") REFERENCES "Mess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMessAssignment" ADD CONSTRAINT "StudentMessAssignment_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyRebate" ADD CONSTRAINT "MonthlyRebate_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyRebate" ADD CONSTRAINT "MonthlyRebate_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessRate" ADD CONSTRAINT "MessRate_messId_fkey" FOREIGN KEY ("messId") REFERENCES "Mess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessRate" ADD CONSTRAINT "MessRate_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessRate" ADD CONSTRAINT "MessRate_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesDeposited" ADD CONSTRAINT "FeesDeposited_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeesDeposited" ADD CONSTRAINT "FeesDeposited_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
