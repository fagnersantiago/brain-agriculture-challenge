import { Router } from 'express';
import CreateRuralProducerController from '../../../modules/RuralProducer/useCases/create/CreateRuralProducer.Controller';
import { UpdateProducerController } from '../../../modules/RuralProducer/useCases/update/UpdateRuralProducer.Controller';
import { DeleteRuralProducerController } from '../../../modules/RuralProducer/useCases/delete/DeleteRuralProducer.Controller';
import ListDashboradTotalProducerController from '../../../modules/RuralProducer/useCases/listDashboardTotal/ListDashboardTotal.Controller';

const ruralProducerRouter = Router();

const createruralProducerController = new CreateRuralProducerController();
const updateRuralProducerController = new UpdateProducerController();
const deleteRuralProducer = new DeleteRuralProducerController();
const listDataDashbordProducer = new ListDashboradTotalProducerController();

ruralProducerRouter.post('/create', createruralProducerController.handle);
ruralProducerRouter.put('/update/:id', updateRuralProducerController.handle);
ruralProducerRouter.delete('/delete/:id', deleteRuralProducer.handle);
ruralProducerRouter.get('/dashboard', listDataDashbordProducer.handle);

export { ruralProducerRouter };
