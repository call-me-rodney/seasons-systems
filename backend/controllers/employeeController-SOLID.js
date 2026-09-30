/*
 * ============================================================================
 *  SOLID DEMO — L: LISKOV SUBSTITUTION PRINCIPLE
 *  "Subtypes must be substitutable for their base types without altering the
 *   correctness of the program."
 *  Original file: controllers/employeeController.js
 * ============================================================================
 *
 *  HOW LSP APPLIES WITHOUT CLASSES
 *  -------------------------------
 *  JavaScript uses "duck typing": if it has the right methods, it counts as
 *  the type. All 11 CRUD controllers share an unwritten interface that the
 *  routes rely on:
 *
 *    getAll   -> 200 + list of records
 *    getById  -> 200 + record  | 404
 *    create   -> 201 + the stored record, stored as the service's rules require
 *    update   -> 200 + the updated record, stored under the SAME rules as create
 *    remove   -> 204           | 404
 *
 *  Any controller that implements this interface should be interchangeable.
 *
 *  WHAT WAS WRONG
 *  --------------
 *  The original employeeController has the right method names, but its
 *  methods do not keep each other's promises:
 *
 *    - create()  hashes the password and hides it in the response
 *    - update()  saves req.body directly, so the password is stored IN
 *                PLAINTEXT, and the returned record includes it
 *    - getAll() / getById() return every employee's PASSWORD HASH
 *
 *  So "create then update" on an employee does not behave like
 *  "create then update" on anything else. superAdminController.updateUser,
 *  which updates the SAME table, behaves differently again: it hashes, and it
 *  returns { message, user } instead of the record.
 *  Code written against the shared interface ("update keeps the record valid",
 *  "responses are safe to show") breaks for employees. That is an LSP
 *  violation, and here it is also a security bug.
 *
 *  WHAT IMPROVED
 *  -------------
 *    - Every method goes through services/employeeService-SOLID.js, so every
 *      path hashes passwords on write and hides them on read. No exceptions.
 *    - The status codes and response shapes are exactly those of the shared
 *      CRUD interface above, so this controller is a true drop-in for the
 *      others, and for superAdminController-SOLID.js's user handlers.
 * ============================================================================
 */
import * as employeeService from '../services/employeeService-SOLID.js';
import logger from '../utils/logger.js';

const fail = (res, error) => {
  logger.error(error.message);
  res.status(500).json({ error: error.message });
};

export const getAll = async (req, res) => {
  try {
    res.json(await employeeService.findAll());          // no password hashes
    logger.info('All employees retrieved successfully');
  } catch (error) {
    fail(res, error);
  }
};

export const getById = async (req, res) => {
  try {
    const employee = await employeeService.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);                                  // no password hash
    logger.info(`Employee with id ${req.params.id} retrieved successfully`);
  } catch (error) {
    fail(res, error);
  }
};

export const create = async (req, res) => {
  try {
    res.status(201).json(await employeeService.create(req.body));
    logger.info('Employee created successfully');
  } catch (error) {
    fail(res, error);
  }
};

export const update = async (req, res) => {
  try {
    // Same rules as create(): password is hashed, response is sanitized.
    const employee = await employeeService.update(req.params.id, req.body);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
    logger.info(`Employee with id ${req.params.id} updated successfully`);
  } catch (error) {
    fail(res, error);
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await employeeService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Employee not found' });
    res.status(204).send();
    logger.info(`Employee with id ${req.params.id} deleted successfully`);
  } catch (error) {
    fail(res, error);
  }
};
