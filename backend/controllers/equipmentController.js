import { Equipment } from '../models';

export default {
  async getAll(req, res) {
    const equipment = await Equipment.findAll();
    res.json(equipment);
  },
  async getById(req, res) {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) return res.status(404).json({ error: 'Not found' });
    res.json(equipment);
  },
  async create(req, res) {
    const equipment = await Equipment.create(req.body);
    res.status(201).json(equipment);
  },
  async update(req, res) {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) return res.status(404).json({ error: 'Not found' });
    await equipment.update(req.body);
    res.json(equipment);
  },
  async remove(req, res) {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) return res.status(404).json({ error: 'Not found' });
    await equipment.destroy();
    res.status(204).send();
  },
};
