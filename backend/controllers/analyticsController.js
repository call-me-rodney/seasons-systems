import dbPromise from '../models/index.js';
import logger from '../utils/logger.js';

const db = await dbPromise;
const { Employee, Crop, Livestock, Field, Pen, Equipment, Inventory, Sales, SalesDetails, Supplier, Resupply } = db;

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
export const getAggregatedAnalytics = async (req, res) => {
  
};