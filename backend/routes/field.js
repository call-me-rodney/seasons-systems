import { Router } from 'express';
import * as fieldController from '../controllers/fieldController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

const router = Router();

// department: field
router.get('/', auth, department('field'), role(['user', 'admin']), fieldController.getAll);
router.get('/:id', auth, department('field'), role(['user', 'admin']), fieldController.getById);
router.post('/', auth, department('field'), role(['user', 'admin']), fieldController.create);
router.put('/:id', auth, department('field'), role(['user', 'admin']), fieldController.update);
router.delete('/:id', auth, department('field'), role(['admin']), fieldController.remove);

export default router;
