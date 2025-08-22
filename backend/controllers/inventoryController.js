import { Inventory } from '../models';

export default {
  async getAll(req, res) {
    const inventory = await Inventory.findAll();
    res.json(inventory);
  },
  async getById(req, res) {
    const item = await Inventory.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  },
  async create(req, res) {
    const item = await Inventory.create(req.body);
    res.status(201).json(item);
  },
  async update(req, res) {
    const item = await Inventory.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.update(req.body);
    res.json(item);
  },
  async remove(req, res) {
    const item = await Inventory.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.destroy();
    res.status(204).send();
  },
};
