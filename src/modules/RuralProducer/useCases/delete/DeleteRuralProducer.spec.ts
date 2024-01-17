import { DeleteRuralPrdducerUseCase } from "./DeleteRuralProducer.UseCase";
import { RuralProducerRepositoryInMemory } from "../../repository/inMemory/RuralProducerRepositoryInMemory";
import { AppError } from "../../../../shared/error/AppError";
import { cropsPlanted } from "../../dto/ICropsDto";

let sut: DeleteRuralPrdducerUseCase;
let repositoryInMemory: RuralProducerRepositoryInMemory;

describe("Unit Test delete Rural Producer", () => {
  beforeEach(() => {
    repositoryInMemory = new RuralProducerRepositoryInMemory();
    sut = new DeleteRuralPrdducerUseCase(repositoryInMemory);
  });
 

  it("should be able to delete a rural producer", async () => {
    const producer = {
   
      producerName: 'John doe',
      cpfCnpj: '12345678915415',
      farmName: 'FAKE FARM',
      city: 'FAKE CITY',
      state: 'FAKE STATE',
      totalFarmArea: 400,
      agriculturalArea: 100,
      vegetationArea: 100,
      plantedCrops: [cropsPlanted.CANA_DE_AÇUCAR, cropsPlanted.CANA_DE_AÇUCAR],
    };


    const producerCreated = await repositoryInMemory.create(producer);
   
    const producerDeleted = await sut.execute(producerCreated.id);
    expect(producerDeleted).toBeUndefined()

  });

  it("should not be able to delete a non-existing producer", async () => {
    
     try {
  
      await sut.execute("non-existing-id")
     
     } catch (error) {
      expect(error).toBeInstanceOf(AppError);
     }
  });
});
