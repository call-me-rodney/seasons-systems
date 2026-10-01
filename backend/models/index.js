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
