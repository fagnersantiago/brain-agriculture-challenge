import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRuralProcucer } from '../../repository/IRuralProcucer';
import { AppError } from '../../../../shared/error/AppError';

@injectable()
class ListDashboardTotalProducerUseCase {
  constructor(
    @inject('ListDataDashbordProducer')
    private ruralProducerRepository: IRuralProcucer,
  ) {}

  async execute() {
    try {
      const producer = await this.ruralProducerRepository.findAllProducer();

      if (!producer) {
        throw new AppError('Not found');
      }

      const totalFarm = await this.ruralProducerRepository.calculateTotalFarmArea()
      const totalHectareFarm = await this.ruralProducerRepository.calculateTotalHectare()
      const totalCrops = await this.ruralProducerRepository.calculateTotalCropsCount()
  

      return {

        totalFarm,
        totalHectareFarm,
        totalCrops,
        
      };
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { ListDashboardTotalProducerUseCase };
