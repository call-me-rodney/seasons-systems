export default (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    supplierID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contacts: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'suppliers',
    timestamps: true,
  });

  Supplier.associate = function(models) {
    // Supplier hasMany Equipment
    Supplier.hasMany(models.Equipment, { foreignKey: 'supplierID', as: 'equipment' });
    // Supplier hasMany Resupply
    Supplier.hasMany(models.Resupply, { foreignKey: 'supplierID', as: 'resupplies' });
  };

  return Supplier;
};
