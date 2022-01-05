/*
  Warnings:

  - Added the required column `previewImage` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `what` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `why` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "previewImage" TEXT NOT NULL,
ADD COLUMN     "what" TEXT NOT NULL,
ADD COLUMN     "why" TEXT NOT NULL;
