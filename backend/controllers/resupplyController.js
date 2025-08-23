import db from '../models';
import logger from '../utils/logger.js';
const Resupply = db.Resupply;

export const getAll = async (req, res) => {
  try {
    const resupplies = await Resupply.findAll();
    res.json(resupplies);
    logger.info('All resupplies retrieved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const getById = async (req, res) => {
  try {
    const resupply = await Resupply.findByPk(req.params.id);
    if (resupply) {
      res.json(resupply);
      logger.info(`Resupply with id ${req.params.id} retrieved successfully`);
    } else {
      res.status(404).json({ error: 'Resupply not found' });
      logger.error(`Resupply with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const create = async (req, res) => {
  try {
    const resupply = await Resupply.create(req.body);
    res.status(201).json(resupply);
    logger.info('Resupply created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const resupply = await Resupply.findByPk(req.params.id);
    if (resupply) {
      await resupply.update(req.body);
      res.json(resupply);
      logger.info(`Resupply with id ${req.params.id} updated successfully`);
    } else {
      res.status(404).json({ error: 'Resupply not found' });
      logger.error(`Resupply with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const resupply = await Resupply.findByPk(req.params.id);
    if (resupply) {
      await resupply.destroy();
      res.status(204).send();
      logger.info(`Resupply with id ${req.params.id} deleted successfully`);
    } else {
      res.status(404).json({ error: 'Resupply not found' });
      logger.error(`Resupply with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};