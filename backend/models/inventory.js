export default (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    itemID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    units: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pricePerUnit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cropID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: { model: 'Crops', key: 'cropID' }
    },
    animalID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: { model: 'Livestock', key: 'animalID' }
    },
    type: {
      type: DataTypes.ENUM('crop_produce', 'meat_produce'),
      allowNull: false,
    },
  }, {
    tableName: 'inventory',
    timestamps: true,
  });

  Inventory.associate = function(models) {
    // Inventory belongsTo Crop
    Inventory.belongsTo(models.Crop, { foreignKey: 'cropID', as: 'crop' });
    // Inventory belongsTo Livestock
    Inventory.belongsTo(models.Livestock, { foreignKey: 'animalID', as: 'livestock' });
    // Inventory hasMany SalesDetails
    Inventory.hasMany(models.SalesDetails, { foreignKey: 'item', as: 'salesDetails' });
  };

  return Inventory;
};
