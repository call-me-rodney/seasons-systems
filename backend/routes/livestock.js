import { Router } from 'express';
import * as livestockController from '../controllers/livestockController';

const router = Router();

router.get('/', livestockController.getAll);
router.get('/:id', livestockController.getById);
router.post('/', livestockController.create);
router.put('/:id', livestockController.update);
router.delete('/:id', livestockController.remove);

export default router;
