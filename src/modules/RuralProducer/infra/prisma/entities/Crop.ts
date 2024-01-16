import { v4 as uuid } from 'uuid';

class Crop {
  public id?: string;
  public plantedCrops: string[];
  public id_rural_producer: string;

  constructor(plantedCrops: string[], id_rural_producer: string) {
    plantedCrops = this.plantedCrops;
    id_rural_producer = this.id_rural_producer;
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Crop };
