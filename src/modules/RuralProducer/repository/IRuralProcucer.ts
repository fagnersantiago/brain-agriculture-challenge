import { IRuralProducerDTO } from "../dto/IRuralProducerDTO";
import { IUpdateRuralProducerDTO } from "../dto/IUpdateRuralProducer.DTO";
import { RuralProducer } from "../infra/prisma/entities/RuralProducer";


interface IRuralProcucer {
  create(data: IRuralProducerDTO): Promise<RuralProducer>;
  findById(id: string): Promise<RuralProducer | null>;
  update(data: IUpdateRuralProducerDTO): Promise<RuralProducer>;
  delete(id: string): Promise<void>;
  findByCpfCnpj(cpfCnpj: string): Promise<RuralProducer | null>;
  findAllProducer():Promise<RuralProducer[] | void>
  calculateTotalFarmArea():Promise<number>
  calculateTotalHectare():Promise<number>
  calculateTotalCropsCount():Promise<number>
}

export { IRuralProcucer };
