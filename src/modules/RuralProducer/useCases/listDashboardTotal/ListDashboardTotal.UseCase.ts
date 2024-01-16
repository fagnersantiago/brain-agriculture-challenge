import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRuralProducer } from '../../repository/IRuralProducer';
import { AppError } from '../../../../shared/error/AppError';

@injectable()
class ListDashboardTotalProducerUseCase {
  constructor(
    @inject('ListDataDashbordProducer')
    private ruralProducerRepository: IRuralProducer,
  ) {}

  async execute() {
    try {
      const producer = await this.ruralProducerRepository.findAllProducer();

      if (!producer) {
        throw new AppError('Not found');
      }

      const totalFarms = await this.ruralProducerRepository.calculateTotalFarms();
      const totalHectareFarm = await this.ruralProducerRepository.calculateTotalHectare();
      const totalCrops = await this.ruralProducerRepository.calculateTotalCrops();
      const soilUsed = await this.ruralProducerRepository.calculateSoilUsed();

      return {
        totalFarms,
        totalHectareFarm,
        totalCrops,
        soilUsed,
      };
    } catch (error) {
      throw new AppError(error)
    }
  }
}

export { ListDashboardTotalProducerUseCase };
