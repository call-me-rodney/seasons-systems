import { Router } from 'express';
import * as livestockController from '../controllers/livestockController';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

const router = Router();

// department: livestock
router.get('/', auth, department('livestock'), role(['user', 'admin']), livestockController.getAll);
router.get('/:id', auth, department('livestock'), role(['user', 'admin']), livestockController.getById);
router.post('/', auth, department('livestock'), role(['user', 'admin']), livestockController.create);
router.put('/:id', auth, department('livestock'), role(['user', 'admin']), livestockController.update);
router.delete('/:id', auth, department('livestock'), role(['user', 'admin']), livestockController.remove);

export default router;
