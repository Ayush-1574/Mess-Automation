/*
  Warnings:

  - You are about to drop the `FeesDeposited` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeesDeposited" DROP CONSTRAINT "FeesDeposited_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "FeesDeposited" DROP CONSTRAINT "FeesDeposited_studentId_fkey";

-- AlterTable
ALTER TABLE "MessRate" ALTER COLUMN "month" DROP DEFAULT;

-- AlterTable
ALTER TABLE "StudentMessAssignment" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "FeesDeposited";
