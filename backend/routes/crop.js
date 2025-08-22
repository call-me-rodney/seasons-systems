import { Router } from 'express';
import * as cropController from '../controllers/cropController.js';

const router = Router();

router.get('/', cropController.getAll);
router.get('/:id', cropController.getById);
router.post('/', cropController.create);
router.put('/:id', cropController.update);
router.delete('/:id', cropController.remove);

export default router;
