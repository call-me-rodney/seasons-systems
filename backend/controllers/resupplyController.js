import { Resupply } from '../models';

export default {
  async getAll(req, res) {
    const resupplies = await Resupply.findAll();
    res.json(resupplies);
  },
  async getById(req, res) {
    const resupply = await Resupply.findByPk(req.params.id);
    if (!resupply) return res.status(404).json({ error: 'Not found' });
    res.json(resupply);
  },
  async create(req, res) {
    const resupply = await Resupply.create(req.body);
    res.status(201).json(resupply);
  },
  async update(req, res) {
    const resupply = await Resupply.findByPk(req.params.id);
    if (!resupply) return res.status(404).json({ error: 'Not found' });
    await resupply.update(req.body);
    res.json(resupply);
  },
  async remove(req, res) {
    const resupply = await Resupply.findByPk(req.params.id);
    if (!resupply) return res.status(404).json({ error: 'Not found' });
    await resupply.destroy();
    res.status(204).send();
  },
};
