import { Router } from 'express';
import CreateRuralProducerController from '../../../modules/RuralProducer/useCases/create/CreateRuralProducer.Controller';

const ruralProducerRouter = Router();

const ruralProducerController = new CreateRuralProducerController();

ruralProducerRouter.post('/', ruralProducerController.handle);

export { ruralProducerRouter };
