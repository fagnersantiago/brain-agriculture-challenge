/*
  Warnings:

  - You are about to drop the column `plantedCrops` on the `ruralProducer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ruralProducer" DROP COLUMN "plantedCrops";

-- CreateTable
CREATE TABLE "crop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "crop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "crop" ADD CONSTRAINT "crop_id_fkey" FOREIGN KEY ("id") REFERENCES "ruralProducer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
