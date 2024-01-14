import { Router } from 'express';
import CreateRuralProducerController from '../../../modules/RuralProducer/useCases/create/CreateRuralProducer.Controller';
import { UpdateProducerController } from '../../../modules/RuralProducer/useCases/update/UpdateRuralProducer.Controller';

const ruralProducerRouter = Router();

const createruralProducerController = new CreateRuralProducerController();
const updateRuralProducerController = new UpdateProducerController()
ruralProducerRouter.post('/', createruralProducerController.handle);
ruralProducerRouter.put("/update/:id",updateRuralProducerController.handle)

export { ruralProducerRouter };
