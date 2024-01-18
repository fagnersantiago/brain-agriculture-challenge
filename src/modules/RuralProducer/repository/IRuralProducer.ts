
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
  calculateTotalFarmInHectare():Promise<number>
  pieChartCulture():Promise<object | number>
  calculateTotalFarmsInQuantitly():Promise<number>
  pieChartLandUse():Promise<object | number>
  pieChartByState():Promise<object | number>
  
  
}

export { IRuralProducer };
