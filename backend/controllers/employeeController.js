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
