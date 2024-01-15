import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { RuralProducer } from '../../infra/prisma/entities/RuralProducer';
import { IRuralProcucer } from '../../repository/IRuralProcucer';
import { IRuralProducerDTO } from '../../dto/IRuralProducerDTO';
import { isValidCpfCnpj } from '../../../../shared/utils/IsValidCpfCnpj';

@injectable()
class CreateRuralProducerUseCase {
  constructor(
    @inject('RuralProducerRepository')
    private ruralProducerRepository: IRuralProcucer,
  ) {}

  async execute({
    id,
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
    try {
      
      const producerExists = await this.ruralProducerRepository.findById(id)
     
      if(producerExists) {
        throw new Error("Producer already exists")
      }

      const isValidFormatCpfCnpj = isValidCpfCnpj(cpfCnpj)

      if(!isValidFormatCpfCnpj) {
        throw new Error("Invalid cpf or cnpj")
      }

      if(agriculturalArea + vegetationArea > totalFarmArea) {
         throw new Error("The sum Agritcultral Area and vegetion cannot be greate than total area of the farm")
      }

      const ruralProducerCreated = await this.ruralProducerRepository.create({
        producerName,
        cpfCnpj,
        farmName,
        city,
        state,
        totalFarmArea,
        agriculturalArea,
        vegetationArea,
        plantedCrops,
      });

      return ruralProducerCreated;
    } catch (error) {
      console.log(error);
    }
  }
}

export { CreateRuralProducerUseCase };
