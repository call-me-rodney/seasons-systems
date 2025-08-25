import dbPromise from '../models/index.js';
import logger from '../utils/logger.js';
import bcrypt from 'bcrypt';
import configs from '../configs/configs.js';

const db = await dbPromise;
const { Employee, Crop, Livestock, Field, Pen, Equipment, Inventory, Sales, SalesDetails, Supplier, Resupply } = db;

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

export const getAggregatedAnalytics = async (req, res) => {
  try {
    const [totalEmployees, activeEmployees, adminEmployees, totalCrops, growingCrops, totalLivestock, activeLivestock, totalFields, activeFields, totalPens, fullPens, totalEquipment, inUseEquipment, newEquipment, damagedEquipment, totalInventory, cropProduceInventory, meatProduceInventory, totalSales, totalSalesAmount, totalSuppliers, totalResupplies, pendingResupplies,] = await Promise.all([
      Employee.count(),
      Employee.count({ where: { isActive: true } }),
      Employee.count({ where: { role: 'admin' } }),
      Crop.count(),
      Crop.count({ where: { status: 'growing' } }),
      Livestock.count(),
      Livestock.count({ where: { status: 'active' } }),
      Field.count(),
      Field.count({ where: { isActive: true } }),
      Pen.count(),
      Pen.count({ where: { isFull: true } }),
      Equipment.count(),
      Equipment.count({ where: { isInUse: true } }),
      Equipment.count({ where: { status: 'new' } }),
      Equipment.count({ where: { status: 'damaged' } }),
      Inventory.count(),
      Inventory.count({ where: { type: 'crop_produce' } }),
      Inventory.count({ where: { type: 'meat_produce' } }),
      Sales.count(),
      SalesDetails.sum('saleTotal'),
      Supplier.count(),
      Resupply.count(),
      Resupply.count({ where: { deliveryDate: null } }),
    ]);

    res.json({
      totalEmployees,
      activeEmployees,
      adminEmployees,
      totalCrops,
      growingCrops,
      totalLivestock,
      activeLivestock,
      totalFields,
      activeFields,
      totalPens,
      fullPens,
      totalEquipment,
      inUseEquipment,
      newEquipment,
      damagedEquipment,
      totalInventory,
      cropProduceInventory,
      meatProduceInventory,
      totalSales,
      totalSalesAmount: totalSalesAmount || 0,
      totalSuppliers,
      totalResupplies,
      pendingResupplies,
    });
    logger.info('Aggregated analytics retrieved successfully');
  } catch (error) {
    logger.error(`Error retrieving aggregated analytics: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
