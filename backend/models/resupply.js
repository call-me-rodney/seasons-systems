export default (sequelize, DataTypes) => {
  const Resupply = sequelize.define('Resupply', {
    requestID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    requestDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    item: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: { model: 'Equipment', key: 'equipmentID' }
    },
    supplierID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: { model: 'Supplier', key: 'supplierID' }
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    invoiceNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'resupplies',
    timestamps: true,
  });

  Resupply.associate = function(models) {
    // Resupply belongsTo Supplier
    Resupply.belongsTo(models.Supplier, { foreignKey: 'supplierID', as: 'supplier' });
    // Resupply belongsTo Equipment
    Resupply.belongsTo(models.Equipment, { foreignKey: 'item', as: 'equipment' });
  };

  return Resupply;
};
