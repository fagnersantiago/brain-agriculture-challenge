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

  async findByCpfCnpj(cpfCnpj: string): Promise<RuralProducer| null> {
    const ruralProducerExists = await prisma.ruralProducer.findUnique({
      where: { cpfCnpj: cpfCnpj },
    });

    if (!ruralProducerExists || undefined) {
      return null;
    }

    return ruralProducerExists;
  }

  async findAllProducer():Promise<RuralProducer[] | void>{
      return await prisma.ruralProducer.findMany()  
 
 

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
  async delete(id: string): Promise<void> {
    await prisma.ruralProducer.delete({
      where: { id: id },
    });
  }
  async calculateTotalCropsCount():Promise <number> {
   return await prisma.ruralProducer.count() 
  }
  async calculateTotalFarmArea():Promise <number>{
    return await prisma.ruralProducer.count() 
  }
  async calculateTotalHectare():Promise <number> {
    return await prisma.ruralProducer.count() 
  }
}

export { RuralProducerRepository };
