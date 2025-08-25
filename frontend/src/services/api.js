import axios from 'axios';
import { config } from '../config/env.js';

const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Employee Endpoints
export const getEmployees = () => api.get('/employees');
export const getEmployeeById = (id) => api.get(`/employees/${id}`);
export const createEmployee = (data) => api.post('/employees', data);
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

// User Profile Endpoints (assuming employee is user)
export const updateUserProfile = (id, data) => api.put(`/employees/${id}`, data);

// Crop Endpoints
export const getCrops = () => api.get('/crops');
export const getCropById = (id) => api.get(`/crops/${id}`);
export const createCrop = (data) => api.post('/crops', data);
export const updateCrop = (id, data) => api.put(`/crops/${id}`, data);
export const deleteCrop = (id) => api.delete(`/crops/${id}`);

// Field Endpoints
export const getFields = () => api.get('/fields');
export const getFieldById = (id) => api.get(`/fields/${id}`);
export const createField = (data) => api.post('/fields', data);
export const updateField = (id, data) => api.put(`/fields/${id}`, data);
export const deleteField = (id) => api.delete(`/fields/${id}`);

// Livestock Endpoints
export const getLivestock = () => api.get('/livestock');
export const getLivestockById = (id) => api.get(`/livestock/${id}`);
export const createLivestock = (data) => api.post('/livestock', data);
export const updateLivestock = (id, data) => api.put(`/livestock/${id}`, data);
export const deleteLivestock = (id) => api.delete(`/livestock/${id}`);

// Pen Endpoints
export const getPens = () => api.get('/pens');
export const getPenById = (id) => api.get(`/pens/${id}`);
export const createPen = (data) => api.post('/pens', data);
export const updatePen = (id, data) => api.put(`/pens/${id}`, data);
export const deletePen = (id) => api.delete(`/pens/${id}`);

// Equipment Endpoints
export const getEquipment = () => api.get('/equipment');
export const getEquipmentById = (id) => api.get(`/equipment/${id}`);
export const createEquipment = (data) => api.post('/equipment', data);
export const updateEquipment = (id, data) => api.put(`/equipment/${id}`, data);
export const deleteEquipment = (id) => api.delete(`/equipment/${id}`);

// Inventory Endpoints
export const getInventory = () => api.get('/inventory');
export const getInventoryById = (id) => api.get(`/inventory/${id}`);
export const createInventory = (data) => api.post('/inventory', data);
export const updateInventory = (id, data) => api.put(`/inventory/${id}`, data);
export const deleteInventory = (id) => api.delete(`/inventory/${id}`);

// Sales Endpoints
export const getSales = () => api.get('/sales');
export const getSaleById = (id) => api.get(`/sales/${id}`);
export const createSale = (data) => api.post('/sales', data);
export const updateSale = (id, data) => api.put(`/sales/${id}`, data);
export const deleteSale = (id) => api.delete(`/sales/${id}`);

// Sales Details Endpoints
export const getSalesDetails = () => api.get('/salesdetails');
export const getSalesDetailsById = (id) => api.get(`/salesdetails/${id}`);
export const createSalesDetails = (data) => api.post('/salesdetails', data);
export const updateSalesDetails = (id, data) => api.put(`/salesdetails/${id}`, data);
export const deleteSalesDetails = (id) => api.delete(`/salesdetails/${id}`);

// Supplier Endpoints
export const getSuppliers = () => api.get('/suppliers');
export const getSupplierById = (id) => api.get(`/suppliers/${id}`);
export const createSupplier = (data) => api.post('/suppliers', data);
export const updateSupplier = (id, data) => api.put(`/suppliers/${id}`, data);
export const deleteSupplier = (id) => api.delete(`/suppliers/${id}`);

// Resupply Endpoints
export const getResupplies = () => api.get('/resupplies');
export const getResupplyById = (id) => api.get(`/resupplies/${id}`);
export const createResupply = (data) => api.post('/resupplies', data);
export const updateResupply = (id, data) => api.put(`/resupplies/${id}`, data);
export const deleteResupply = (id) => api.delete(`/resupplies/${id}`);

// Super Admin Endpoints
export const getAllUsers = () => api.get('/super-admin');
export const getUserById = (id) => api.get(`/super-admin/${id}`);
export const createUser = (data) => api.post('/super-admin', data);
export const updateUser = (id, data) => api.put(`/super-admin/${id}`, data);
export const deleteUser = (id) => api.delete(`/super-admin/${id}`);
export const getAggregatedAnalytics = () => api.get('/super-admin/analytics');

// Planner Endpoints
export const generatePlannerSuggestion = (prompt) => api.post('/planner/suggest', { prompt });

export default api;
