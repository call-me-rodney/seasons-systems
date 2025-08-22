import { Router } from 'express';
import * as penController from '../controllers/penController';

const router = Router();

router.get('/', penController.getAll);
router.get('/:id', penController.getById);
router.post('/', penController.create);
router.put('/:id', penController.update);
router.delete('/:id', penController.remove);

export default router;
