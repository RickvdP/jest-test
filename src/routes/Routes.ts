// import Router from 'express-promise-router';
import { Router } from 'express';
import ResourceController from '../controllers/ResourceController';

const router = Router({ mergeParams: true });

router.use('/:id/:resource', new ResourceController().router);

export default router;
