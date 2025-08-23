import { Employee } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configs from '../configs/configs';
import logger from '../utils/logger.js';

export default {
  async login(req, res) {
    const { name, password } = req.body;
    const user = await Employee.findOne({ where: { name } });
    if (!user) {
      logger.error('Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      logger.error('Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user.employeeID, role: user.role, department: user.department },
      configs.auth.jwtSecret,
      { expiresIn: configs.auth.jwtExpiresIn }
    );
    res.json({ token, user: { id: user.employeeID, name: user.name, role: user.role, department: user.department } });
    logger.info(`User ${user.name} logged in successfully`);
  },
};
