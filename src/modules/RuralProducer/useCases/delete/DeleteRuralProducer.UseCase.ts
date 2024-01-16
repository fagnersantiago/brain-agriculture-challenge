import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRuralProducer} from '../../repository/IRuralProducer';
import { AppError } from '../../../../shared/error/AppError';

@injectable()
class DeleteRuralPrdducerUseCase {
  constructor(
    @inject('DeleteProducer')
    private deleteProducerRepository: IRuralProducer,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      console.log(id)
      const producerExists = await this.deleteProducerRepository.findById(id);

      if (!producerExists) {
        throw new AppError('Producer not found!');
      }

      await this.deleteProducerRepository.delete(id);
    } catch (error) {
      console.log(error)
      throw new AppError(error);
    }
  }
}

export { DeleteRuralPrdducerUseCase };
