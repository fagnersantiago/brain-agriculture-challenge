import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { RuralProducer } from '../../infra/prisma/entities/RuralProducer';
import { IRuralProducer } from '../../repository/IRuralProducer';
import { IRuralProducerDTO } from '../../dto/IRuralProducerDTO';
import { isValidCpfCnpj } from '../../../../shared/utils/IsValidCpfCnpj';
import { AppError } from '../../../../shared/error/AppError';
import { AlreadyExistsError } from '../../../../shared/error/ProducerAlreadyExistisError';
import { InvalidCpfCnpjError } from '../../../../shared/error/InvalidCpfCnpjError';
import { BadRequestError } from '../../../../shared/error/BadRequestError';

@injectable()
class CreateRuralProducerUseCase {
  constructor(
    @inject('RuralProducerRepository')
    private ruralProducerRepository: IRuralProducer,
  ) {}

  async execute({
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
      const producerExists = await this.ruralProducerRepository.findByCpfCnpj(
        cpfCnpj,
      );

      if (producerExists) {
        throw new AlreadyExistsError();
      }

      if (!isValidCpfCnpj(cpfCnpj)) {
        throw new InvalidCpfCnpjError();
      }

      if (agriculturalArea + vegetationArea > totalFarmArea) {
        throw new BadRequestError();
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
      throw new AppError(error);
    }
  }
}

export { CreateRuralProducerUseCase };
