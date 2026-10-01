import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configs from '../configs/configs.js';
import logger from '../utils/logger.js';
import dbPromise from '../models/index.js';

let Employee;

async function getEmployee() {
  if (!Employee) {
    const db = await dbPromise;
    Employee = db.Employee;
  }
  return Employee;
}

export default {
  async login(name, password) {
    const Employee = await getEmployee();
    const user = await Employee.findOne({ where: { name } });
    if (!user) {
      logger.error('Invalid credentials: User does not exist!');
      throw { status: 401, message: 'Invalid credentials: User does not exist!' };
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      logger.error('Invalid credentials: Incorrect password!');
      throw { status: 401, message: 'Invalid credentials: Incorrect password!' };
    }
    const token = jwt.sign(
      { id: user.employeeID, role: user.role, department: user.department },
      configs.auth.jwtSecret,
      { expiresIn: configs.auth.jwtExpiresIn }
    );
    logger.info(`User ${user.name} logged in successfully`);
    return { token, user: { id: user.employeeID, name: user.name, role: user.role, department: user.department } };
  }
};
