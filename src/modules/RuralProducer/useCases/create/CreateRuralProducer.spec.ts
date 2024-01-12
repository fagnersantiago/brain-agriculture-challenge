import { CreateRuralProducerUseCase } from './CreatRuralProducer.UseCase';

import { RuralProducerRepositoryInMemory } from '../../repository/inMemory/RuralProducerRepositoryInMemory';

let createRuralProducer: CreateRuralProducerUseCase;
let createRuralProducerRepositoryInMemory: RuralProducerRepositoryInMemory;

describe('Unit test create Place Use Case', () => {
  beforeEach(() => {
    createRuralProducerRepositoryInMemory =
      new RuralProducerRepositoryInMemory();
    createRuralProducer = new CreateRuralProducerUseCase(
      createRuralProducerRepositoryInMemory,
    );
  });

  it('should be to create a new RuralProducer', async () => {
    const sut = {
      producerName: 'John doe',
      cpfCnpj: '12345678915415',
      farmName: 'FAKE FARM',
      city: 'FAKE CITY',
      state: 'FAKE STATE',
      totalFarmArea: 100,
      agriculturalArea: 100,
      vegetationArea: 100,
      plantedCrops: ['SOJA', 'CANA-DE-AÇUCAR'],
    };

    const created = await createRuralProducer.execute(sut);

    expect(created.id).toBeTruthy()
  });
});
