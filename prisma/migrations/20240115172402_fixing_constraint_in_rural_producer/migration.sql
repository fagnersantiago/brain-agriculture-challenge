/*
  Warnings:

  - A unique constraint covering the columns `[cpfCnpj]` on the table `ruralProducer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ruralProducer_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "ruralProducer_cpfCnpj_key" ON "ruralProducer"("cpfCnpj");
