import { Pen } from '../models';

export default {
  async getAll(req, res) {
    const pens = await Pen.findAll();
    res.json(pens);
  },
  async getById(req, res) {
    const pen = await Pen.findByPk(req.params.id);
    if (!pen) return res.status(404).json({ error: 'Not found' });
    res.json(pen);
  },
  async create(req, res) {
    const pen = await Pen.create(req.body);
    res.status(201).json(pen);
  },
  async update(req, res) {
    const pen = await Pen.findByPk(req.params.id);
    if (!pen) return res.status(404).json({ error: 'Not found' });
    await pen.update(req.body);
    res.json(pen);
  },
  async remove(req, res) {
    const pen = await Pen.findByPk(req.params.id);
    if (!pen) return res.status(404).json({ error: 'Not found' });
    await pen.destroy();
    res.status(204).send();
  },
};
