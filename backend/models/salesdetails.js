export default (sequelize, DataTypes) => {
  const SalesDetails = sequelize.define('SalesDetails', {
    salesDetailsID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: { model: 'Inventory', key: 'itemID' }
    },
    quantitySold: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    saleTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'sales_details',
    timestamps: true,
  });

  SalesDetails.associate = function(models) {
    // SalesDetails belongsTo Inventory
    SalesDetails.belongsTo(models.Inventory, { foreignKey: 'item', as: 'inventoryItem' });
    // SalesDetails hasOne Sales
    SalesDetails.hasOne(models.Sales, { foreignKey: 'saleDetailsID', as: 'sale' });
  };

  return SalesDetails;
};
