import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'chat', label: 'Seasons Chat', icon: '💬', path: '/chat' },
    { id: 'planner', label: 'Seasons Planner', icon: '📅', path: '/planner' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Left Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-seasons-green">Seasons</h1>
        </div>
        
        <nav className="mt-8">
          {navigationTabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path || '/'}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                activeTab === tab.id
                  ? 'bg-seasons-green text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {navigationTabs.find(tab => tab.id === activeTab)?.label}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Welcome, {user?.name}
              </span>
              <div className="cursor-pointer">
                {/* SVG Placeholder */}
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H3"></path></svg>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
