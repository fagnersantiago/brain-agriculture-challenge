import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateRuralProducer } from './UpdateRuralProducer.UseCase';

class UpdateProducerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;
    const { id } = request.params;
console.log("dataController", data)
    const updateRuralProducerUseCase = container.resolve(UpdateRuralProducer);

    const update = await updateRuralProducerUseCase.execute({
      id,
      ...data,
    });

    return response.status(201).json(update);
  }
}

export { UpdateProducerController };
