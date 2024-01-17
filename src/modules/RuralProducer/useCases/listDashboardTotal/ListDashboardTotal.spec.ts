import { ListDashboardTotalProducerUseCase } from './ListDashboardTotal.UseCase';
import { RuralProducerRepositoryInMemory } from '../../repository/inMemory/RuralProducerRepositoryInMemory';
import { cropsPlanted } from '../../dto/ICropsDto';

let listRuralProducer: ListDashboardTotalProducerUseCase;
let createRuralProducerRepositoryInMemory: RuralProducerRepositoryInMemory;

describe('Unit test list all Producer Use Case', () => {
  beforeEach(() => {
    createRuralProducerRepositoryInMemory =
      new RuralProducerRepositoryInMemory();
    listRuralProducer = new ListDashboardTotalProducerUseCase(
      createRuralProducerRepositoryInMemory,
    );
  });

  it('should be to create a new RuralProducer', async () => {
    const producer1 = {
      producerName: 'John doe 1',
      cpfCnpj: '12345678915414',
      farmName: 'FAKE FARM',
      city: 'FAKE CITY',
      state: 'FAKE STATE',
      totalFarmArea: 400,
      agriculturalArea: 100,
      vegetationArea: 100,
      plantedCrops: [cropsPlanted.MILHO],
    };
    const producer2 = {
      producerName: 'John doe 2',
      cpfCnpj: '12345678915415',
      farmName: 'FAKE FARM',
      city: 'FAKE CITY',
      state: 'FAKE STATE',
      totalFarmArea: 400,
      agriculturalArea: 100,
      vegetationArea: 100,
      plantedCrops: [cropsPlanted.CANA_DE_AÇUCAR, cropsPlanted.SOJA],
    };
    const producer3 = {
      producerName: 'John doe3',
      cpfCnpj: '12345678915416',
      farmName: 'FAKE FARM',
      city: 'FAKE CITY',
      state: 'FAKE STATE',
      totalFarmArea: 400,
      agriculturalArea: 100,
      vegetationArea: 100,
      plantedCrops: [cropsPlanted.CAFÉ, cropsPlanted.MILHO],
    };

    await createRuralProducerRepositoryInMemory.create(producer1);
    await createRuralProducerRepositoryInMemory.create(producer2);
    await createRuralProducerRepositoryInMemory.create(producer3);

    const producers = await listRuralProducer.execute();

    expect(producers.totalFarmsInQuantitly).toBeGreaterThan(400);
    expect(producers.totalFarmInHectare).toBeGreaterThan(100);
    expect(producers.pieChartLandUse).toBeGreaterThan(1);
    expect(producers.pieChartCulture).toBeDefined();
  });
});
