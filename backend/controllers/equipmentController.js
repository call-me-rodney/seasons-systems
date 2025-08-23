import db from '../models';
import logger from '../utils/logger.js';
const Equipment = db.Equipment;

export const getAll = async (req, res) => {
  try {
    const equipment = await Equipment.findAll();
    res.json(equipment);
    logger.info('All equipment retrieved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const getById = async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      res.json(equipment);
      logger.info(`Equipment with id ${req.params.id} retrieved successfully`);
    } else {
      res.status(404).json({ error: 'Equipment not found' });
      logger.error(`Equipment with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const create = async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.status(201).json(equipment);
    logger.info('Equipment created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      await equipment.update(req.body);
      res.json(equipment);
      logger.info(`Equipment with id ${req.params.id} updated successfully`);
    } else {
      res.status(404).json({ error: 'Equipment not found' });
      logger.error(`Equipment with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      await equipment.destroy();
      res.status(204).send();
      logger.info(`Equipment with id ${req.params.id} deleted successfully`);
    } else {
      res.status(404).json({ error: 'Equipment not found' });
      logger.error(`Equipment with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};