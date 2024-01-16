import "reflect-metadata";
import { container } from 'tsyringe';
import { IRuralProducer } from "../../modules/RuralProducer/repository/IRuralProducer";
import { RuralProducerRepository } from "../../modules/RuralProducer/repository/RuralProducerRepository";


container.registerSingleton<IRuralProducer>(
  'RuralProducerRepository',
  RuralProducerRepository,
);
container.registerSingleton<IRuralProducer>(
  'UpdateRuralProducer',
  RuralProducerRepository,
);

container.registerSingleton<IRuralProducer>(
  'DeleteProducer',
  RuralProducerRepository,
);


container.registerSingleton<IRuralProducer>(
  'ListDataDashbordProducer',
  RuralProducerRepository,
);

