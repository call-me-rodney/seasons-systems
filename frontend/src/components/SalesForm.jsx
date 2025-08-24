import React, { useState } from 'react';
import { createSale, updateSale } from '../services/api';

const SalesForm = ({ sale, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    saleDetailsID: sale?.saleDetailsID || '',
    saleDate: sale?.saleDate ? sale.saleDate.split('T')[0] : '',
    employeeID: sale?.employeeID || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (sale) {
        await updateSale(sale.saleID, formData);
      } else {
        await createSale(formData);
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
        <label htmlFor="saleDetailsID" className="block text-sm font-medium text-gray-700">Sale Details ID</label>
        <input type="number" name="saleDetailsID" id="saleDetailsID" value={formData.saleDetailsID} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="saleDate" className="block text-sm font-medium text-gray-700">Sale Date</label>
        <input type="date" name="saleDate" id="saleDate" value={formData.saleDate} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="employeeID" className="block text-sm font-medium text-gray-700">Employee ID</label>
        <input type="number" name="employeeID" id="employeeID" value={formData.employeeID} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
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

export default SalesForm;
