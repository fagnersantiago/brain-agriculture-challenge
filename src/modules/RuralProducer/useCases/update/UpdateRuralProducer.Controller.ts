import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateRuralProducer } from "./UpdateRuralProducer.UseCase";

class UpdatePlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;
    const { id } = request.params;

    const updateRuralProducerUseCase = container.resolve(UpdateRuralProducer);

    const update = await updateRuralProducerUseCase.execute({
          id,
        ...data
    });

    return response.status(201).json(update);
  }
}

export default UpdatePlaceController;
