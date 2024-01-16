

interface IRuralProducerDTO {
  id?: string
  cpfCnpj: string
  producerName: string
  farmName: string
  city: string
  state: string
  totalFarmArea: number 
  agriculturalArea: number
  vegetationArea: number
  plantedCrops: string[]
}

export { IRuralProducerDTO };

