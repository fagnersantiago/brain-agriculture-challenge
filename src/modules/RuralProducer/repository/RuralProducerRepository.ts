import 'reflect-metadata';
import { prisma } from '../infra/prisma';
import { RuralProducer } from '../infra/prisma/entities/RuralProducer';
import { IRuralProducer } from './IRuralProducer';
import { IRuralProducerDTO } from '../dto/IRuralProducerDTO';
import { IUpdateRuralProducerDTO } from '../dto/IUpdateRuralProducer.DTO';

class RuralProducerRepository implements IRuralProducer {
  async create({
    producerName,
    cpfCnpj,
    farmName,
    city,
    state,
    totalFarmArea,
    agriculturalArea,
    vegetationArea,
    plantedCrops,
  }: IRuralProducerDTO): Promise<RuralProducer> {
    const createdRuralProducer = await prisma.$transaction(async prisma => {
      const ruralProducer = await prisma.ruralProducer.create({
        data: {
          producerName,
          cpfCnpj,
          farmName,
          city,
          state,
          totalFarmArea,
          agriculturalArea,
          vegetationArea,
        },
      });

      const crop = await prisma.crop.create({
        data: {
          id_rural_producer: ruralProducer.id,
          plantedCrops,
        },
      });

      return { ...ruralProducer, ...crop } as RuralProducer;
    });

    return createdRuralProducer;
  }

  async findByCpfCnpj(cpfCnpj: string): Promise<RuralProducer | null> {
    const ruralProducerExists = await prisma.ruralProducer.findUnique({
      where: { cpfCnpj: cpfCnpj },
    });

    if (!ruralProducerExists) {
      return null;
    }

    return ruralProducerExists as RuralProducer;
  }

  async findAllProducer() {
    const getAllProducer = await prisma.ruralProducer.findMany({
      select: {
        producerName: true,
        cpfCnpj: true,
        farmName: true,
        city: true,
        state: true,
        agriculturalArea: true,
        totalFarmArea: true,
        vegetationArea: true,
        plantedCrops: { select: { plantedCrops: true } },
      },
    });
    return getAllProducer;
  }

  async findById(id: string): Promise<null | RuralProducer> {
    const ruralProducerExists = await prisma.ruralProducer.findUnique({
      where: { id },
    });

    if (!ruralProducerExists) {
      return null;
    }

    return ruralProducerExists as RuralProducer;
  }

  async update(data: IUpdateRuralProducerDTO): Promise<RuralProducer> {
    const ruralProducerUpdated = await prisma.ruralProducer.update({
      where: { id: data.id },
      data: {
        producerName: data.producerName,
        cpfCnpj: data.cpfCnpj,
        farmName: data.farmName,
        city: data.city,
        state: data.state,
        agriculturalArea: data.agriculturalArea,
        totalFarmArea: data.totalFarmArea,
        vegetationArea: data.vegetationArea,
      },
    });

    await prisma.crop.updateMany({
      where: { id_rural_producer: data.id },
      data: {
        plantedCrops: data.plantedCrops,
      },
    });

    return ruralProducerUpdated as RuralProducer;
  }

  async delete(id: string): Promise<void> {
    await prisma.crop.deleteMany({
      where: { id_rural_producer: id },
    });
    await prisma.ruralProducer.delete({
      where: { id: id },
    });
  }

  async calculateTotalFarmsInQuantitly() {
    return await prisma.ruralProducer.count();
  }

  async pieChartCulture(): Promise<object> {
    const count = await prisma.crop.findMany({
      select: {
        plantedCrops: true,
      },
    });

    const countCulture: object = count.reduce((acc, { plantedCrops }) => {
      plantedCrops.forEach(value => {
        acc[value] = (acc[value] || 0) + 1;
      });

      return acc;
    }, {});

    return countCulture;
  }

  async calculateTotalFarmInHectare(): Promise<number> {
    const totalHectares = await prisma.ruralProducer.aggregate({
      _sum: {
        totalFarmArea: true,
      },
    });
    return totalHectares._sum.totalFarmArea;
  }

  async pieChartLandUse(): Promise<object> {
    const soilUsed = await prisma.ruralProducer.aggregate({
      _sum: {
        agriculturalArea: true,
        vegetationArea: true,
      },
    });
    return soilUsed._sum;
  }

  async pieChartByState(): Promise<object> {
    const state = await prisma.ruralProducer.groupBy({
      by: ['state'],
      _count: true,
    });
    const formattedResult = state.map(item => ({
      state: item.state,
      total: item._count,
    }));

    return formattedResult;
  }
}

export { RuralProducerRepository };
