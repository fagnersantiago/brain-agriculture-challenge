import { DeleteRuralPrdducerUseCase } from "./DeleteRuralPrdducer.UseCase";
import { RuralProducerRepositoryInMemory } from "../../repository/inMemory/RuralProducerRepositoryInMemory";
import { AppError } from "../../../../shared/error/AppError";

let deleteProducerUseCase: DeleteRuralPrdducerUseCase;
let repositoryInMemory: RuralProducerRepositoryInMemory;

describe("Unit Test delete Rural Producer", () => {
  beforeEach(() => {
    repositoryInMemory = new RuralProducerRepositoryInMemory();
    deleteProducerUseCase = new DeleteRuralPrdducerUseCase(repositoryInMemory);
  });
 

  it("should be able to delete a rural producer", async () => {
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


    const producer = await repositoryInMemory.create(sut);

    const producerDeleted = await deleteProducerUseCase.execute(producer.id);

    expect(producerDeleted).toBe(producerDeleted)
  });

  it("should not be able to delete a non-existing producer", async () => {
    
     try {
      await deleteProducerUseCase.execute("non-existing-id")
     
     } catch (error) {
      expect(error).toBeInstanceOf(AppError);
     }
  });
});
