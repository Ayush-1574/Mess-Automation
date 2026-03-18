-- Add month column with a default of 1 for existing rows
ALTER TABLE "MessRate" ADD COLUMN "month" INTEGER NOT NULL DEFAULT 1;

-- Remove the old unique constraint (messId, courseId, sessionId)
DROP INDEX IF EXISTS "MessRate_messId_courseId_sessionId_key";

-- Add new unique constraint including month
CREATE UNIQUE INDEX "MessRate_messId_courseId_sessionId_month_key" ON "MessRate"("messId", "courseId", "sessionId", "month");
