import { CreateRuralProducerUseCase } from './CreateRuralProducer.UseCase';
import { RuralProducerRepositoryInMemory } from '../../repository/inMemory/RuralProducerRepositoryInMemory';
import { isValidCpfCnpj } from '../../../../shared/utils/IsValidCpfCnpj';

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

    expect(created.id).toBeTruthy();
  });

  it('should be throw if invalid cnpj', async () => {
    try {
      var invalidCnpj = '12345678901234';
    } catch (error) {
      expect(() => isValidCpfCnpj(invalidCnpj)).toThrow('Invalid cpf or cnpj');
    }
  });

  it('should be throw if invalid cpf', async () => {
    try {
      var invalidCpf = '1234567890';
    } catch (error) {
      expect(() => isValidCpfCnpj(invalidCpf)).toBe('Invalid cpf or cnpj');
    }
  });
});
