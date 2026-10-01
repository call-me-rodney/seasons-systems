import * as employeeService from '../services/employeeService.js';
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
