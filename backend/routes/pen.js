import { Router } from 'express';
import * as penController from '../controllers/penController';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

const router = Router();

// department: pen
router.get('/', auth, department('pen'), role(['user', 'admin']), penController.getAll);
router.get('/:id', auth, department('pen'), role(['user', 'admin']), penController.getById);
router.post('/', auth, department('pen'), role(['admin']), penController.create);
router.put('/:id', auth, department('pen'), role(['user', 'admin']), penController.update);
router.delete('/:id', auth, department('pen'), role(['admin']), penController.remove);

export default router;
