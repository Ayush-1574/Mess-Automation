-- AlterTable
ALTER TABLE "MessRate" ALTER COLUMN "month" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "hostelId" INTEGER;

-- CreateTable
CREATE TABLE "Hostel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hostel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hostel_name_key" ON "Hostel"("name");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
