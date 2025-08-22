import { Router } from 'express';
import * as resupplyController from '../controllers/resupplyController';

const router = Router();

router.get('/', resupplyController.getAll);
router.get('/:id', resupplyController.getById);
router.post('/', resupplyController.create);
router.put('/:id', resupplyController.update);
router.delete('/:id', resupplyController.remove);

export default router;
