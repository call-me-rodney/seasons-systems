import { Router } from 'express';
import logger from './utils/logger.js';
import employeeRouter from './routes/employee.js';
import auth from './middleware/auth.js';
import role from './middleware/role.js';
import * as superAdminController from './controllers/superAdminController.js';

export { employeeRouter };

export const superAdminRouter = Router();
superAdminRouter.use(auth, role(['superAdmin']));
superAdminRouter.get('/', superAdminController.getAllUsers);
superAdminRouter.get('/:id', superAdminController.getUserById);
superAdminRouter.post('/', superAdminController.createUser);
superAdminRouter.put('/:id', superAdminController.updateUser);
superAdminRouter.delete('/:id', superAdminController.deleteUser);

export const errorHandler = (error, req, res, next) => {
  logger.error(error.message || 'Unhandled request error');
  if (res.headersSent) return next(error);

  const status = error.statusCode || error.status || 500;
  res.status(status).json({
    error: status >= 500 ? 'Internal server error' : error.message,
  });
};