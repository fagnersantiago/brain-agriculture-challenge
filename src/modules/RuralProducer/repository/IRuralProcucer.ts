import { IRuralProducerDTO } from "../dto/IRuralProducerDTO";
import { RuralProducer } from "../infra/prisma/entities/RuralProducer";


interface IRuralProcucer {
  create(data: IRuralProducerDTO): Promise<RuralProducer>;
  findById(id: string): Promise<RuralProducer | null>;
  update(data): Promise<RuralProducer>;
}

export { IRuralProcucer };
