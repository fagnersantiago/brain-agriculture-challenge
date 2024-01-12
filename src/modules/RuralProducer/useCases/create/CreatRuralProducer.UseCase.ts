import "reflect-metadata";
import { inject, injectable } from 'tsyringe';
import { RuralProducer } from '../../infra/prisma/entities/RuralProducer';
import { IRuralProcucer } from '../../repository/IRuralProcucer';
import { IRuralProducerDTO } from '../../dto/IRuralProducerDTO';

@injectable()
class CreateRuralProducerUseCase {
  constructor(
    @inject('RuralProducerRepository')
    private RuralProducerRepository: IRuralProcucer,
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

      const ruralProducerCreted = await this.RuralProducerRepository.create({
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

      return ruralProducerCreted;
    } catch (error) {
      throw new Error("internal error server");
    }
  }
}

export { CreateRuralProducerUseCase };
