import { v4 as uuid } from 'uuid';

class RuralProducer {
  public  id?: string;
  public producerName: string;
  public cpfCnpj: string;
  public farmName: string;
  public city: string;
  public state: string;
  public totalFarmArea: number;
  public agriculturalArea: number;
  public vegetationArea: number;
  public plantedCrops: string[];

  constructor(

    producerName: string,
    cpfCnpj: string,
    farmName: string,
    city: string,
    state: string,
    totalFarmArea: number,
    agriculturalArea: number,
    vegetationArea: number,
    plantedCrops: string[],
  ) {

    this.producerName = producerName;
    this.cpfCnpj = cpfCnpj;
    this.farmName = farmName;
    this.city = city;
    this.state = state;
    this.totalFarmArea = totalFarmArea;
    this.agriculturalArea = agriculturalArea;
    this.vegetationArea = vegetationArea;
    this.plantedCrops = plantedCrops;
    
    if (!this.id)  {
      this.id = uuid();
    }
  }
}
export { RuralProducer };
