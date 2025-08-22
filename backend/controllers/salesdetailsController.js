import { SalesDetails } from '../models';

export default {
  async getAll(req, res) {
    const details = await SalesDetails.findAll();
    res.json(details);
  },
  async getById(req, res) {
    const detail = await SalesDetails.findByPk(req.params.id);
    if (!detail) return res.status(404).json({ error: 'Not found' });
    res.json(detail);
  },
  async create(req, res) {
    const detail = await SalesDetails.create(req.body);
    res.status(201).json(detail);
  },
  async update(req, res) {
    const detail = await SalesDetails.findByPk(req.params.id);
    if (!detail) return res.status(404).json({ error: 'Not found' });
    await detail.update(req.body);
    res.json(detail);
  },
  async remove(req, res) {
    const detail = await SalesDetails.findByPk(req.params.id);
    if (!detail) return res.status(404).json({ error: 'Not found' });
    await detail.destroy();
    res.status(204).send();
  },
};
