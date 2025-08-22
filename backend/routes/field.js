import { Router } from 'express';
import * as fieldController from '../controllers/fieldController.js';

const router = Router();

router.get('/', fieldController.getAll);
router.get('/:id', fieldController.getById);
router.post('/', fieldController.create);
router.put('/:id', fieldController.update);
router.delete('/:id', fieldController.remove);

export default router;
