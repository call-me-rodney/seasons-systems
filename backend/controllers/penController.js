import dbPromise from '../models/index.js';
import logger from '../utils/logger.js';

const db = await dbPromise;
const { Pen } = db;
export const getAll = async (req, res) => {
  try {
    const pens = await Pen.findAll();
    res.json(pens);
    logger.info('All pens retrieved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const getById = async (req, res) => {
  try {
    const pen = await Pen.findByPk(req.params.id);
    if (pen) {
      res.json(pen);
      logger.info(`Pen with id ${req.params.id} retrieved successfully`);
    } else {
      res.status(404).json({ error: 'Pen not found' });
      logger.error(`Pen with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const create = async (req, res) => {
  try {
    const pen = await Pen.create(req.body);
    res.status(201).json(pen);
    logger.info('Pen created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const pen = await Pen.findByPk(req.params.id);
    if (pen) {
      await pen.update(req.body);
      res.json(pen);
      logger.info(`Pen with id ${req.params.id} updated successfully`);
    } else {
      res.status(404).json({ error: 'Pen not found' });
      logger.error(`Pen with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const pen = await Pen.findByPk(req.params.id);
    if (pen) {
      await pen.destroy();
      res.status(204).send();
      logger.info(`Pen with id ${req.params.id} deleted successfully`);
    } else {
      res.status(404).json({ error: 'Pen not found' });
      logger.error(`Pen with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};