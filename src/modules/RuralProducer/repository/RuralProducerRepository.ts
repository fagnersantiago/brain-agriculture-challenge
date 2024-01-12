import { PrismaClient } from '@prisma/client';
import { RuralProducer } from '../infra/prisma/entities/RuralProducer';
import { IRuralProcucer } from './IRuralProcucer';

import { IRuralProducerDTO } from '../dto/IRuralProducerDTO';

class RuralProducerRepository implements IRuralProcucer {
  constructor(private prismaService: PrismaClient) {}

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
    const createdRuralProducer = await this.prismaService.ruralProducer.create({
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

export default RuralProducerRepository;
