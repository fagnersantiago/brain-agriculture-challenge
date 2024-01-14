import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IRuralProcucer } from "../../repository/IRuralProcucer";

@injectable()
class DeleteRuralPrdducerUseCase {
  constructor(
    @inject("DeleteProducer")
    private deleteProducerRepository: IRuralProcucer
  ) {}

  async execute(id: string): Promise<void> {
    try {
      const producerExists = await this.deleteProducerRepository.findById(id);
 
      if (!producerExists) {
        throw new Error("producer not found!");
      }

      await this.deleteProducerRepository.delete(id);
    } catch (error) {
      console.log(error)
    }
  }
}

export { DeleteRuralPrdducerUseCase };
