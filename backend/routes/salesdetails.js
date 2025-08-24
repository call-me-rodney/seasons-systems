import { Router } from 'express';
import * as salesdetailsController from '../controllers/salesdetailsController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

const router = Router();

// department: sales
router.get('/', auth, department('sales'), role(['admin']), salesdetailsController.getAll);
router.get('/:id', auth, department('sales'), role(['admin']), salesdetailsController.getById);
router.post('/', auth, department('sales'), role(['user', 'admin']), salesdetailsController.create);
router.put('/:id', auth, department('sales'), role(['admin']), salesdetailsController.update);
router.delete('/:id', auth, department('sales'), role(['admin']), salesdetailsController.remove);

export default router;
