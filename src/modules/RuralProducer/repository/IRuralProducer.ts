
import { IRuralProducerDTO } from "../dto/IRuralProducerDTO";
import { IUpdateRuralProducerDTO } from "../dto/IUpdateRuralProducer.DTO";
import { RuralProducer } from "../infra/prisma/entities/RuralProducer";




interface IRuralProducer {
  create(data: IRuralProducerDTO): Promise<RuralProducer>;
  findById(id: string): Promise<RuralProducer | null>;
  update(data: IUpdateRuralProducerDTO): Promise<RuralProducer>;
  delete(id: string): Promise<void>;
  findByCpfCnpj(cpfCnpj: string): Promise<RuralProducer | null>;
  findAllProducer()
  calculateTotalHectare():Promise<number>
  calculateTotalCrops():Promise<object | number>
  calculateTotalFarms():Promise<number>
  calculateSoilUsed():Promise<object>
}

export { IRuralProducer };
