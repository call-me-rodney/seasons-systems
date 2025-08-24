import dbPromise from '../models/index.js';
import logger from '../utils/logger.js';

const db = await dbPromise;
const { Inventory } = db;

export const getAll = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.json(inventory);
    logger.info('All inventory retrieved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const getById = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    if (inventory) {
      res.json(inventory);
      logger.info(`Inventory with id ${req.params.id} retrieved successfully`);
    } else {
      res.status(404).json({ error: 'Inventory not found' });
      logger.error(`Inventory with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const create = async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);
    res.status(201).json(inventory);
    logger.info('Inventory created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    if (inventory) {
      await inventory.update(req.body);
      res.json(inventory);
      logger.info(`Inventory with id ${req.params.id} updated successfully`);
    } else {
      res.status(404).json({ error: 'Inventory not found' });
      logger.error(`Inventory with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    if (inventory) {
      await inventory.destroy();
      res.status(204).send();
      logger.info(`Inventory with id ${req.params.id} deleted successfully`);
    } else {
      res.status(404).json({ error: 'Inventory not found' });
      logger.error(`Inventory with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};