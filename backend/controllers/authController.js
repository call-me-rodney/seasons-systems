import { Employee } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configs from '../configs/configs';

export default {
  async login(req, res) {
    const { name, password } = req.body;
    const user = await Employee.findOne({ where: { name } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign(
      { id: user.employeeID, role: user.role, department: user.department },
      configs.auth.jwtSecret,
      { expiresIn: configs.auth.jwtExpiresIn }
    );
    res.json({ token, user: { id: user.employeeID, name: user.name, role: user.role, department: user.department } });
  },
};
