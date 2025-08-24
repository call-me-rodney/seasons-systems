import db from '../models/index.js';
import logger from '../utils/logger.js';
const Sales = db.Sales;

export const getAll = async (req, res) => {
  try {
    const sales = await Sales.findAll();
    res.json(sales);
    logger.info('All sales retrieved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const getById = async (req, res) => {
  try {
    const sale = await Sales.findByPk(req.params.id);
    if (sale) {
      res.json(sale);
      logger.info(`Sale with id ${req.params.id} retrieved successfully`);
    } else {
      res.status(404).json({ error: 'Sale not found' });
      logger.error(`Sale with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const create = async (req, res) => {
  try {
    const sale = await Sales.create(req.body);
    res.status(201).json(sale);
    logger.info('Sale created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const sale = await Sales.findByPk(req.params.id);
    if (sale) {
      await sale.update(req.body);
      res.json(sale);
      logger.info(`Sale with id ${req.params.id} updated successfully`);
    } else {
      res.status(404).json({ error: 'Sale not found' });
      logger.error(`Sale with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const sale = await Sales.findByPk(req.params.id);
    if (sale) {
      await sale.destroy();
      res.status(204).send();
      logger.info(`Sale with id ${req.params.id} deleted successfully`);
    } else {
      res.status(404).json({ error: 'Sale not found' });
      logger.error(`Sale with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};