import { Router } from 'express';
import * as equipmentController from '../controllers/equipmentController.js';

const router = Router();

router.get('/', equipmentController.getAll);
router.get('/:id', equipmentController.getById);
router.post('/', equipmentController.create);
router.put('/:id', equipmentController.update);
router.delete('/:id', equipmentController.remove);

export default router;
