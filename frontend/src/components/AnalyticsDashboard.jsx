import React, { useState, useEffect } from 'react';
import { getEmployees, getCrops, getLivestock, getFields, getPens, getEquipment, getInventory, getSales, getSuppliers, getResupplies } from '../services/api';

const AnalyticsDashboard = () => {
  const [data, setData] = useState({
    totalEmployees: 0,
    totalCrops: 0,
    totalLivestock: 0,
    totalFields: 0,
    totalPens: 0,
    totalEquipment: 0,
    totalInventory: 0,
    totalSales: 0,
    totalSuppliers: 0,
    totalResupplies: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employees, crops, livestock, fields, pens, equipment, inventory, sales, suppliers, resupplies] = await Promise.all([
          getEmployees(),
          getCrops(),
          getLivestock(),
          getFields(),
          getPens(),
          getEquipment(),
          getInventory(),
          getSales(),
          getSuppliers(),
          getResupplies(),
        ]);

        setData({
          totalEmployees: employees.data.length,
          totalCrops: crops.data.length,
          totalLivestock: livestock.data.length,
          totalFields: fields.data.length,
          totalPens: pens.data.length,
          totalEquipment: equipment.data.length,
          totalInventory: inventory.data.length,
          totalSales: sales.data.length,
          totalSuppliers: suppliers.data.length,
          totalResupplies: resupplies.data.length,
        });
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading analytics data...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error loading analytics: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-gray-700">Total Employees</h4>
        <p className="text-2xl font-bold text-seasons-green">{data.totalEmployees}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-gray-700">Total Crops</h4>
        <p className="text-2xl font-bold text-seasons-orange">{data.totalCrops}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-gray-700">Total Livestock</h4>
        <p className="text-2xl font-bold text-seasons-green">{data.totalLivestock}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-gray-700">Total Fields</h4>
        <p className="text-2xl font-bold text-seasons-orange">{data.totalFields}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-gray-700">Total Pens</h4>
        <p className="text-2xl font-bold text-seasons-green">{data.totalPens}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-gray-700">Total Equipment</h4>
        <p className="text-2xl font-bold text-seasons-orange">{data.totalEquipment}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-gray-700">Total Inventory Items</h4>
        <p className="text-2xl font-bold text-seasons-green">{data.totalInventory}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-gray-700">Total Sales</h4>
        <p className="text-2xl font-bold text-seasons-orange">{data.totalSales}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-gray-700">Total Suppliers</h4>
        <p className="text-2xl font-bold text-seasons-green">{data.totalSuppliers}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-md font-medium text-gray-700">Total Resupply Requests</h4>
        <p className="text-2xl font-bold text-seasons-orange">{data.totalResupplies}</p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
