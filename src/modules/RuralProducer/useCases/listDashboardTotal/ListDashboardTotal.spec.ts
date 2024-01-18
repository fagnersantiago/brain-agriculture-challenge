import { ListDashboardTotalProducerUseCase } from './ListDashboardTotal.UseCase';
import { RuralProducerRepositoryInMemory } from '../../repository/inMemory/RuralProducerRepositoryInMemory';
import { cropsPlanted } from '../../dto/ICropsDto';

let sut: ListDashboardTotalProducerUseCase;
let createRuralProducerRepositoryInMemory: RuralProducerRepositoryInMemory;

describe('Unit test list all Producer Use Case', () => {
  beforeEach(() => {
    createRuralProducerRepositoryInMemory =
      new RuralProducerRepositoryInMemory();
    sut = new ListDashboardTotalProducerUseCase(
      createRuralProducerRepositoryInMemory,
    );
  });

  it('should calculate total farms in quantity correctly', async () => {
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

    const producers = await sut.execute();

    expect(producers.totalFarmsInQuantitly).toBeGreaterThan(3)
  });

  it('should calculate total farms in hectare correctly', async () => {
    const producer = {
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


    await createRuralProducerRepositoryInMemory.create(producer);
    

    const producers = await sut.execute();

    expect(producers.totalFarmInHectare).toBeGreaterThan(1)
  });

  it('should generate pie chart by land Used', async () => {
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

    const producers = await sut.execute();

    expect(producers.pieChartLandUse).toBeGreaterThan(1)
  });

  it('should generate pie chart by culture correctly', async () => {
    const producer1 = {
      producerName: 'John doe 1',
      cpfCnpj: '12345678915414',
      farmName: 'FAKE FARM',
      city: 'FAKE CITY',
      state: 'SÃO PAULO',
      totalFarmArea: 400,
      agriculturalArea: 100,
      vegetationArea: 100,
      plantedCrops: [cropsPlanted.MILHO],
    };
 


    await createRuralProducerRepositoryInMemory.create(producer1);
   
   

    const producers = await sut.execute();

    expect(producers.pieChartCulture).toEqual({


  
      "MILHO": 1,
    
    }
    )
  });

  
  it('should generate pie chart by State', async () => {
    const producer1 = {
      producerName: 'John doe 1',
      cpfCnpj: '12345678915414',
      farmName: 'FAKE FARM',
      city: 'FAKE CITY',
      state: 'SÃO PAULO',
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
      state: 'SÃO PAULO',
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
      state: 'ALAGOAS',
      totalFarmArea: 400,
      agriculturalArea: 100,
      vegetationArea: 100,
      plantedCrops: [cropsPlanted.CAFÉ, cropsPlanted.MILHO],
    };

    await createRuralProducerRepositoryInMemory.create(producer1);
    await createRuralProducerRepositoryInMemory.create(producer2);
    await createRuralProducerRepositoryInMemory.create(producer3);

    const producers = await sut.execute();

    expect(producers.pieChartByState).toEqual([

      { state: 'SÃO PAULO', total: 2 },
      { state: 'ALAGOAS', total: 1 }
   
    ])
  });
});
