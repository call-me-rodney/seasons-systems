import db from '../models/index.js';
import logger from '../utils/logger.js';
const SalesDetails = db.SalesDetails;

export const getAll = async (req, res) => {
  try {
    const salesdetails = await SalesDetails.findAll();
    res.json(salesdetails);
    logger.info('All salesdetails retrieved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const getById = async (req, res) => {
  try {
    const salesdetail = await SalesDetails.findByPk(req.params.id);
    if (salesdetail) {
      res.json(salesdetail);
      logger.info(`SalesDetail with id ${req.params.id} retrieved successfully`);
    } else {
      res.status(404).json({ error: 'SalesDetail not found' });
      logger.error(`SalesDetail with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const create = async (req, res) => {
  try {
    const salesdetail = await SalesDetails.create(req.body);
    res.status(201).json(salesdetail);
    logger.info('SalesDetail created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const salesdetail = await SalesDetails.findByPk(req.params.id);
    if (salesdetail) {
      await salesdetail.update(req.body);
      res.json(salesdetail);
      logger.info(`SalesDetail with id ${req.params.id} updated successfully`);
    } else {
      res.status(404).json({ error: 'SalesDetail not found' });
      logger.error(`SalesDetail with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const salesdetail = await SalesDetails.findByPk(req.params.id);
    if (salesdetail) {
      await salesdetail.destroy();
      res.status(204).send();
      logger.info(`SalesDetail with id ${req.params.id} deleted successfully`);
    } else {
      res.status(404).json({ error: 'SalesDetail not found' });
      logger.error(`SalesDetail with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};