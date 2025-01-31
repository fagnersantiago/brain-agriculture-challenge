import { IRuralProducer } from '../IRuralProducer';
import { IRuralProducerDTO } from '../../dto/IRuralProducerDTO';
import { RuralProducer } from '../../infra/prisma/entities/RuralProducer';
import { IUpdateRuralProducerDTO } from '../../dto/IUpdateRuralProducer.DTO';
import { Crop } from '../../infra/prisma/entities/Crop';

class RuralProducerRepositoryInMemory implements IRuralProducer {
  private ruralProducerRepository: RuralProducer[] = [];
  private cropRepository: Crop[] = [];

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
    const ruralProducer = new RuralProducer(
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

    const crop = new Crop(ruralProducer.plantedCrops, ruralProducer.id);
    this.ruralProducerRepository.push(ruralProducer);
    this.cropRepository.push(crop);

    return { ...ruralProducer, ...crop.plantedCrops };
  }
  async findById(id: string): Promise<RuralProducer | null> {
    const foundProducer = this.ruralProducerRepository.find(producer => {
      return producer.id === id;
    });
    if (!foundProducer) {
      return null;
    }

    return foundProducer;
  }

  async findAllProducer(): Promise<RuralProducer[] | void> {
    const allProducer = this.ruralProducerRepository;
    return allProducer;
  }

  async findByCpfCnpj(cpfCnpj: string): Promise<RuralProducer> {
    return await this.ruralProducerRepository.find(
      find => find.cpfCnpj === cpfCnpj,
    );
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
    const ruralDeleted = this.ruralProducerRepository.findIndex(
      find => find.id === id,
    );
    this.ruralProducerRepository.splice(ruralDeleted, 1);
  }

  async pieChartCulture(): Promise<object | number> {
    const allProducers = await this.ruralProducerRepository.filter(() => true);

    const countCulture: Record<string, number> = {};

    for (const producer of allProducers) {
      const cultures = producer.plantedCrops;

      if (cultures) {
        for (const culture of cultures) {
          if (countCulture[culture]) {
            countCulture[culture]++;
          } else {
            countCulture[culture] = 1;
          }
        }
      }
    }

    return countCulture;
  }

  async calculateTotalFarmInHectare(): Promise<number> {
    const totalHectareFarm = this.ruralProducerRepository.reduce(
      (total, farm) => total + farm.totalFarmArea,
      0,
    );

    return totalHectareFarm;
  }

  async calculateTotalFarmsInQuantitly(): Promise<number> {
    const totalFarm = this.ruralProducerRepository.reduce(
      (total, farm) => total + farm.totalFarmArea,
      0,
    );

    return totalFarm;
  }

  async pieChartLandUse(): Promise<number> {
    const totalUseLand = this.ruralProducerRepository.reduce((acc, farm) => {
      return acc + farm.plantedCrops.length;
    }, 0);
    return totalUseLand;
  }

  async pieChartByState(): Promise<object> {
    const allStateProducer = await this.ruralProducerRepository.filter(
      () => true,
    );

    const countState: Record<string, number> = {};

    for (const producer of allStateProducer) {
      const state = producer.state;

      if (state) {
        if (countState[state]) {
          countState[state]++;
        } else {
          countState[state] = 1;
        }
      }
    }

    const result = Object.entries(countState).map(([state, total]) => ({
      state,
      total,
    }));

    return result;
  }
}

export { RuralProducerRepositoryInMemory };
