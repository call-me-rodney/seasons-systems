import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllUsers, createUser, updateUser, deleteUser, getAggregatedAnalytics } from '../services/api';
import FormModal from '../components/FormModal';
import EmployeeForm from '../components/EmployeeForm'; // Reusing EmployeeForm for user management
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [analyticsData, setAnalyticsData] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [errorAnalytics, setErrorAnalytics] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'superAdmin') {
      fetchUsers();
      fetchAnalytics();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      setLoadingAnalytics(true);
      const response = await getAggregatedAnalytics();
      setAnalyticsData(response.data);
    } catch (err) {
      setErrorAnalytics(err.response?.data?.error || err.message);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        fetchUsers(); // Re-fetch users after deletion
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      }
    }
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    fetchUsers(); // Re-fetch users after successful creation/update
  };

  if (user?.role !== 'superAdmin') {
    return <div className="text-red-500">Access Denied: You must be a Super Admin to view this page.</div>;
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h2>
      <p className="text-gray-600">Manage all system users and their roles/departments.</p>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="space-y-4">
          <button
            onClick={handleAddUser}
            className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
          >
            Add New User
          </button>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((u) => (
                  <tr key={u.employeeID}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.isActive ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEditUser(u)} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button onClick={() => handleDeleteUser(u.employeeID)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Aggregated Analytics</h3>
      {loadingAnalytics && <p>Loading analytics data...</p>}
      {errorAnalytics && <p className="text-red-500">Error loading analytics: {errorAnalytics.message}</p>}
      {!loadingAnalytics && !errorAnalytics && analyticsData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Total Employees</h4>
            <p className="text-2xl font-bold text-seasons-green">{analyticsData.totalEmployees}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Active Employees</h4>
            <p className="text-2xl font-bold text-seasons-orange">{analyticsData.activeEmployees}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Admin Employees</h4>
            <p className="text-2xl font-bold text-seasons-green">{analyticsData.adminEmployees}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow col-span-full">
            <h4 className="text-md font-medium text-gray-700 mb-4">Employee Roles Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'Active', value: analyticsData.activeEmployees },
                  { name: 'Inactive', value: analyticsData.totalEmployees - analyticsData.activeEmployees },
                  { name: 'Admins', value: analyticsData.adminEmployees },
                  { name: 'Users', value: analyticsData.totalEmployees - analyticsData.adminEmployees },
                ]}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Total Crops</h4>
            <p className="text-2xl font-bold text-seasons-orange">{analyticsData.totalCrops}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Growing Crops</h4>
            <p className="text-2xl font-bold text-seasons-green">{analyticsData.growingCrops}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Total Livestock</h4>
            <p className="text-2xl font-bold text-seasons-orange">{analyticsData.totalLivestock}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Active Livestock</h4>
            <p className="text-2xl font-bold text-seasons-green">{analyticsData.activeLivestock}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Total Fields</h4>
            <p className="text-2xl font-bold text-seasons-orange">{analyticsData.totalFields}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Active Fields</h4>
            <p className="text-2xl font-bold text-seasons-green">{analyticsData.activeFields}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Total Pens</h4>
            <p className="text-2xl font-bold text-seasons-orange">{analyticsData.totalPens}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Full Pens</h4>
            <p className="text-2xl font-bold text-seasons-green">{analyticsData.fullPens}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Total Equipment</h4>
            <p className="text-2xl font-bold text-seasons-orange">{analyticsData.totalEquipment}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">In Use Equipment</h4>
            <p className="text-2xl font-bold text-seasons-green">{analyticsData.inUseEquipment}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">New Equipment</h4>
            <p className="text-2xl font-bold text-seasons-orange">{analyticsData.newEquipment}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Damaged Equipment</h4>
            <p className="text-2xl font-bold text-seasons-green">{analyticsData.damagedEquipment}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow col-span-full">
            <h4 className="text-md font-medium text-gray-700 mb-4">Equipment Status Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'New', value: analyticsData.newEquipment },
                  { name: 'Damaged', value: analyticsData.damagedEquipment },
                  { name: 'In Use', value: analyticsData.inUseEquipment },
                  { name: 'Available', value: analyticsData.totalEquipment - analyticsData.inUseEquipment - analyticsData.damagedEquipment - analyticsData.newEquipment },
                ]}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Total Inventory Items</h4>
            <p className="text-2xl font-bold text-seasons-orange">{analyticsData.totalInventory}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Crop Produce Inventory</h4>
            <p className="text-2xl font-bold text-seasons-green">{analyticsData.cropProduceInventory}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Meat Produce Inventory</h4>
            <p className="text-2xl font-bold text-seasons-orange">{analyticsData.meatProduceInventory}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow col-span-full">
            <h4 className="text-md font-medium text-gray-700 mb-4">Inventory Type Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Crop Produce', value: analyticsData.cropProduceInventory },
                    { name: 'Meat Produce', value: analyticsData.meatProduceInventory },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {
                    [
                      { name: 'Crop Produce', value: analyticsData.cropProduceInventory },
                      { name: 'Meat Produce', value: analyticsData.meatProduceInventory },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#4ade80' : '#fb923c'} />
                    ))
                  }
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow col-span-full">
            <h4 className="text-md font-medium text-gray-700 mb-4">Inventory Type Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Crop Produce', value: analyticsData.cropProduceInventory },
                    { name: 'Meat Produce', value: analyticsData.meatProduceInventory },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {
                    [
                      { name: 'Crop Produce', value: analyticsData.cropProduceInventory },
                      { name: 'Meat Produce', value: analyticsData.meatProduceInventory },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#4ade80' : '#fb923c'} />
                    ))
                  }
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Total Sales</h4>
            <p className="text-2xl font-bold text-seasons-green">{analyticsData.totalSales}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Total Sales Amount</h4>
            <p className="text-2xl font-bold text-seasons-orange">${analyticsData.totalSalesAmount?.toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Total Suppliers</h4>
            <p className="text-2xl font-bold text-seasons-green">{analyticsData.totalSuppliers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Total Resupply Requests</h4>
            <p className="text-2xl font-bold text-seasons-orange">{analyticsData.totalResupplies}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-md font-medium text-gray-700">Pending Resupply Requests</h4>
            <p className="text-2xl font-bold text-seasons-green">{analyticsData.pendingResupplies}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow col-span-full">
            <h4 className="text-md font-medium text-gray-700 mb-4">Resupply Request Status</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'Pending', value: analyticsData.pendingResupplies },
                  { name: 'Completed', value: analyticsData.totalResupplies - analyticsData.pendingResupplies },
                ]}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingUser ? 'Edit User' : 'Add New User'}>
        <EmployeeForm employee={editingUser} onSuccess={handleFormSuccess} onClose={() => setIsModalOpen(false)} />
      </FormModal>
    </div>
  );
};

export default SuperAdminDashboard;
