import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    await prisma.ruralProducer.create({
      data: {
        producerName: 'José',
        cpfCnpj: '02269432000128',
        farmName: 'Fazenda Altamira',
        city: 'São Paulo',
        state: 'São Paulo',
        totalFarmArea: 12000,
        agriculturalArea: 1000,
        vegetationArea: 1000,
        plantedCrops: {
          create: [{ plantedCrops: { set: ['MILHO', 'CANA-DE-AÇÚCAR'] } }],
        },
      },
    });

    await prisma.ruralProducer.create({
      data: {
        producerName: 'João',
        cpfCnpj: '02269432000129',
        farmName: 'Fazenda Mata do Rolo',
        city: 'Xexeu',
        state: 'Pernambuco',
        totalFarmArea: 13000,
        agriculturalArea: 2000,
        vegetationArea: 2000,
        plantedCrops: {
          create: [{ plantedCrops: { set: ['CAFÉ', 'CANA-DE-AÇÚCAR'] } }],
        },
      },
    });

    await prisma.ruralProducer.create({
      data: {
        producerName: 'Joaquim',
        cpfCnpj: '02269432000130',
        farmName: 'Fazenda Ouro Preto',
        city: 'Colônia Leopoldina',
        state: 'Alagoas',
        totalFarmArea: 14000,
        agriculturalArea: 3000,
        vegetationArea: 3000,
        plantedCrops: {
          create: [{ plantedCrops: { set: ['SOJA', 'MILHO'] } }],
        },
      },
    });
    await prisma.ruralProducer.create({
      data: {
        producerName: 'Maria',
        cpfCnpj: '02269432000131',
        farmName: 'Fazenda Prirajú',
        city: 'Goiania',
        state: 'Goiás',
        totalFarmArea: 15000,
        agriculturalArea: 4000,
        vegetationArea: 4000,
        plantedCrops: {
          create: [{ plantedCrops: { set: ['SOJA', 'ALGODÃO'] } }],
        },
      },
    });
    console.log('Seed salved with success!');
  } catch (error) {
    console.error('Error when excute seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
