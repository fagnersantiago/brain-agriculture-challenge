import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { RuralProducer } from "../../infra/prisma/entities/RuralProducer";
import { IRuralProcucer } from "../../repository/IRuralProcucer";
import { IUpdateRuralProducerDTO } from "../../dto/IUpdateRuralProducer.DTO";


@injectable()
class UpdateRuralProducer {
  constructor(
    @inject("UpdateRuralProducer")
    private ruralproducerRepository: IRuralProcucer
  ) {}

  async execute(data: IUpdateRuralProducerDTO): Promise<RuralProducer> {
    try {
      const ruralProducer = await this.ruralproducerRepository.findById(data.id);

      if (!ruralProducer) {
        throw new Error("RuralProducer not Found!");
      }

      const update = await this.ruralproducerRepository.update(data);

      return update;
    } catch (error) {
     console.log(error)
    }
  }
}
export { UpdateRuralProducer };
