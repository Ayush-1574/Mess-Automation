/*
  Warnings:

  - You are about to drop the column `department` on the `NocOfficer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NocOfficer" DROP COLUMN "department",
ADD COLUMN     "course" TEXT;
