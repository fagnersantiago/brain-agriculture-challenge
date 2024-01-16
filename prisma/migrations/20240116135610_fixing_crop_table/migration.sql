/*
  Warnings:

  - Added the required column `id_rural_producer` to the `crop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "crop" DROP CONSTRAINT "crop_id_fkey";

-- AlterTable
ALTER TABLE "crop" ADD COLUMN     "id_rural_producer" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "crop" ADD CONSTRAINT "crop_id_rural_producer_fkey" FOREIGN KEY ("id_rural_producer") REFERENCES "ruralProducer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
