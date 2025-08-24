import React, { useState } from 'react';
import { createEmployee, updateEmployee } from '../services/api';

const EmployeeForm = ({ employee, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    role: employee?.role || 'user',
    dateOfHire: employee?.dateOfHire ? employee.dateOfHire.split('T')[0] : '',
    password: '',
    department: employee?.department || 'HR',
    contact: employee?.contact || '',
    isActive: employee?.isActive !== undefined ? employee.isActive : true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (employee) {
        // Update existing employee
        await updateEmployee(employee.employeeID, formData);
      } else {
        // Create new employee
        await createEmployee(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <select name="role" id="role" value={formData.role} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
        <select name="department" id="department" value={formData.department} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="HR">HR</option>
          <option value="equipment">Equipment</option>
          <option value="inventory">Inventory</option>
          <option value="sales">Sales</option>
          <option value="field">Field</option>
          <option value="crop">Crop</option>
          <option value="livestock">Livestock</option>
          <option value="procurement">Procurement</option>
        </select>
      </div>
      <div>
        <label htmlFor="dateOfHire" className="block text-sm font-medium text-gray-700">Date of Hire</label>
        <input type="date" name="dateOfHire" id="dateOfHire" value={formData.dateOfHire} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      {!employee && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required={!employee} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
      )}
      <div>
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact (Optional)</label>
        <input type="text" name="contact" id="contact" value={formData.contact} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="isActive" className="flex items-center">
          <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
          <span className="ml-2 text-sm text-gray-900">Active</span>
        </label>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
        <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
