import { Router } from 'express';
import * as equipmentController from '../controllers/equipmentController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

const router = Router();

// department: equipment
router.get('/', auth, department('equipment'), role(['user', 'admin']), equipmentController.getAll);
router.get('/:id', auth, department('equipment'), role(['user', 'admin']), equipmentController.getById);
router.post('/', auth, department('equipment'), role(['user', 'admin']), equipmentController.create);
router.put('/:id', auth, department('equipment'), role(['user', 'admin']), equipmentController.update);
router.delete('/:id', auth, department('equipment'), role(['user', 'admin']), equipmentController.remove);

export default router;
