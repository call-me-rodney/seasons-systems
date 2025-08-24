import { Router } from 'express';
import * as inventoryController from '../controllers/inventoryController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

const router = Router();

// department: inventory
router.get('/', auth, department('inventory'), role(['user', 'admin']), inventoryController.getAll);
router.get('/:id', auth, department('inventory'), role(['user', 'admin']), inventoryController.getById);
router.post('/', auth, department('inventory'), role(['user', 'admin']), inventoryController.create);
router.put('/:id', auth, department('inventory'), role(['admin']), inventoryController.update);
router.delete('/:id', auth, department('inventory'), role(['user', 'admin']), inventoryController.remove);

export default router;
