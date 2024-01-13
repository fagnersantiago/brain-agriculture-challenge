import { Router } from 'express';

import { ruralProducerRouter } from './RuralProducer.routes';

const router = Router();
router.use('/ruralProducer', ruralProducerRouter);

export { router };
