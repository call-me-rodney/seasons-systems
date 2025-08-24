import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { getEmployees, getSuppliers, getEquipment, getFields, getLivestock, getSales, getSalesDetails, getInventory, getCrops } from '../services/api';
import FormModal from '../components/FormModal';
import EmployeeForm from '../components/EmployeeForm';
import CropForm from '../components/CropForm';
import FieldForm from '../components/FieldForm';
import LivestockForm from '../components/LivestockForm';
import PenForm from '../components/PenForm';
import EquipmentForm from '../components/EquipmentForm';
import InventoryForm from '../components/InventoryForm';
import SalesForm from '../components/SalesForm';
import SalesDetailsForm from '../components/SalesDetailsForm';
import SupplierForm from '../components/SupplierForm';
import ResupplyForm from '../components/ResupplyForm';

const Dashboard = () => {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [errorEmployees, setErrorEmployees] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [suppliers, setSuppliers] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [errorSuppliers, setErrorSuppliers] = useState(null);
  const [isResupplyModalOpen, setIsResupplyModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);

  const [equipment, setEquipment] = useState([]);
  const [loadingEquipment, setLoadingEquipment] = useState(true);
  const [errorEquipment, setErrorEquipment] = useState(null);
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);

  const [fields, setFields] = useState([]);
  const [loadingFields, setLoadingFields] = useState(true);
  const [errorFields, setErrorFields] = useState(null);
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);

  const [livestock, setLivestock] = useState([]);
  const [loadingLivestock, setLoadingLivestock] = useState(true);
  const [errorLivestock, setErrorLivestock] = useState(null);
  const [isPenModalOpen, setIsPenModalOpen] = useState(false);
  const [isLivestockModalOpen, setIsLivestockModalOpen] = useState(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const [sales, setSales] = useState([]);
  const [loadingSales, setLoadingSales] = useState(true);
  const [errorSales, setErrorSales] = useState(null);
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);

  const [salesDetails, setSalesDetails] = useState([]);
  const [loadingSalesDetails, setLoadingSalesDetails] = useState(true);
  const [errorSalesDetails, setErrorSalesDetails] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loadingInventory, setLoadingInventory] = useState(true);
  const [errorInventory, setErrorInventory] = useState(null);
  const [isSalesDetailsModalOpen, setIsSalesDetailsModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);

  useEffect(() => {
    if (user && user.department === 'HR') {
      const fetchEmployees = async () => {
        try {
          const response = await getEmployees();
          setEmployees(response.data);
        } catch (err) {
          setErrorEmployees(err);
        } finally {
          setLoadingEmployees(false);
        }
      };
      fetchEmployees();
    }

    if (user && user.department === 'procurement') {
      const fetchSuppliers = async () => {
        try {
          const response = await getSuppliers();
          setSuppliers(response.data);
        } catch (err) {
          setErrorSuppliers(err);
        } finally {
          setLoadingSuppliers(false);
        }
      };
      fetchSuppliers();
    }

    if (user && user.department === 'equipment') {
      const fetchEquipment = async () => {
        try {
          const response = await getEquipment();
          setEquipment(response.data);
        } catch (err) {
          setErrorEquipment(err);
        } finally {
          setLoadingEquipment(false);
        }
      };
      fetchEquipment();
    }

    if (user && user.department === 'field') {
      const fetchFields = async () => {
        try {
          const response = await getFields();
          setFields(response.data);
        } catch (err) {
          setErrorFields(err);
        } finally {
          setLoadingFields(false);
        }
      };
      fetchFields();

      const fetchLivestock = async () => {
        try {
          const response = await getLivestock();
          setLivestock(response.data);
        } catch (err) {
          setErrorLivestock(err);
        } finally {
          setLoadingLivestock(false);
        }
      };
      fetchLivestock();
    }

    if (user && user.department === 'sales') {
      const fetchSales = async () => {
        try {
          const response = await getSales();
          setSales(response.data);
        } catch (err) {
          setErrorSales(err);
        } finally {
          setLoadingSales(false);
        }
      };
      fetchSales();

      const fetchSalesDetails = async () => {
        try {
          const response = await getSalesDetails();
          setSalesDetails(response.data);
        } catch (err) {
          setErrorSalesDetails(err);
        } finally {
          setLoadingSalesDetails(false);
        }
      };
      fetchSalesDetails();
    }

    if (user && user.department === 'inventory') {
      const fetchInventory = async () => {
        try {
          const response = await getInventory();
          setInventory(response.data);
        } catch (err) {
          setErrorInventory(err);
        } finally {
          setLoadingInventory(false);
        }
      };
      fetchInventory();
    }
  }, [user]);

  const renderDashboardContent = () => {
    if (!user) return null;

    switch (user.department) {
      case 'sales':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Sales Dashboard</h3>
            {loadingSales && <p>Loading sales...</p>}
            {errorSales && <p className="text-red-500">Error loading sales: {errorSales.message}</p>}
            {!loadingSales && !errorSales && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-sm font-medium text-gray-500">Total Sales</h4>
                  <p className="mt-2 text-3xl font-bold text-seasons-green">{sales.length}</p>
                </div>
                            {/* Add more sales specific data here */}
            <div className="mt-6">
              <button
                onClick={() => setIsSalesModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
              >
                Add New Sale
              </button>
            </div>

            <FormModal isOpen={isSalesModalOpen} onClose={() => setIsSalesModalOpen(false)} title="Add New Sale">
              <SalesForm onSuccess={() => {
                setIsSalesModalOpen(false);
                // Re-fetch sales after successful creation
                const fetchSales = async () => {
                  try {
                    const response = await getSales();
                    setSales(response.data);
                  } catch (err) {
                    setErrorSales(err);
                  } finally {
                    setLoadingSales(false);
                  }
                };
                fetchSales();
              }} />
            </FormModal>
              </div>
            )}
            {loadingSalesDetails && <p>Loading sales details...</p>}
            {errorSalesDetails && <p className="text-red-500">Error loading sales details: {errorSalesDetails.message}</p>}
            {!loadingSalesDetails && !errorSalesDetails && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Sales Details</h4>
                            {/* Sales Details List/Table will go here */}
            <div className="mt-6">
              <button
                onClick={() => setIsSalesDetailsModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
              >
                Add New Sales Details
              </button>
            </div>

            <FormModal isOpen={isSalesDetailsModalOpen} onClose={() => setIsSalesDetailsModalOpen(false)} title="Add New Sales Details">
              <SalesDetailsForm onSuccess={() => {
                setIsSalesDetailsModalOpen(false);
                // Re-fetch sales details after successful creation
                const fetchSalesDetails = async () => {
                  try {
                    const response = await getSalesDetails();
                    setSalesDetails(response.data);
                  } catch (err) {
                    setErrorSalesDetails(err);
                  } finally {
                    setLoadingSalesDetails(false);
                  }
                };
                fetchSalesDetails();
              }} />
            </FormModal>
              </div>
            )}
          </div>
        );

      case 'hr':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">HR Dashboard</h3>
            {loadingEmployees && <p>Loading employees...</p>}
            {errorEmployees && <p className="text-red-500">Error loading employees: {errorEmployees.message}</p>}
            {!loadingEmployees && !errorEmployees && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-sm font-medium text-gray-500">Total Employees</h4>
                  <p className="mt-2 text-3xl font-bold text-seasons-green">{employees.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-sm font-medium text-gray-500">Active Employees</h4>
                  <p className="mt-2 text-3xl font-bold text-seasons-orange">{employees.filter(emp => emp.isActive).length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-sm font-medium text-gray-500">Admins</h4>
                  <p className="mt-2 text-3xl font-bold text-gray-600">{employees.filter(emp => emp.role === 'admin').length}</p>
                </div>
              </div>
            )}
                        {/* Employee List/Table will go here */}
            <div className="mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
              >
                Add New Employee
              </button>
            </div>

            <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Employee">
              <EmployeeForm onSuccess={() => {
                setIsModalOpen(false);
                // Re-fetch employees after successful creation
                const fetchEmployees = async () => {
                  try {
                    const response = await getEmployees();
                    setEmployees(response.data);
                  } catch (err) {
                    setErrorEmployees(err);
                  } finally {
                    setLoadingEmployees(false);
                  }
                };
                fetchEmployees();
              }} />
            </FormModal>
          </div>
        );

      case 'procurement':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Procurement Dashboard</h3>
            {loadingSuppliers && <p>Loading suppliers...</p>}
            {errorSuppliers && <p className="text-red-500">Error loading suppliers: {errorSuppliers.message}</p>}
            {!loadingSuppliers && !errorSuppliers && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-sm font-medium text-gray-500">Total Suppliers</h4>
                  <p className="mt-2 text-3xl font-bold text-seasons-green">{suppliers.length}</p>
                </div>
                                        {/* Add more procurement specific data here */}
            <div className="mt-6">
              <button
                onClick={() => setIsResupplyModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
              >
                Create Resupply Request
              </button>
            </div>

            <FormModal isOpen={isResupplyModalOpen} onClose={() => setIsResupplyModalOpen(false)} title="Create Resupply Request">
              <ResupplyForm onSuccess={() => {
                setIsResupplyModalOpen(false);
                // Re-fetch resupplies after successful creation
                const fetchResupplies = async () => {
                  try {
                    const response = await getResupplies();
                    // Assuming you have a resupplies state
                    // setResupplies(response.data);
                  } catch (err) {
                    // setErrorResupplies(err);
                  } finally {
                    // setLoadingResupplies(false);
                  }
                };
                fetchResupplies();
              }} />
            </FormModal>
            <div className="mt-6">
              <button
                onClick={() => setIsSupplierModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
              >
                Add New Supplier
              </button>
            </div>

            <FormModal isOpen={isSupplierModalOpen} onClose={() => setIsSupplierModalOpen(false)} title="Add New Supplier">
              <SupplierForm onSuccess={() => {
                setIsSupplierModalOpen(false);
                // Re-fetch suppliers after successful creation
                const fetchSuppliers = async () => {
                  try {
                    const response = await getSuppliers();
                    setSuppliers(response.data);
                  } catch (err) {
                    setErrorSuppliers(err);
                  } finally {
                    setLoadingSuppliers(false);
                  }
                };
                fetchSuppliers();
              }} />
            </FormModal>
              </div>
            )}
          </div>
        );

      case 'equipment':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Equipment & Inventory Dashboard</h3>
            {loadingEquipment && <p>Loading equipment...</p>}
            {errorEquipment && <p className="text-red-500">Error loading equipment: {errorEquipment.message}</p>}
            {!loadingEquipment && !errorEquipment && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-sm font-medium text-gray-500">Total Equipment</h4>
                  <p className="mt-2 text-3xl font-bold text-seasons-green">{equipment.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-sm font-medium text-gray-500">In Use</h4>
                  <p className="mt-2 text-3xl font-bold text-seasons-orange">{equipment.filter(eq => eq.isInUse).length}</p>
                </div>
                            {/* Add more equipment specific data here */}
            <div className="mt-6">
              <button
                onClick={() => setIsEquipmentModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
              >
                Add New Equipment
              </button>
            </div>

            <FormModal isOpen={isEquipmentModalOpen} onClose={() => setIsEquipmentModalOpen(false)} title="Add New Equipment">
              <EquipmentForm onSuccess={() => {
                setIsEquipmentModalOpen(false);
                // Re-fetch equipment after successful creation
                const fetchEquipment = async () => {
                  try {
                    const response = await getEquipment();
                    setEquipment(response.data);
                  } catch (err) {
                    setErrorEquipment(err);
                  } finally {
                    setLoadingEquipment(false);
                  }
                };
                fetchEquipment();
              }} />
            </FormModal>
              </div>
            )}
          </div>
        );

      case 'field':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Field Management Dashboard</h3>
            {loadingFields && <p>Loading fields...</p>}
            {errorFields && <p className="text-red-500">Error loading fields: {errorFields.message}</p>}
            {!loadingFields && !errorFields && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-sm font-medium text-gray-500">Active Fields</h4>
                  <p className="mt-2 text-3xl font-bold text-seasons-green">{fields.filter(f => f.isActive).length}</p>
                </div>
                                        {/* Add more field specific data here */}
            <div className="mt-6">
              <button
                onClick={() => setIsFieldModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
              >
                Add New Field
              </button>
            </div>

            <FormModal isOpen={isFieldModalOpen} onClose={() => setIsFieldModalOpen(false)} title="Add New Field">
              <FieldForm onSuccess={() => {
                setIsFieldModalOpen(false);
                // Re-fetch fields after successful creation
                const fetchFields = async () => {
                  try {
                    const response = await getFields();
                    setFields(response.data);
                  } catch (err) {
                    setErrorFields(err);
                  } finally {
                    setLoadingFields(false);
                  }
                };
                fetchFields();
              }} />
            </FormModal>
            <div className="mt-6">
              <button
                onClick={() => setIsCropModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
              >
                Add New Crop
              </button>
            </div>

            <FormModal isOpen={isCropModalOpen} onClose={() => setIsCropModalOpen(false)} title="Add New Crop">
              <CropForm onSuccess={() => {
                setIsCropModalOpen(false);
                // Re-fetch crops after successful creation
                const fetchCrops = async () => {
                  try {
                    const response = await getCrops();
                    // Assuming you have a crops state
                    // setCrops(response.data);
                  } catch (err) {
                    // setErrorCrops(err);
                  } finally {
                    // setLoadingCrops(false);
                  }
                };
                fetchCrops();
              }} />
            </FormModal>
              </div>
            )}
            {loadingLivestock && <p>Loading livestock...</p>}
            {errorLivestock && <p className="text-red-500">Error loading livestock: {errorLivestock.message}</p>}
            {!loadingLivestock && !errorLivestock && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-sm font-medium text-gray-500">Total Livestock</h4>
                  <p className="mt-2 text-3xl font-bold text-seasons-orange">{livestock.length}</p>
                </div>
                                        {/* Add more livestock specific data here */}
            <div className="mt-6">
              <button
                onClick={() => setIsPenModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
              >
                Add New Pen
              </button>
            </div>

            <FormModal isOpen={isPenModalOpen} onClose={() => setIsPenModalOpen(false)} title="Add New Pen">
              <PenForm onSuccess={() => {
                setIsPenModalOpen(false);
                // Re-fetch pens after successful creation
                const fetchPens = async () => {
                  try {
                    const response = await getPens();
                    // Assuming you have a pens state
                    // setPens(response.data);
                  } catch (err) {
                    // setErrorPens(err);
                  } finally {
                    // setLoadingPens(false);
                  }
                };
                fetchPens();
              }} />
            </FormModal>
            <div className="mt-6">
              <button
                onClick={() => setIsLivestockModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
              >
                Add New Livestock
              </button>
            </div>

            <FormModal isOpen={isLivestockModalOpen} onClose={() => setIsLivestockModalOpen(false)} title="Add New Livestock">
              <LivestockForm onSuccess={() => {
                setIsLivestockModalOpen(false);
                // Re-fetch livestock after successful creation
                const fetchLivestock = async () => {
                  try {
                    const response = await getLivestock();
                    setLivestock(response.data);
                  } catch (err) {
                    setErrorLivestock(err);
                  } finally {
                    setLoadingLivestock(false);
                  }
                };
                fetchLivestock();
              }} />
            </FormModal>
              </div>
            )}
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Inventory Dashboard</h3>
            {loadingInventory && <p>Loading inventory...</p>}
            {errorInventory && <p className="text-red-500">Error loading inventory: {errorInventory.message}</p>}
            {!loadingInventory && !errorInventory && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="text-sm font-medium text-gray-500">Total Inventory Items</h4>
                  <p className="mt-2 text-3xl font-bold text-seasons-green">{inventory.length}</p>
                </div>
                            {/* Add more inventory specific data here */}
            <div className="mt-6">
              <button
                onClick={() => setIsInventoryModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-seasons-green rounded-md hover:bg-seasons-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seasons-green"
              >
                Add New Inventory Item
              </button>
            </div>

            <FormModal isOpen={isInventoryModalOpen} onClose={() => setIsInventoryModalOpen(false)} title="Add New Inventory Item">
              <InventoryForm onSuccess={() => {
                setIsInventoryModalOpen(false);
                // Re-fetch inventory after successful creation
                const fetchInventory = async () => {
                  try {
                    const response = await getInventory();
                    setInventory(response.data);
                  } catch (err) {
                    setErrorInventory(err);
                  } finally {
                    setLoadingInventory(false);
                  }
                };
                fetchInventory();
              }} />
            </FormModal>
              </div>
            )}
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            {renderDashboardContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
