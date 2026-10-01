/*
 * ============================================================================
 *  SOLID DEMO — supporting file for S (SRP) and L (LSP)
 *  New file (no original): extracted from superAdminController.js and
 *  employeeController.js
 * ============================================================================
 *
 *  WHY THIS FILE EXISTS
 *  --------------------
 *  In the original code, "how an employee account is stored" was written
 *  three separate times, each slightly differently:
 *
 *    - superAdminController.createUser  -> hashes password, hides it in reply
 *    - superAdminController.updateUser  -> hashes password, hides it in reply
 *    - employeeController.create        -> hashes password, hides it in reply
 *    - employeeController.update        -> DOES NOT hash (stores plaintext!)
 *    - employeeController.getAll/getById-> DOES NOT hide the password hash
 *
 *  This service owns ONE responsibility — the business rules for employee
 *  accounts — so the controllers can own ONE responsibility: HTTP.
 *  Because both controllers now call the same rules, they behave the same
 *  way (see employeeController-SOLID.js for the Liskov discussion).
 *
 *  The service knows nothing about `req`, `res`, or status codes.
 * ============================================================================
 */
import bcrypt from 'bcrypt';
import configs from '../configs/configs.js';
import { Employee } from '../models/index-SOLID.mjs';

const HIDDEN_FIELDS = ['password'];

// Rule 1: a password hash never leaves this service.
export const toPublic = (employee) => {
  if (!employee) return null;
  const data = employee.toJSON();
  for (const field of HIDDEN_FIELDS) delete data[field];
  return data;
};

// Rule 2: a password is always hashed before it is stored.
const withHashedPassword = async ({ password, ...data }) => {
  if (!password) return data;
  return { ...data, password: await bcrypt.hash(password, configs.auth.bcryptSaltRounds) };
};

export const findAll = async () =>
  (await Employee.findAll()).map(toPublic);

export const findById = async (id) =>
  toPublic(await Employee.findByPk(id));

export const create = async (data) =>
  toPublic(await Employee.create(await withHashedPassword({ isActive: true, ...data })));

// Returns null when the employee does not exist, so callers can send a 404.
export const update = async (id, data) => {
  const employee = await Employee.findByPk(id);
  if (!employee) return null;
  await employee.update(await withHashedPassword(data));
  return toPublic(employee);
};

// Returns false when the employee does not exist.
export const remove = async (id) => {
  const employee = await Employee.findByPk(id);
  if (!employee) return false;
  await employee.destroy();
  return true;
};
