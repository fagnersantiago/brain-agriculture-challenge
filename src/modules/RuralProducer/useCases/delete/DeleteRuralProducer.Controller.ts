import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { DeleteRuralPrdducerUseCase } from './DeleteRuralProducer.UseCase';

class DeleteRuralProducerController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { id } = request.params;

      const deleteProducerUseCase = container.resolve(
        DeleteRuralPrdducerUseCase,
      );

      await deleteProducerUseCase.execute(id);

      return response.status(201).send({ message: 'Producer was deleted!', statusCode: 201 });
    } catch (error) {
      next(error);
    }
  }
}
export { DeleteRuralProducerController };
