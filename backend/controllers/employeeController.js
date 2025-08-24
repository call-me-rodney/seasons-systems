import dbPromise from '../models/index.js';
import logger from '../utils/logger.js';

const db = await dbPromise;
const { Employee } = db;

export const getAll = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
    logger.info('All employees retrieved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const getById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      res.json(employee);
      logger.info(`Employee with id ${req.params.id} retrieved successfully`);
    } else {
      res.status(404).json({ error: 'Employee not found' });
      logger.error(`Employee with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const create = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
    logger.info('Employee created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      await employee.update(req.body);
      res.json(employee);
      logger.info(`Employee with id ${req.params.id} updated successfully`);
    } else {
      res.status(404).json({ error: 'Employee not found' });
      logger.error(`Employee with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      await employee.destroy();
      res.status(204).send();
      logger.info(`Employee with id ${req.params.id} deleted successfully`);
    } else {
      res.status(404).json({ error: 'Employee not found' });
      logger.error(`Employee with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};