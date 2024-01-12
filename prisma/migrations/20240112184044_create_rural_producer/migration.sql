-- CreateTable
CREATE TABLE "ruralProducer" (
    "id" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "producerName" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalFarmArea" INTEGER NOT NULL,
    "agriculturalArea" INTEGER NOT NULL,
    "vegetationArea" INTEGER NOT NULL,
    "plantedCrops" TEXT[],

    CONSTRAINT "ruralProducer_pkey" PRIMARY KEY ("id")
);
