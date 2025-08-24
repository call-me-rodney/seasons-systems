import { Router } from 'express';
import * as resupplyController from '../controllers/resupplyController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

const router = Router();

// department: procurement
router.get('/', auth, department('procurement'), role(['admin']), resupplyController.getAll);
router.get('/:id', auth, department('procurement'), role(['admin']), resupplyController.getById);
router.post('/', auth, department('procurement'), role(['admin']), resupplyController.create);
router.put('/:id', auth, department('procurement'), role(['admin']), resupplyController.update);
router.delete('/:id', auth, department('procurement'), role(['admin']), resupplyController.remove);

export default router;
