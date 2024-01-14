import { Router } from 'express';
import CreateRuralProducerController from '../../../modules/RuralProducer/useCases/create/CreateRuralProducer.Controller';
import { UpdateProducerController } from '../../../modules/RuralProducer/useCases/update/UpdateRuralProducer.Controller';
import { DeleteRuralProducerController } from '../../../modules/RuralProducer/useCases/delete/DeleteRuralPrdducer.Controller';

const ruralProducerRouter = Router();

const createruralProducerController = new CreateRuralProducerController();
const updateRuralProducerController = new UpdateProducerController();
const deleteRuralProducer = new DeleteRuralProducerController();

ruralProducerRouter.post('/', createruralProducerController.handle);
ruralProducerRouter.put("/update/:id",updateRuralProducerController.handle);
ruralProducerRouter.delete("/delete/:id", deleteRuralProducer.handle)

export { ruralProducerRouter };
