import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRuralProducerUseCase } from './CreateRuralProducer.UseCase';

class CreateRuralProducerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      producerName,
      cpfCnpj,
      farmName,
      city,
      state,
      totalFarmArea,
      agriculturalArea,
      vegetationArea,
      plantedCrops,
    } = request.body;

    const ruralProducerUsecase = container.resolve(CreateRuralProducerUseCase);

    const ruralProducer = await ruralProducerUsecase.execute({
      producerName,
      cpfCnpj,
      farmName,
      city,
      state,
      totalFarmArea,
      agriculturalArea,
      vegetationArea,
      plantedCrops,

    });
 
    return response.status(201).json(ruralProducer);
  }
}

export default CreateRuralProducerController;
