import { Router } from 'express';
import * as supplierController from '../controllers/supplierController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

const router = Router();

// department: procurement
router.get('/', auth, department('procurement'), role(['admin']), supplierController.getAll);
router.get('/:id', auth, department('procurement'), role(['admin']), supplierController.getById);
router.post('/', auth, department('procurement'), role(['admin']), supplierController.create);
router.put('/:id', auth, department('procurement'), role(['admin']), supplierController.update);
router.delete('/:id', auth, department('procurement'), role(['admin']), supplierController.remove);

export default router;
