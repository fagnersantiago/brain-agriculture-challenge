import 'reflect-metadata';
import { prisma } from '../infra/prisma';
import { RuralProducer } from '../infra/prisma/entities/RuralProducer';
import { IRuralProducer } from './IRuralProducer';
import { IRuralProducerDTO } from '../dto/IRuralProducerDTO';
import { IUpdateRuralProducerDTO } from '../dto/IUpdateRuralProducer.DTO';
import { cropsPlanted } from '../dto/ICropsDto';

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
    const getAll = await prisma.ruralProducer.findMany({
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
    return getAll;

    // const estados = await prisma.produtorRural.groupBy({
    //   by: ['estado'],
    //   _count: true,
    // });
  }

  async findById(id: string): Promise<null | RuralProducer> {
    const ruralProducerExists = await prisma.ruralProducer.findFirst({
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
    await prisma.ruralProducer.delete({
      where: { id: id },
    });
  }

async calculateTotalFarms() {
    return await prisma.ruralProducer.count()
  }

  async calculateTotalCrops():Promise<object>{
    const count =  await prisma.crop.findMany({
      select:{
        plantedCrops: true
      }
    })

    const countCulture: Record<string, {total: number}> = count.reduce((acc, { plantedCrops }) => {
      plantedCrops.forEach((value) => {
    
        acc[value] = { total: (acc[value] || 0) + 1 };
      });
   
      return acc;
    }, {});
    
    return countCulture
  }

  async calculateTotalHectare(): Promise<number> {
    const totalHectares = await prisma.ruralProducer.aggregate({
      _sum: {
        totalFarmArea: true,
      },
    });
    return totalHectares._sum.totalFarmArea;
  }
  async calculateSoilUsed():Promise<object> {
    const soilUsed = await prisma.ruralProducer.aggregate({
      _sum: {
        agriculturalArea: true,
        vegetationArea: true,
      },
    });
    return soilUsed._sum
  }

}

export { RuralProducerRepository };
