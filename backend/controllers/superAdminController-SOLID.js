/*
 * ============================================================================
 *  SOLID DEMO — S: SINGLE RESPONSIBILITY PRINCIPLE
 *  "A module should have one, and only one, reason to change."
 *  Original file: controllers/superAdminController.js
 * ============================================================================
 *
 *  WHAT WAS WRONG
 *  --------------
 *  The original controller had several reasons to change:
 *
 *    1. User-account management (getAllUsers ... deleteUser)
 *         -> changes when account rules change (who owns this: HR / admins)
 *    2. Farm-wide analytics (getAggregatedAnalytics, 60 lines, 11 models)
 *         -> changes when the dashboard changes (who owns this: management)
 *    3. Password hashing / hiding rules (bcrypt + configs inside handlers)
 *         -> changes when security policy changes
 *    4. HTTP concerns (parsing req, choosing status codes, shaping JSON)
 *
 *  Adding a dashboard metric meant editing the same file as the user-account
 *  code, and the password rules were copy-pasted from employeeController.
 *
 *  WHAT IMPROVED
 *  -------------
 *    Responsibility              Now lives in
 *    --------------------------  ------------------------------------------
 *    HTTP for user management    THIS FILE (and nothing else)
 *    Account/password rules      services/employeeService-SOLID.js
 *    Farm analytics              controllers/analyticsController-SOLID.js
 *    Data access                 models/index-SOLID.mjs
 *
 *  Each handler below does only HTTP work: read the request, call the service,
 *  choose a status code. There is no bcrypt, no configs, no Sequelize here.
 *
 *  Side effects of the split:
 *    - This file only imports what user management needs, instead of all 11
 *      models (see the old line 7).
 *    - The response shape is the same as employeeController-SOLID.js, because
 *      both use employeeService-SOLID.js.
 *
 *  To use it, point routes/superAdmin.js at this file for the user routes and
 *  at analyticsController-SOLID.js for GET /analytics.
 * ============================================================================
 */
import * as employeeService from '../services/employeeService-SOLID.js';
import logger from '../utils/logger.js';

// Only these fields may be set when a super admin creates an account.
const pickNewUserFields = ({ name, password, role, department, dateOfHire, contact }) =>
  ({ name, password, role, department, dateOfHire, contact });

const fail = (res, error, context) => {
  logger.error(`${context}: ${error.message}`);
  res.status(500).json({ error: error.message });
};

export const getAllUsers = async (req, res) => {
  try {
    res.json(await employeeService.findAll());
    logger.info('All users retrieved by super admin');
  } catch (error) {
    fail(res, error, 'Error retrieving all users');
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await employeeService.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
    logger.info(`User ${req.params.id} retrieved by super admin`);
  } catch (error) {
    fail(res, error, 'Error retrieving user by id');
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await employeeService.create(pickNewUserFields(req.body));
    res.status(201).json(user);
    logger.info(`User ${user.name} created by super admin`);
  } catch (error) {
    fail(res, error, 'Error creating user');
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await employeeService.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
    logger.info(`User ${req.params.id} updated by super admin`);
  } catch (error) {
    fail(res, error, 'Error updating user');
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await employeeService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
    logger.info(`User ${req.params.id} deleted by super admin`);
  } catch (error) {
    fail(res, error, 'Error deleting user');
  }
};
