import React, { useState } from 'react';
import { createLivestock, updateLivestock } from '../services/api';

const LivestockForm = ({ livestock, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    species: livestock?.species || '',
    breed: livestock?.breed || '',
    birthDate: livestock?.birthDate ? livestock.birthDate.split('T')[0] : '',
    acquisitionDate: livestock?.acquisitionDate ? livestock.acquisitionDate.split('T')[0] : '',
    isHealthy: livestock?.isHealthy !== undefined ? livestock.isHealthy : true,
    affliction: livestock?.affliction || '',
    penID: livestock?.penID || '',
    status: livestock?.status || '',
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
      if (livestock) {
        await updateLivestock(livestock.animalID, formData);
      } else {
        await createLivestock(formData);
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
        <label htmlFor="species" className="block text-sm font-medium text-gray-700">Species</label>
        <input type="text" name="species" id="species" value={formData.species} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Breed</label>
        <input type="text" name="breed" id="breed" value={formData.breed} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Birth Date</label>
        <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="acquisitionDate" className="block text-sm font-medium text-gray-700">Acquisition Date</label>
        <input type="date" name="acquisitionDate" id="acquisitionDate" value={formData.acquisitionDate} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="isHealthy" className="flex items-center">
          <input type="checkbox" name="isHealthy" id="isHealthy" checked={formData.isHealthy} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
          <span className="ml-2 text-sm text-gray-900">Is Healthy</span>
        </label>
      </div>
      {formData.isHealthy && (
        <div>
          <label htmlFor="affliction" className="block text-sm font-medium text-gray-700">Affliction (Optional)</label>
          <input type="text" name="affliction" id="affliction" value={formData.affliction} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
      )}
      <div>
        <label htmlFor="penID" className="block text-sm font-medium text-gray-700">Pen ID</label>
        <input type="number" name="penID" id="penID" value={formData.penID} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <input type="text" name="status" id="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
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

export default LivestockForm;
