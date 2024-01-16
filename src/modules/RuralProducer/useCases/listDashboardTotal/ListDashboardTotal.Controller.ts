import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListDashboardTotalProducerUseCase } from './ListDashboardTotal.UseCase';

class ListDashboradTotalProducerController {
  async handle(request: Request, response: Response): Promise<Response> {
   

    const ruralProducerUsecase = container.resolve(ListDashboardTotalProducerUseCase);

    const ruralProducer = await ruralProducerUsecase.execute();

    return response.status(201).json(ruralProducer);
  }
}

export default ListDashboradTotalProducerController;
