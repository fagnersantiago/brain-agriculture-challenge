import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { RuralProducer } from '../../infra/prisma/entities/RuralProducer';
import { IRuralProducer } from '../../repository/IRuralProducer';
import { IUpdateRuralProducerDTO } from '../../dto/IUpdateRuralProducer.DTO';
import { AppError } from '../../../../shared/error/AppError';
import { NotFoundError } from '../../../../shared/error/NotFoundError';

@injectable()
class UpdateRuralProducerUseCase {
  constructor(
    @inject('UpdateRuralProducer')
    private ruralproducerRepository: IRuralProducer,
  ) {}

  async execute(data: IUpdateRuralProducerDTO): Promise<RuralProducer> {
    try {
      const producerExists = await this.ruralproducerRepository.findById(
        data.id,
      );

      if (!producerExists) {
        throw new NotFoundError();
      }

      const update = await this.ruralproducerRepository.update(data);

      return { ...update, ...data };
    } catch (error) {
  
      throw new AppError(error);
    }
  }
}
export { UpdateRuralProducerUseCase };
