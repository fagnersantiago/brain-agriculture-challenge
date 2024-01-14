import 'reflect-metadata';
import { prisma } from '../infra/prisma';
import { RuralProducer } from '../infra/prisma/entities/RuralProducer';
import { IRuralProcucer } from './IRuralProcucer';
import { IRuralProducerDTO } from '../dto/IRuralProducerDTO';
import { IUpdateRuralProducerDTO } from '../dto/IUpdateRuralProducer.DTO';

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

  async findById(id: string): Promise<null | RuralProducer> {
    
    const ruralProducerExists = await prisma.ruralProducer.findUnique({
      where: { id },
    });

    if (!ruralProducerExists || undefined) {
      return null;
    }

    return ruralProducerExists;
  }
  
  async update(data: IUpdateRuralProducerDTO): Promise<RuralProducer> {
   
    const ruralProducerUpdated = await prisma.ruralProducer.update({
      where: { id: data.id }, 
      data: data, 
    });
    return ruralProducerUpdated;
  }
  
}

export { RuralProducerRepository };
