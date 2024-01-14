import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteRuralPrdducerUseCase } from "./DeleteRuralPrdducer.UseCase";

class DeleteRuralProducerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProducerUseCase = container.resolve(DeleteRuralPrdducerUseCase);

    await deleteProducerUseCase.execute(id);

    return response.status(201).send({ message: "Producer was deleted!" });
  }
}

export { DeleteRuralProducerController };
