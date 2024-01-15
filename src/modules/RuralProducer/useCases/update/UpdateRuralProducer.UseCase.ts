import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { RuralProducer } from '../../infra/prisma/entities/RuralProducer';
import { IRuralProcucer } from '../../repository/IRuralProcucer';
import { IUpdateRuralProducerDTO } from '../../dto/IUpdateRuralProducer.DTO';
import { AppError } from '../../../../shared/error/AppError';

@injectable()
class UpdateRuralProducer {
  constructor(
    @inject('UpdateRuralProducer')
    private ruralproducerRepository: IRuralProcucer,
  ) {}

  async execute(data: IUpdateRuralProducerDTO): Promise<RuralProducer> {
    try {
      const ruralProducer = await this.ruralproducerRepository.findById(
        data.id,
      );

      if (!ruralProducer) {
        throw new AppError('RuralProducer not Found!');
      }

      const update = await this.ruralproducerRepository.update(data);

      return update;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
export { UpdateRuralProducer };
