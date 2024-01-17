import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRuralProducer} from '../../repository/IRuralProducer';
import { AppError } from '../../../../shared/error/AppError';
import { NotFoundError } from '../../../../shared/error/NotFoundError';

@injectable()
class DeleteRuralPrdducerUseCase {
  constructor(
    @inject('DeleteProducer')
    private deleteProducerRepository: IRuralProducer,
  ) {}

  async execute(id: string): Promise<void> {
    
    try {
      
      const producerExists = await this.deleteProducerRepository.findById(id);

      if (!producerExists) {
        throw new NotFoundError()
      }

      await this.deleteProducerRepository.delete(id);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { DeleteRuralPrdducerUseCase };
