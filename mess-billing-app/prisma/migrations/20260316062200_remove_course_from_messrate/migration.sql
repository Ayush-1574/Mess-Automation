-- Remove duplicates: keep the first row per (messId, sessionId, month)
DELETE FROM "MessRate" a USING "MessRate" b
WHERE a.id > b.id
  AND a."messId" = b."messId"
  AND a."sessionId" = b."sessionId"
  AND a.month = b.month;

-- Drop the old unique constraint
DROP INDEX IF EXISTS "MessRate_messId_courseId_sessionId_month_key";

-- Drop the foreign key constraint to Course
ALTER TABLE "MessRate" DROP CONSTRAINT IF EXISTS "MessRate_courseId_fkey";

-- Drop the courseId column
ALTER TABLE "MessRate" DROP COLUMN "courseId";

-- Add the new unique constraint
CREATE UNIQUE INDEX "MessRate_messId_sessionId_month_key" ON "MessRate"("messId", "sessionId", "month");
