/*
  Warnings:

  - You are about to drop the column `name` on the `crop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "crop" DROP COLUMN "name",
ADD COLUMN     "plantedCrops" TEXT[];
