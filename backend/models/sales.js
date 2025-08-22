export default (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    saleID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    saleDetailsID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: { model: 'SalesDetails', key: 'salesDetailsID' }
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    employeeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: { model: 'Employee', key: 'employeeID' }
    },
  }, {
    tableName: 'sales',
    timestamps: true,
  });

  Sales.associate = function(models) {
    // Sales belongsTo SalesDetails
    Sales.belongsTo(models.SalesDetails, { foreignKey: 'saleDetailsID', as: 'details' });
    // Sales belongsTo Employee
    Sales.belongsTo(models.Employee, { foreignKey: 'employeeID', as: 'employee' });
  };

  return Sales;
};
