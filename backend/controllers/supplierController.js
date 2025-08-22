import { Supplier } from '../models';

export default {
  async getAll(req, res) {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  },
  async getById(req, res) {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Not found' });
    res.json(supplier);
  },
  async create(req, res) {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  },
  async update(req, res) {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Not found' });
    await supplier.update(req.body);
    res.json(supplier);
  },
  async remove(req, res) {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Not found' });
    await supplier.destroy();
    res.status(204).send();
  },
};
