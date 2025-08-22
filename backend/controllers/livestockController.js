import { Livestock } from '../models';

export default {
  async getAll(req, res) {
    const livestock = await Livestock.findAll();
    res.json(livestock);
  },
  async getById(req, res) {
    const animal = await Livestock.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Not found' });
    res.json(animal);
  },
  async create(req, res) {
    const animal = await Livestock.create(req.body);
    res.status(201).json(animal);
  },
  async update(req, res) {
    const animal = await Livestock.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Not found' });
    await animal.update(req.body);
    res.json(animal);
  },
  async remove(req, res) {
    const animal = await Livestock.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Not found' });
    await animal.destroy();
    res.status(204).send();
  },
};
