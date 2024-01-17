import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { ListDashboardTotalProducerUseCase } from './ListDashboardTotal.UseCase';

class ListDashboradTotalProducerController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const ruralProducerUsecase = container.resolve(
        ListDashboardTotalProducerUseCase,
      );

      const ruralProducer = await ruralProducerUsecase.execute();

      return response.status(201).json(ruralProducer);
    } catch (error) {
      next(error);
    }
  }
}

export default ListDashboradTotalProducerController;
