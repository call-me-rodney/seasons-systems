export default (sequelize, DataTypes) => {
  const Field = sequelize.define('Field', {
    fieldID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    soilType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastFertilizedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'fields',
    timestamps: true,
  });

  Field.associate = function(models) {
    // Field hasMany Crop
    Field.hasMany(models.Crop, { foreignKey: 'fieldID', as: 'crops' });
  };

  return Field;
};
