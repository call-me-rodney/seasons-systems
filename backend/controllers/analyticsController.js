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