export const getAggregatedAnalytics = async (req, res) => {
  try {
    const [totalEmployees, activeEmployees, adminEmployees, totalCrops, growingCrops, totalLivestock, activeLivestock, totalFields, activeFields, totalPens, fullPens, totalEquipment, inUseEquipment, newEquipment, damagedEquipment, totalInventory, cropProduceInventory, meatProduceInventory, totalSales, totalSalesAmount, totalSuppliers, totalResupplies, pendingResupplies,] = await Promise.all([
      Employee.count(),
      Employee.count({ where: { isActive: true } }),
      Employee.count({ where: { role: 'admin' } }),