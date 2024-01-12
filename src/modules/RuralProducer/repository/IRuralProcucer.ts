import { IRuralProducerDTO } from "../dto/IRuralProducerDTO";
import { RuralProducer } from "../infra/prisma/entities/RuralProducer";
interface IRuralProcucer {
  create(data: IRuralProducerDTO): Promise<RuralProducer>;
  // findName(name: string): Promise<Place | undefined>;
  // findById(id: string): Promise<Place>;
  // findAll(): Promise<Place[]>;
  // update(data): Promise<Place>;
  // delete(id: string): Promise<void>;
}

export { IRuralProcucer };
