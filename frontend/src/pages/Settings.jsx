import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false); // Placeholder for dark mode

  const handleLogout = () => {
    logout();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implement actual dark mode logic here (e.g., add/remove class to body)
    console.log('Dark mode toggled:', !isDarkMode);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
        <p className="mt-2 text-sm text-gray-600">View your account details.</p>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-800"><strong>Name:</strong> {user?.name}</p>
          <p className="text-sm text-gray-800"><strong>Role:</strong> {user?.role}</p>
          <p className="text-sm text-gray-800"><strong>Department:</strong> {user?.department}</p>
          {/* Add more user details here if available */}
        </div>
      </div>

      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium text-gray-900">Application Preferences</h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Dark Mode</span>
          <label htmlFor="darkModeToggle" className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="darkModeToggle" className="sr-only peer" checked={isDarkMode} onChange={toggleDarkMode} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
