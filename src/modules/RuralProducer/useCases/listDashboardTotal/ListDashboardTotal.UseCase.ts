import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRuralProducer } from '../../repository/IRuralProducer';
import { AppError } from '../../../../shared/error/AppError';
import { NotFoundError } from '../../../../shared/error/NotFoundError';

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
        throw new NotFoundError()
      }

      const totalFarmsInQuantitly = await this.ruralProducerRepository. calculateTotalFarmsInQuantitly();
      const totalFarmInHectare = await this.ruralProducerRepository.calculateTotalFarmInHectare();
      const pieChartCulture = await this.ruralProducerRepository.pieChartCulture();
      const pieChartLandUse = await this.ruralProducerRepository.pieChartLandUse();

      return {
        totalFarmsInQuantitly,
        totalFarmInHectare,
        pieChartCulture,
        pieChartLandUse,
      };
    } catch (error) {
      throw new AppError(error)
    }
  }
}

export { ListDashboardTotalProducerUseCase };
