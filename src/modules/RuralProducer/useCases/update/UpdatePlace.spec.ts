
import { RuralProducerRepositoryInMemory } from "../../repository/inMemory/RuralProducerRepositoryInMemory";
import { UpdateRuralProducer } from "./UpdateRuralProducer.UseCase";

let updateRuralProducer: UpdateRuralProducer;
let ruralProducerInMemory: RuralProducerRepositoryInMemory;

describe("Unit test Update Rural producer", () => {
  beforeEach(() => {
    ruralProducerInMemory = new RuralProducerRepositoryInMemory();
    updateRuralProducer = new UpdateRuralProducer(ruralProducerInMemory);

  });

  it("Should able update rural producer ", async () => {
    const sut = {
      id:"fake-id-123",
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

    const ruralProducer =  await ruralProducerInMemory.create(sut)
   
    const updatedRuralProducer = await updateRuralProducer.execute({
      id: ruralProducer.id,
      producerName: ruralProducer.producerName,
      cpfCnpj: ruralProducer.cpfCnpj,
      farmName:"UPDATE Fake Farm Name",
      city: 'UPDATE FAKE CITY',
      state: 'UPDATE FAKE STATE',
      totalFarmArea: 200,
      agriculturalArea: 200,
      vegetationArea: 100,
      plantedCrops: ruralProducer.plantedCrops,

    });
    
    expect(updatedRuralProducer.farmName).toBe("UPDATE Fake Farm Name");
    expect(updatedRuralProducer.city).toBe("UPDATE FAKE CITY");
    expect(updatedRuralProducer.state).toBe("UPDATE FAKE STATE");
    expect(updatedRuralProducer.totalFarmArea).toBe(200);
    expect(updatedRuralProducer.agriculturalArea).toBe(200);
    
  });

  it("Should throw an error if rural producer does not exist", async () => {
    try {
      await updateRuralProducer.execute({
        id: "non-existing-id",
        producerName: 'John doe',
        cpfCnpj: '12345678915415',
        farmName: 'FAKE FARM',
        city: 'FAKE CITY',
        state: 'FAKE STATE',
        totalFarmArea: 100,
        agriculturalArea: 100,
        vegetationArea: 100,
        plantedCrops: ['SOJA', 'CANA-DE-AÇUCAR'],
      });
    } catch (error) {
      expect(error).toBeInstanceOf("RuralProducer not Found!");
    }
  });
});
