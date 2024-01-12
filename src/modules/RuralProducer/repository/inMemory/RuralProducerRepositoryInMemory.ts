import { IRuralProcucer } from '../IRuralProcucer';
import { IRuralProducerDTO } from '../../dto/IRuralProducerDTO';
import { RuralProducer } from '../../infra/prisma/entities/RuralProducer';

class RuralProducerRepositoryInMemory implements IRuralProcucer {
  private ruralProducerRepository: RuralProducer[] = [];

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
    const ruralProducerCreted = new RuralProducer(
  
      producerName,
      cpfCnpj,
      farmName,
      city,
      state,
      totalFarmArea,
      agriculturalArea,
      vegetationArea,
      plantedCrops,

    )
   

    this.ruralProducerRepository.push(ruralProducerCreted);
    return ruralProducerCreted;
  }

}

export { RuralProducerRepositoryInMemory };
