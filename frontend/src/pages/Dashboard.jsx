import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboardContent = () => {
    if (!user) return null;

    switch (user.department) {
      case 'sales':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Sales Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Today's Sales</h4>
                <p className="mt-2 text-3xl font-bold text-seasons-green">$0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Items Sold</h4>
                <p className="mt-2 text-3xl font-bold text-seasons-orange">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Pending Orders</h4>
                <p className="mt-2 text-3xl font-bold text-gray-600">0</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Enter Sale</h4>
              <p className="text-gray-600">Sale entry form will be implemented here.</p>
            </div>
          </div>
        );

      case 'hr':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">HR Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Active Employees</h4>
                <p className="mt-2 text-3xl font-bold text-seasons-green">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Departments</h4>
                <p className="mt-2 text-3xl font-bold text-seasons-orange">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">New Hires This Month</h4>
                <p className="mt-2 text-3xl font-bold text-gray-600">0</p>
              </div>
            </div>
          </div>
        );

      case 'procurement':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Procurement Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Pending Requests</h4>
                <p className="mt-2 text-3xl font-bold text-seasons-orange">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Active Orders</h4>
                <p className="mt-2 text-3xl font-bold text-seasons-green">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Suppliers</h4>
                <p className="mt-2 text-3xl font-bold text-gray-600">0</p>
              </div>
            </div>
          </div>
        );

      case 'equipment':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Equipment & Inventory Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Total Equipment</h4>
                <p className="mt-2 text-3xl font-bold text-seasons-green">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">In Use</h4>
                <p className="mt-2 text-3xl font-bold text-seasons-orange">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Needs Maintenance</h4>
                <p className="mt-2 text-3xl font-bold text-red-600">0</p>
              </div>
            </div>
          </div>
        );

      case 'field':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Field Management Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Active Fields</h4>
                <p className="mt-2 text-3xl font-bold text-seasons-green">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Livestock</h4>
                <p className="mt-2 text-3xl font-bold text-seasons-orange">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-sm font-medium text-gray-500">Crops Growing</h4>
                <p className="mt-2 text-3xl font-bold text-gray-600">0</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Welcome to Seasons Systems</h3>
            <p className="text-gray-600">Select a department to view specific dashboard content.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-600">
          You are logged in as {user?.role} in the {user?.department} department.
        </p>
      </div>
      
      {renderDashboardContent()}
    </div>
  );
};

export default Dashboard;
