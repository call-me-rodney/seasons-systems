import { Router } from 'express';
import * as employeeController from '../controllers/employeeController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

const router = Router();

// departments: HR
router.get('/', /*auth, department('HR'), role(['admin']),*/ employeeController.getAll);
router.get('/:id', /*auth, department('HR'), role(['admin']),*/ employeeController.getById);
router.post('/', /*auth, department('HR'), role(['admin']),*/ employeeController.create);
router.put('/:id', /*auth, department('HR'), role(['admin']),*/ employeeController.update);
router.delete('/:id', /*auth, department('HR'), role(['admin']),*/ employeeController.remove);

export default router;
