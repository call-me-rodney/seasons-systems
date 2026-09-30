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