import 'reflect-metadata';
import { prisma } from '../infra/prisma';
import { RuralProducer } from '../infra/prisma/entities/RuralProducer';
import { IRuralProcucer } from './IRuralProcucer';
import { IRuralProducerDTO } from '../dto/IRuralProducerDTO';

class RuralProducerRepository implements IRuralProcucer {
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
    const createdRuralProducer = await prisma.ruralProducer.create({
      data: {
        producerName,
        cpfCnpj,
        farmName,
        city,
        state,
        totalFarmArea,
        agriculturalArea,
        vegetationArea,
        plantedCrops,
      },
    });

    return createdRuralProducer;
  }
}

export { RuralProducerRepository };
