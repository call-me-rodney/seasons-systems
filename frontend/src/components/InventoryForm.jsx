import React, { useState } from 'react';
import { createInventory, updateInventory } from '../services/api';

const InventoryForm = ({ inventoryItem, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: inventoryItem?.name || '',
    quantity: inventoryItem?.quantity || '',
    units: inventoryItem?.units || '',
    pricePerUnit: inventoryItem?.pricePerUnit || '',
    expiryDate: inventoryItem?.expiryDate ? inventoryItem.expiryDate.split('T')[0] : '',
    cropID: inventoryItem?.cropID || '',
    animalID: inventoryItem?.animalID || '',
    type: inventoryItem?.type || '',
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
      if (inventoryItem) {
        await updateInventory(inventoryItem.itemID, formData);
      } else {
        await createInventory(formData);
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
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
        <input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="units" className="block text-sm font-medium text-gray-700">Units</label>
        <input type="text" name="units" id="units" value={formData.units} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="pricePerUnit" className="block text-sm font-medium text-gray-700">Price Per Unit</label>
        <input type="number" name="pricePerUnit" id="pricePerUnit" value={formData.pricePerUnit} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date (Optional)</label>
        <input type="date" name="expiryDate" id="expiryDate" value={formData.expiryDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="cropID" className="block text-sm font-medium text-gray-700">Crop ID (Optional)</label>
        <input type="number" name="cropID" id="cropID" value={formData.cropID} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="animalID" className="block text-sm font-medium text-gray-700">Animal ID (Optional)</label>
        <input type="number" name="animalID" id="animalID" value={formData.animalID} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <input type="text" name="type" id="type" value={formData.type} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
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

export default InventoryForm;
