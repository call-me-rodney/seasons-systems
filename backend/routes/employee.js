import { Router } from 'express';
import * as employeeController from '../controllers/employeeController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import department from '../middleware/department.js';

export const createAccountRoutes = ({ controller, guards = [] }) => {
	const router = Router();
	router.use(...guards);
	router.get('/', controller.getAll);
	router.get('/:id', controller.getById);
	router.post('/', controller.create);
	router.put('/:id', controller.update);
	router.delete('/:id', controller.remove);
	return router;
};

const router = createAccountRoutes({
	controller: employeeController,
	guards: [auth, department('HR'), role(['admin'])],
});

export default router;
