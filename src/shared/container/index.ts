import "reflect-metadata";
import { container } from 'tsyringe';
import { IRuralProcucer } from "../../modules/RuralProducer/repository/IRuralProcucer";
import { RuralProducerRepository } from "../../modules/RuralProducer/repository/RuralProducerRepository";

container.registerSingleton<IRuralProcucer>(
  'RuralProducerRepository',
  RuralProducerRepository,
);