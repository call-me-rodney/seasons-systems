import db from '../models/index.js';
import logger from '../utils/logger.js';
const Livestock = db.Livestock;

export const getAll = async (req, res) => {
  try {
    const livestock = await Livestock.findAll();
    res.json(livestock);
    logger.info('All livestock retrieved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const getById = async (req, res) => {
  try {
    const livestock = await Livestock.findByPk(req.params.id);
    if (livestock) {
      res.json(livestock);
      logger.info(`Livestock with id ${req.params.id} retrieved successfully`);
    } else {
      res.status(404).json({ error: 'Livestock not found' });
      logger.error(`Livestock with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const create = async (req, res) => {
  try {
    const livestock = await Livestock.create(req.body);
    res.status(201).json(livestock);
    logger.info('Livestock created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const livestock = await Livestock.findByPk(req.params.id);
    if (livestock) {
      await livestock.update(req.body);
      res.json(livestock);
      logger.info(`Livestock with id ${req.params.id} updated successfully`);
    } else {
      res.status(404).json({ error: 'Livestock not found' });
      logger.error(`Livestock with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const livestock = await Livestock.findByPk(req.params.id);
    if (livestock) {
      await livestock.destroy();
      res.status(204).send();
      logger.info(`Livestock with id ${req.params.id} deleted successfully`);
    } else {
      res.status(404).json({ error: 'Livestock not found' });
      logger.error(`Livestock with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};