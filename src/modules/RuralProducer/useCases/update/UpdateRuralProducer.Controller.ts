import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { UpdateRuralProducerUseCase } from './UpdateRuralProducer.UseCase';

class UpdateProducerController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { data } = request.body;
      const { id } = request.params;
      const updateRuralProducerUseCase = container.resolve(UpdateRuralProducerUseCase);

      const update = await updateRuralProducerUseCase.execute({
        id,
        ...data,
      });

      return response.status(201).json(update);
    } catch (error) {
      next(error);
    }
  }
}

export { UpdateProducerController };
