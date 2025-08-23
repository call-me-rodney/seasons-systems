import db from '../models';
import logger from '../utils/logger.js';
const Field = db.Field;

export const getAll = async (req, res) => {
  try {
    const fields = await Field.findAll();
    res.json(fields);
    logger.info('All fields retrieved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const getById = async (req, res) => {
  try {
    const field = await Field.findByPk(req.params.id);
    if (field) {
      res.json(field);
      logger.info(`Field with id ${req.params.id} retrieved successfully`);
    } else {
      res.status(404).json({ error: 'Field not found' });
      logger.error(`Field with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const create = async (req, res) => {
  try {
    const field = await Field.create(req.body);
    res.status(201).json(field);
    logger.info('Field created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const field = await Field.findByPk(req.params.id);
    if (field) {
      await field.update(req.body);
      res.json(field);
      logger.info(`Field with id ${req.params.id} updated successfully`);
    } else {
      res.status(404).json({ error: 'Field not found' });
      logger.error(`Field with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const field = await Field.findByPk(req.params.id);
    if (field) {
      await field.destroy();
      res.status(204).send();
      logger.info(`Field with id ${req.params.id} deleted successfully`);
    } else {
      res.status(404).json({ error: 'Field not found' });
      logger.error(`Field with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};