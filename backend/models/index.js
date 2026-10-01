import Sequelize from 'sequelize';
import configs from '../configs/configs.js';

import defineCrop from './crop.js';
import defineEmployee from './employee.js';
import defineEquipment from './equipment.js';
import defineField from './field.js';
import defineInventory from './inventory.js';
import defineLivestock from './livestock.js';
import definePen from './pen.js';
import defineResupply from './resupply.js';
import defineSales from './sales.js';
import defineSalesDetails from './salesdetails.js';
import defineSupplier from './supplier.js';

// --- Infrastructure interface (for server.js, not for controllers) ----------
export const sequelize = new Sequelize(configs.database.url, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: configs.database.ssl,
});

// --- Explicit registration (no directory scanning) --------------------------
const definers = [
  defineCrop,
  defineEmployee,
  defineEquipment,
  defineField,
  defineInventory,
  defineLivestock,
  definePen,
  defineResupply,
  defineSales,
  defineSalesDetails,
  defineSupplier,
];

const registry = {};
for (const define of definers) {
  const model = define(sequelize, Sequelize.DataTypes);
  registry[model.name] = model;
}
for (const model of Object.values(registry)) {
  if (model.associate) model.associate(registry);
}

// --- Segregated model interfaces: import only the ones you need -------------
export const Crop = registry.Crop;
export const Employee = registry.Employee;
export const Equipment = registry.Equipment;
export const Field = registry.Field;
export const Inventory = registry.Inventory;
export const Livestock = registry.Livestock;
export const Pen = registry.Pen;
export const Resupply = registry.Resupply;
export const Sales = registry.Sales;
export const SalesDetails = registry.SalesDetails;
export const Supplier = registry.Supplier;
