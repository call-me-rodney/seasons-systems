export default (sequelize, DataTypes) => {
  const Equipment = sequelize.define('Equipment', {
    equipmentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('new', 'damaged', 'decommissioned', 'worn out'),
      allowNull: false,
      defaultValue: 'new',
    },
    supplierID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: { model: 'Suppliers', key: 'supplierID' }
    },
    isInUse: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    employeeID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: { model: 'Employees', key: 'employeeID' }
    },
  }, {
    tableName: 'equipment',
    timestamps: true,
  });

  Equipment.associate = function(models) {
    // Equipment belongsTo Supplier
    Equipment.belongsTo(models.Supplier, { foreignKey: 'supplierID', as: 'supplier' });
    // Equipment belongsTo Employee
    Equipment.belongsTo(models.Employee, { foreignKey: 'employeeID', as: 'employee' });
  };

  return Equipment;
};
