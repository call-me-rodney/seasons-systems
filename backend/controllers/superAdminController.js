import dbPromise from '../models/index.js';
import logger from '../utils/logger.js';
import bcrypt from 'bcrypt';
import configs from '../configs/configs.js';

const db = await dbPromise;
const { Employee } = db;

export const getAllUsers = async (req, res) => {
  try {
    const users = await Employee.findAll({
      attributes: { exclude: ['password'] } // Exclude password from results
    });
    res.json(users);
    logger.info('All users retrieved by super admin successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(`Error retrieving all users: ${error.message}`);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await Employee.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
      logger.info(`User with id ${req.params.id} retrieved by super admin successfully`);
    } else {
      res.status(404).json({ error: 'User not found' });
      logger.error(`User with id ${req.params.id} not found by super admin`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(`Error retrieving user by id: ${error.message}`);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, password, role, department, dateOfHire, contact } = req.body;
    const hashedPassword = await bcrypt.hash(password, configs.auth.bcryptSaltRounds);
    const newUser = await Employee.create({
      name,
      password: hashedPassword,
      role,
      department,
      dateOfHire,
      contact,
      isActive: true,
    });
    res.status(201).json({ message: 'User created successfully', user: { id: newUser.employeeID, name: newUser.name, role: newUser.role, department: newUser.department } });
    logger.info(`User ${newUser.name} created by super admin successfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(`Error creating user: ${error.message}`);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...updateData } = req.body;

    const user = await Employee.findByPk(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      logger.error(`User with id ${id} not found for update by super admin`);
      return;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, configs.auth.bcryptSaltRounds);
    }

    await user.update(updateData);
    res.json({ message: 'User updated successfully', user: { id: user.employeeID, name: user.name, role: user.role, department: user.department } });
    logger.info(`User with id ${id} updated by super admin successfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(`Error updating user: ${error.message}`);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Employee.findByPk(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      logger.error(`User with id ${id} not found for deletion by super admin`);
      return;
    }

    await user.destroy();
    res.status(204).send();
    logger.info(`User with id ${id} deleted by super admin successfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
    logger.error(`Error deleting user: ${error.message}`);
  }
};
