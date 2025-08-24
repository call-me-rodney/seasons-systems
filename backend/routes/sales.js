import { Router } from 'express';
import * as salesController from '../controllers/salesController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

const router = Router();

// department: sales
router.get('/', auth, department('sales'), role(['admin']), salesController.getAll);
router.get('/:id', auth, department('sales'), role(['admin']), salesController.getById);
router.post('/', auth, department('sales'), role(['user', 'admin']), salesController.create);
router.put('/:id', auth, department('sales'), role(['admin']), salesController.update);
router.delete('/:id', auth, department('sales'), role(['admin']), salesController.remove);

export default router;
