import dbPromise from '../models/index.js';
import logger from '../utils/logger.js';

const db = await dbPromise;
const { Supplier } = db;

export const getAll = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
    logger.info('All suppliers retrieved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const getById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      res.json(supplier);
      logger.info(`Supplier with id ${req.params.id} retrieved successfully`);
    } else {
      res.status(404).json({ error: 'Supplier not found' });
      logger.error(`Supplier with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const create = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
    logger.info('Supplier created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      await supplier.update(req.body);
      res.json(supplier);
      logger.info(`Supplier with id ${req.params.id} updated successfully`);
    } else {
      res.status(404).json({ error: 'Supplier not found' });
      logger.error(`Supplier with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      await supplier.destroy();
      res.status(204).send();
      logger.info(`Supplier with id ${req.params.id} deleted successfully`);
    } else {
      res.status(404).json({ error: 'Supplier not found' });
      logger.error(`Supplier with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};