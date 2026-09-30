/*
 * ============================================================================
 *  SOLID DEMO — O: OPEN/CLOSED PRINCIPLE
 *  "Software entities should be open for extension, closed for modification."
 *  Original: getAggregatedAnalytics in controllers/superAdminController.js
 *  (moved to its own file as part of the SRP split; see
 *  superAdminController-SOLID.js)
 * ============================================================================
 *
 *  WHAT WAS WRONG
 *  --------------
 *  The original function worked like this:
 *
 *      const [totalEmployees, activeEmployees, ... 23 names ...] =
 *        await Promise.all([ Employee.count(), Employee.count({...}), ... ]);
 *      res.json({ totalEmployees, activeEmployees, ... 23 names again ... });
 *
 *  Adding ONE metric meant editing the function body in THREE places:
 *    1. the list of variable names,
 *    2. the list of queries, in the SAME order (easy to misalign), and
 *    3. the response object.
 *  If a query was inserted in the wrong position, every value after it was
 *  silently reported under the wrong name. There was no error.
 *
 *  WHAT IMPROVED
 *  -------------
 *    - Each metric is one self-contained entry: { name, query }.
 *    - The function that runs them (buildAnalytics) is CLOSED: it never needs
 *      editing again.
 *    - The report is OPEN: to add a metric, add one line to `metrics`.
 *      Other modules can also pass their own metric list to
 *      createAnalyticsHandler() without touching this file.
 *    - A name is always next to its query, so they cannot get out of order.
 *
 *  Example: adding "harvestedCrops" to the report is now one line:
 *      { name: 'harvestedCrops', query: () => Crop.count({ where: { status: 'harvested' } }) },
 * ============================================================================
 */
import {
  Employee, Crop, Livestock, Field, Pen, Equipment,
  Inventory, Sales, SalesDetails, Supplier, Resupply,
} from '../models/index-SOLID.mjs';
import logger from '../utils/logger.js';

// ---- EXTEND HERE: one line per metric --------------------------------------
export const metrics = [
  { name: 'totalEmployees',        query: () => Employee.count() },
  { name: 'activeEmployees',       query: () => Employee.count({ where: { isActive: true } }) },
  { name: 'adminEmployees',        query: () => Employee.count({ where: { role: 'admin' } }) },
  { name: 'totalCrops',            query: () => Crop.count() },
  { name: 'growingCrops',          query: () => Crop.count({ where: { status: 'growing' } }) },
  { name: 'totalLivestock',        query: () => Livestock.count() },
  { name: 'activeLivestock',       query: () => Livestock.count({ where: { status: 'active' } }) },
  { name: 'totalFields',           query: () => Field.count() },
  { name: 'activeFields',          query: () => Field.count({ where: { isActive: true } }) },
  { name: 'totalPens',             query: () => Pen.count() },
  { name: 'fullPens',              query: () => Pen.count({ where: { isFull: true } }) },
  { name: 'totalEquipment',        query: () => Equipment.count() },
  { name: 'inUseEquipment',        query: () => Equipment.count({ where: { isInUse: true } }) },
  { name: 'newEquipment',          query: () => Equipment.count({ where: { status: 'new' } }) },
  { name: 'damagedEquipment',      query: () => Equipment.count({ where: { status: 'damaged' } }) },
  { name: 'totalInventory',        query: () => Inventory.count() },
  { name: 'cropProduceInventory',  query: () => Inventory.count({ where: { type: 'crop_produce' } }) },
  { name: 'meatProduceInventory',  query: () => Inventory.count({ where: { type: 'meat_produce' } }) },
  { name: 'totalSales',            query: () => Sales.count() },
  { name: 'totalSalesAmount',      query: async () => (await SalesDetails.sum('saleTotal')) || 0 },
  { name: 'totalSuppliers',        query: () => Supplier.count() },
  { name: 'totalResupplies',       query: () => Resupply.count() },
  { name: 'pendingResupplies',     query: () => Resupply.count({ where: { deliveryDate: null } }) },
];

// ---- CLOSED: works for any list of metrics, never needs editing ------------
export const buildAnalytics = async (metricList) => {
  const values = await Promise.all(metricList.map((metric) => metric.query()));
  return Object.fromEntries(metricList.map((metric, i) => [metric.name, values[i]]));
};

export const createAnalyticsHandler = (metricList) => async (req, res) => {
  try {
    res.json(await buildAnalytics(metricList));
    logger.info('Aggregated analytics retrieved successfully');
  } catch (error) {
    logger.error(`Error retrieving aggregated analytics: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

// Same name as the original handler, so routes/superAdmin.js can switch to it.
export const getAggregatedAnalytics = createAnalyticsHandler(metrics);
