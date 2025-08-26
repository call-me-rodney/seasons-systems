import { Router } from 'express';
import * as superAdminController from '../controllers/superAdminController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';

const router = Router();

// All super admin routes require authentication and the 'superAdmin' role
router.use(auth, role(['superAdmin']));

router.get('/', superAdminController.getAllUsers);
router.get('/analytics', superAdminController.getAggregatedAnalytics);
router.get('/:id', superAdminController.getUserById);
router.post('/', superAdminController.createUser);
router.put('/:id', superAdminController.updateUser);
router.delete('/:id', superAdminController.deleteUser);

export default router;
