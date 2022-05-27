/*
  Warnings:

  - You are about to drop the column `reproductionSteps` on the `Project` table. All the data in the column will be lost.
  - Added the required column `how` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "reproductionSteps",
ADD COLUMN     "buildSteps" JSONB[],
ADD COLUMN     "how" TEXT NOT NULL;
