import { Sales } from '../models';

export default {
  async getAll(req, res) {
    const sales = await Sales.findAll();
    res.json(sales);
  },
  async getById(req, res) {
    const sale = await Sales.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Not found' });
    res.json(sale);
  },
  async create(req, res) {
    const sale = await Sales.create(req.body);
    res.status(201).json(sale);
  },
  async update(req, res) {
    const sale = await Sales.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Not found' });
    await sale.update(req.body);
    res.json(sale);
  },
  async remove(req, res) {
    const sale = await Sales.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Not found' });
    await sale.destroy();
    res.status(204).send();
  },
};
