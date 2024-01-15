import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRuralProcucer } from '../../repository/IRuralProcucer';
import { AppError } from '../../../../shared/error/AppError';

@injectable()
class DeleteRuralPrdducerUseCase {
  constructor(
    @inject('DeleteProducer')
    private deleteProducerRepository: IRuralProcucer,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      const producerExists = await this.deleteProducerRepository.findById(id);

      if (!producerExists) {
        throw new AppError('Producer not found!');
      }

      await this.deleteProducerRepository.delete(id);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { DeleteRuralPrdducerUseCase };
