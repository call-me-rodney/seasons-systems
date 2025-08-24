import React, { useState } from 'react';
import { createCrop, updateCrop } from '../services/api';

const CropForm = ({ crop, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: crop?.type || '',
    plantingDate: crop?.plantingDate ? crop.plantingDate.split('T')[0] : '',
    expectedHarvestDate: crop?.expectedHarvestDate ? crop.expectedHarvestDate.split('T')[0] : '',
    actualHarvestDate: crop?.actualHarvestDate ? crop.actualHarvestDate.split('T')[0] : '',
    yieldQuantity: crop?.yieldQuantity || '',
    yieldUnit: crop?.yieldUnit || '',
    fieldID: crop?.fieldID || '',
    status: crop?.status || '',
    isInfested: crop?.isInfested !== undefined ? crop.isInfested : false,
    infestation: crop?.infestation || '',
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
      if (crop) {
        await updateCrop(crop.cropID, formData);
      } else {
        await createCrop(formData);
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
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <input type="text" name="type" id="type" value={formData.type} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="plantingDate" className="block text-sm font-medium text-gray-700">Planting Date</label>
        <input type="date" name="plantingDate" id="plantingDate" value={formData.plantingDate} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="expectedHarvestDate" className="block text-sm font-medium text-gray-700">Expected Harvest Date</label>
        <input type="date" name="expectedHarvestDate" id="expectedHarvestDate" value={formData.expectedHarvestDate} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="actualHarvestDate" className="block text-sm font-medium text-gray-700">Actual Harvest Date (Optional)</label>
        <input type="date" name="actualHarvestDate" id="actualHarvestDate" value={formData.actualHarvestDate} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="yieldQuantity" className="block text-sm font-medium text-gray-700">Yield Quantity</label>
        <input type="number" name="yieldQuantity" id="yieldQuantity" value={formData.yieldQuantity} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="yieldUnit" className="block text-sm font-medium text-gray-700">Yield Unit</label>
        <input type="text" name="yieldUnit" id="yieldUnit" value={formData.yieldUnit} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="fieldID" className="block text-sm font-medium text-gray-700">Field ID</label>
        <input type="number" name="fieldID" id="fieldID" value={formData.fieldID} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <input type="text" name="status" id="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="isInfested" className="flex items-center">
          <input type="checkbox" name="isInfested" id="isInfested" checked={formData.isInfested} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
          <span className="ml-2 text-sm text-gray-900">Is Infested</span>
        </label>
      </div>
      {formData.isInfested && (
        <div>
          <label htmlFor="infestation" className="block text-sm font-medium text-gray-700">Infestation (Optional)</label>
          <input type="text" name="infestation" id="infestation" value={formData.infestation} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
      )}
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

export default CropForm;
