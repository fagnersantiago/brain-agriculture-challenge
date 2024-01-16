import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { RuralProducer } from '../../infra/prisma/entities/RuralProducer';
import { IRuralProducer } from '../../repository/IRuralProducer';
import { IRuralProducerDTO } from '../../dto/IRuralProducerDTO';
import { isValidCpfCnpj } from '../../../../shared/utils/IsValidCpfCnpj';
import { AppError } from '../../../../shared/error/AppError';


@injectable()
class CreateRuralProducerUseCase {
  constructor(
    @inject('RuralProducerRepository')
    private ruralProducerRepository: IRuralProducer,
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
    plantedCrops
  }: IRuralProducerDTO,  ): Promise<RuralProducer> {
    try {
      
      const producerExists = await this.ruralProducerRepository.findByCpfCnpj(cpfCnpj)
     
      if(producerExists) {
        throw new AppError("Producer already exists")
      }

      if(!isValidCpfCnpj(cpfCnpj)) {
        throw new AppError("Invalid cpf or cnpj")
      }

      if(agriculturalArea + vegetationArea > totalFarmArea) {
         throw new AppError("The sum Agricultural Area and vegetation cannot be greate than total area of the farm")
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
        plantedCrops
      
      }
      );

      return ruralProducerCreated;
    } catch (error) {
    throw new AppError(error)
    }
  }
}

export { CreateRuralProducerUseCase };
