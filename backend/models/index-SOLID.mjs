/*
 * ============================================================================
 *  SOLID DEMO — I: INTERFACE SEGREGATION PRINCIPLE
 *  "Clients should not be forced to depend on interfaces they do not use."
 *  Original file: models/index.js
 * ============================================================================
 *
 *  WHAT WAS WRONG
 *  --------------
 *  models/index.js exports ONE fat object: a promise of `db`, which contains
 *  every model plus the `sequelize` connection and the `Sequelize` library.
 *  Every controller had to do:
 *
 *      import dbPromise from '../models/index.js';
 *      const db = await dbPromise;
 *      const { Sales } = db;          // needs 1 thing, receives 13
 *
 *  Consequences:
 *    - salesController "depends on" Employee, Crop, the raw connection, etc.
 *      Nothing stops it from reaching into `db.sequelize` and running raw SQL.
 *    - You cannot tell from a file's imports which tables it actually touches.
 *    - Tests have to fake the ENTIRE db object just to test one controller.
 *
 *  WHAT IMPROVED
 *  -------------
 *    1. Each model is its own named export. A client imports ONLY what it uses:
 *
 *           import { Sales } from '../models/index-SOLID.mjs';
 *
 *    2. The connection (`sequelize`) is a separate export, intended only for
 *       infrastructure code (server.js / migrations) — not controllers.
 *    3. Models are registered explicitly instead of by scanning the folder,
 *       so the list of models is visible and no stray file can break loading.
 *
 *  WHY `.mjs`?
 *  -----------
 *  The ORIGINAL models/index.js loads every `*.js` file in this folder as a
 *  model. Naming this file `index-SOLID.js` would make the original loader try
 *  to treat it as a model and crash the app. `.mjs` is skipped by that filter
 *  and is still a normal ES module.
 * ============================================================================
 */
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
