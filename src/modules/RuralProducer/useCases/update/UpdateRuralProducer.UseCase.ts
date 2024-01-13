import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { RuralProducer } from "../../infra/prisma/entities/RuralProducer";
import { IRuralProducerDTO } from "../../dto/IRuralProducerDTO";
import { IRuralProcucer } from "../../repository/IRuralProcucer";


@injectable()
class UpdateRuralProducer {
  constructor(
    @inject("UpdateRuralProducer")
    private ruralproducerRepository: IRuralProcucer
  ) {}

  async execute(data: IRuralProducerDTO): Promise<RuralProducer> {
    try {
      const ruralProducer = await this.ruralproducerRepository.findById(data.id);

      if (!ruralProducer) {
        throw new Error("RuralProducer not Found!");
      }

    

      const update = await this.ruralproducerRepository.update({
        id: data.id,
        farmName: data.farmName,
        city: data.city,
        state: data.state,
        totalFarmArea: data.totalFarmArea,
        agriculturalArea: data.agriculturalArea,
        vegetationArea: data.vegetationArea,
        plantedCrops: data.plantedCrops,
      });

      return update;
    } catch (error) {
     console.log(error)
    }
  }
}
export { UpdateRuralProducer };
