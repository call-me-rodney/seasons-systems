import { Router } from 'express';
import * as plannerController from '../controllers/plannerController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';

const router = Router();

// department: administration (assuming planner is for admins/superadmins)
router.post('/suggest', auth, role(['admin', 'superAdmin']), plannerController.getPlannerSuggestion);

export default router;
