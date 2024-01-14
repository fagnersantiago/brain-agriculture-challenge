/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `ruralProducer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ruralProducer_id_key" ON "ruralProducer"("id");
