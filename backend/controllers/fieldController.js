import { Field } from '../models';

export default {
  async getAll(req, res) {
    const fields = await Field.findAll();
    res.json(fields);
  },
  async getById(req, res) {
    const field = await Field.findByPk(req.params.id);
    if (!field) return res.status(404).json({ error: 'Not found' });
    res.json(field);
  },
  async create(req, res) {
    const field = await Field.create(req.body);
    res.status(201).json(field);
  },
  async update(req, res) {
    const field = await Field.findByPk(req.params.id);
    if (!field) return res.status(404).json({ error: 'Not found' });
    await field.update(req.body);
    res.json(field);
  },
  async remove(req, res) {
    const field = await Field.findByPk(req.params.id);
    if (!field) return res.status(404).json({ error: 'Not found' });
    await field.destroy();
    res.status(204).send();
  },
};
