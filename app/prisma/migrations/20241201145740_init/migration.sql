/*
  Warnings:

  - A unique constraint covering the columns `[id_company,name]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "id_created_by" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "PlanExercise" ALTER COLUMN "exercise_desc" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_id_company_name_key" ON "Exercise"("id_company", "name");
