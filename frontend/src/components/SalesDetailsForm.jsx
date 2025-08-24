import React, { useState } from 'react';
import { createSalesDetails, updateSalesDetails } from '../services/api';

const SalesDetailsForm = ({ salesDetails, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    item: salesDetails?.item || '',
    quantitySold: salesDetails?.quantitySold || '',
    unitPrice: salesDetails?.unitPrice || '',
    saleTotal: salesDetails?.saleTotal || '',
    paymentMethod: salesDetails?.paymentMethod || '',
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
      if (salesDetails) {
        await updateSalesDetails(salesDetails.salesDetailsID, formData);
      } else {
        await createSalesDetails(formData);
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
        <label htmlFor="item" className="block text-sm font-medium text-gray-700">Item ID</label>
        <input type="number" name="item" id="item" value={formData.item} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="quantitySold" className="block text-sm font-medium text-gray-700">Quantity Sold</label>
        <input type="number" name="quantitySold" id="quantitySold" value={formData.quantitySold} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">Unit Price</label>
        <input type="number" name="unitPrice" id="unitPrice" value={formData.unitPrice} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="saleTotal" className="block text-sm font-medium text-gray-700">Sale Total</label>
        <input type="number" name="saleTotal" id="saleTotal" value={formData.saleTotal} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
        <input type="text" name="paymentMethod" id="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
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

export default SalesDetailsForm;
