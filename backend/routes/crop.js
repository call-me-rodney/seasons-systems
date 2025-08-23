import { Router } from 'express';
import * as cropController from '../controllers/cropController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

const router = Router();

//department: crop
router.get('/', auth, department('crop'), role(['user', 'admin']), cropController.getAll);
router.get('/:id', auth, department('crop'), role(['user', 'admin']), cropController.getById);
router.post('/', auth, department('crop'), role(['user', 'admin']), cropController.create);
router.put('/:id', auth, department('crop'), role(['user', 'admin']), cropController.update);
router.delete('/:id', auth, department('crop'), role(['admin']), cropController.remove);

export default router;
