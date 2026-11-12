import configs from './configs/configs.js';
import logger from './utils/logger.js';
import { Employee } from './models/employee.js';

import { createBcryptHasher } from './accounts/bcryptHasher.js';
import { createSequelizeAccountStore } from './accounts/accountStore.js';
import { createAccountService } from './accounts/accountService.js';
import { createAccountController } from './controllers/accountController.js';
import { createAccountRoutes } from './routes/accountRoutes.js';
import { createErrorHandler } from './middleware/errorHandler.js';

// 1. Build the shared parts once
const store = createSequelizeAccountStore({ Employee });
const hasher = createBcryptHasher({ saltRounds: configs.auth.bcryptSaltRounds });

// 2. Fields a normal employee is allowed to write (replace with your real columns)
const EMPLOYEE_FIELDS = ['name', 'email', 'phone', 'password'];

// 3. Same service, two permission levels
const employeeAccounts = createAccountService({
  store,
  hasher,
  allowedFields: EMPLOYEE_FIELDS,
});

const superAdminAccounts = createAccountService({
  store,
  hasher,
  allowedFields: [...EMPLOYEE_FIELDS, 'role', 'isActive'], // only super admin can set these
});

// 4. Routers
export const employeeRouter = createAccountRoutes({
  controller: createAccountController({
    accounts: employeeAccounts,
    logger,
    label: 'employee',
  }),
});

export const superAdminRouter = createAccountRoutes({
  controller: createAccountController({
    accounts: superAdminAccounts,
    logger,
    label: 'super admin',
  }),
  guards: [], // put your existing super admin check here, e.g. [requireSuperAdmin]
});

// 5. Error handler
export const errorHandler = createErrorHandler({ logger });