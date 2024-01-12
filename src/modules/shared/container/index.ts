import "reflect-metadata";
import { container } from 'tsyringe';
import { IRuralProcucer } from '../../RuralProducer/repository/IRuralProcucer';
import RuralProducerRepository from '../../RuralProducer/repository/RuralProducerRepository';

container.registerSingleton<IRuralProcucer>(
  'RuralProducerRepository',
  RuralProducerRepository,
);
