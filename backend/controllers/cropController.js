import { Crop } from '../models';

export default {
  async getAll(req, res) {
    const crops = await Crop.findAll();
    res.json(crops);
  },
  async getById(req, res) {
    const crop = await Crop.findByPk(req.params.id);
    if (!crop) return res.status(404).json({ error: 'Not found' });
    res.json(crop);
  },
  async create(req, res) {
    const crop = await Crop.create(req.body);
    res.status(201).json(crop);
  },
  async update(req, res) {
    const crop = await Crop.findByPk(req.params.id);
    if (!crop) return res.status(404).json({ error: 'Not found' });
    await crop.update(req.body);
    res.json(crop);
  },
  async remove(req, res) {
    const crop = await Crop.findByPk(req.params.id);
    if (!crop) return res.status(404).json({ error: 'Not found' });
    await crop.destroy();
    res.status(204).send();
  },
};
