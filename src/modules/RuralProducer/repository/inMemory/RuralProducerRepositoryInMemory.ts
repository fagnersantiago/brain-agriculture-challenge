import { IRuralProcucer } from '../IRuralProcucer';
import { IRuralProducerDTO } from '../../dto/IRuralProducerDTO';
import { RuralProducer } from '../../infra/prisma/entities/RuralProducer';
import { IUpdateRuralProducerDTO } from '../../dto/IUpdateRuralProducer.DTO';

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
    );

    this.ruralProducerRepository.push(ruralProducerCreted);
    return ruralProducerCreted;
  }
  async findById(id: string): Promise<RuralProducer> {
    return await this.ruralProducerRepository.find(find => find.id === id);
  }
  
  async findByCpfCnpj(cpfCnpj: string): Promise<RuralProducer> {
    return await this.ruralProducerRepository.find(find => find.cpfCnpj === cpfCnpj);
  }
  async update(data: IUpdateRuralProducerDTO): Promise<RuralProducer> {
    const updateRuralProducer = await Object.assign({
      id: data.id,
      farmName: data.farmName,
      city: data.city,
      state: data.state,
      totalFarmArea: data.totalFarmArea,
      agriculturalArea: data.agriculturalArea,
      vegetationArea: data.vegetationArea,
      plantedCrops: data.plantedCrops,
    });

    return updateRuralProducer;
  }
  async delete(id: string): Promise<void> {
    const deleted = this.ruralProducerRepository.findIndex(
      find => find.id === id,
    );
    if (deleted >= 0) {
      this.ruralProducerRepository.slice(deleted, 1);
    }
  }
}

export { RuralProducerRepositoryInMemory };
