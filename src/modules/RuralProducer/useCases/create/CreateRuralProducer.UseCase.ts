import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { RuralProducer } from '../../infra/prisma/entities/RuralProducer';
import { IRuralProcucer } from '../../repository/IRuralProcucer';
import { IRuralProducerDTO } from '../../dto/IRuralProducerDTO';

@injectable()
class CreateRuralProducerUseCase {
  constructor(
    @inject('RuralProducerRepository')
    private ruralProducerRepository: IRuralProcucer,
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
      //TODO: validar se cpf e cnpj

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
