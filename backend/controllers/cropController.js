import db from '../models/index.js';
import logger from '../utils/logger.js';
const Crop = db.Crop;

export const getAll = async (req, res) => {
  try {
    const crops = await Crop.findAll();
    res.json(crops);
    logger.info('All crops retrieved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const getById = async (req, res) => {
  try {
    const crop = await Crop.findByPk(req.params.id);
    if (crop) {
      res.json(crop);
      logger.info(`Crop with id ${req.params.id} retrieved successfully`);
    } else {
      res.status(404).json({ error: 'Crop not found' });
      logger.error(`Crop with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const create = async (req, res) => {
  try {
    const crop = await Crop.create(req.body);
    res.status(201).json(crop);
    logger.info('Crop created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const crop = await Crop.findByPk(req.params.id);
    if (crop) {
      await crop.update(req.body);
      res.json(crop);
      logger.info(`Crop with id ${req.params.id} updated successfully`);
    } else {
      res.status(404).json({ error: 'Crop not found' });
      logger.error(`Crop with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};

export const remove = async (req, res) => {
  try {
    const crop = await Crop.findByPk(req.params.id);
    if (crop) {
      await crop.destroy();
      res.status(204).send();
      logger.info(`Crop with id ${req.params.id} deleted successfully`);
    } else {
      res.status(404).json({ error: 'Crop not found' });
      logger.error(`Crop with id ${req.params.id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(error.message);
  }
};