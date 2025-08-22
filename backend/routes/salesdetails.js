import { Router } from 'express';
import * as salesdetailsController from '../controllers/salesdetailsController';

const router = Router();

router.get('/', salesdetailsController.getAll);
router.get('/:id', salesdetailsController.getById);
router.post('/', salesdetailsController.create);
router.put('/:id', salesdetailsController.update);
router.delete('/:id', salesdetailsController.remove);

export default router;
