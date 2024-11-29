/*
  Warnings:

  - Added the required column `name` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "date_created" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "date_updated" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "date_deleted" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ALTER COLUMN "date_created" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "date_updated" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "date_deleted" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Plan" ALTER COLUMN "date_start" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "date_end" SET DATA TYPE TIMESTAMPTZ;
