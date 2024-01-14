import "reflect-metadata";
import { container } from 'tsyringe';
import { IRuralProcucer } from "../../modules/RuralProducer/repository/IRuralProcucer";
import { RuralProducerRepository } from "../../modules/RuralProducer/repository/RuralProducerRepository";


container.registerSingleton<IRuralProcucer>(
  'RuralProducerRepository',
  RuralProducerRepository,
);
container.registerSingleton<IRuralProcucer>(
  'UpdateRuralProducer',
  RuralProducerRepository,
);

container.registerSingleton<IRuralProcucer>(
  'DeleteProducer',
  RuralProducerRepository,
);