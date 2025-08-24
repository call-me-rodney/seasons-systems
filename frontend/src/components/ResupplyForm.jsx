import React, { useState } from 'react';
import { createResupply, updateResupply } from '../services/api';

const ResupplyForm = ({ resupply, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    requestDate: resupply?.requestDate ? resupply.requestDate.split('T')[0] : '',
    itemID: resupply?.itemID || '',
    supplierID: resupply?.supplierID || '',
    quantity: resupply?.quantity || '',
    unitPrice: resupply?.unitPrice || '',
    subtotal: resupply?.subtotal || '',
    deliveryDate: resupply?.deliveryDate ? resupply.deliveryDate.split('T')[0] : '',
    invoiceNo: resupply?.invoiceNo || '',
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
      if (resupply) {
        await updateResupply(resupply.requestID, formData);
      } else {
        await createResupply(formData);
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
        <label htmlFor="requestDate" className="block text-sm font-medium text-gray-700">Request Date</label>
        <input type="date" name="requestDate" id="requestDate" value={formData.requestDate} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="itemID" className="block text-sm font-medium text-gray-700">Item ID</label>
        <input type="number" name="itemID" id="itemID" value={formData.itemID} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="supplierID" className="block text-sm font-medium text-gray-700">Supplier ID</label>
        <input type="number" name="supplierID" id="supplierID" value={formData.supplierID} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
        <input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">Unit Price</label>
        <input type="number" name="unitPrice" id="unitPrice" value={formData.unitPrice} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="subtotal" className="block text-sm font-medium text-gray-700">Subtotal</label>
        <input type="number" name="subtotal" id="subtotal" value={formData.subtotal} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">Delivery Date (Optional)</label>
        <input type="date" name="deliveryDate" id="deliveryDate" value={formData.deliveryDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="invoiceNo" className="block text-sm font-medium text-gray-700">Invoice No. (Optional)</label>
        <input type="text" name="invoiceNo" id="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
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

export default ResupplyForm;
