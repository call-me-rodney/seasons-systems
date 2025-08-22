export default (sequelize, DataTypes) => {
  const Livestock = sequelize.define('Livestock', {
    animalID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    acquisitionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isHealthy: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    affliction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    penID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: { model: 'Pens', key: 'penID' }
    },
    status: {
      type: DataTypes.ENUM('active', 'sold', 'dead'),
      allowNull: false,
      defaultValue: 'active',
    },
  }, {
    tableName: 'livestock',
    timestamps: true,
  });

  Livestock.associate = function(models) {
    // Livestock belongsTo Pen
    Livestock.belongsTo(models.Pen, { foreignKey: 'penID', as: 'pen' });
    // Livestock hasMany Inventory
    Livestock.hasMany(models.Inventory, { foreignKey: 'animalID', as: 'inventoryItems' });
  };

  return Livestock;
};
