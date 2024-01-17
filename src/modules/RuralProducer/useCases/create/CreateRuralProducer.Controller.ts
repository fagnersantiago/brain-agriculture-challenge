import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { CreateRuralProducerUseCase } from './CreateRuralProducer.UseCase';

class CreateRuralProducerController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
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

      const ruralProducerUsecase = container.resolve(
        CreateRuralProducerUseCase,
      );

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
    } catch (error) {
      next(error);
    }
  }
}
export default CreateRuralProducerController;
