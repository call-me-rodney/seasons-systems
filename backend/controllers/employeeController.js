import { Employee } from '../models';

export default {
  async getAll(req, res) {
    const employees = await Employee.findAll();
    res.json(employees);
  },
  async getById(req, res) {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Not found' });
    res.json(employee);
  },
  async create(req, res) {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  },
  async update(req, res) {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Not found' });
    await employee.update(req.body);
    res.json(employee);
  },
  async remove(req, res) {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Not found' });
    await employee.destroy();
    res.status(204).send();
  },
};
