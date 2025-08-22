export default (sequelize, DataTypes) => {
  const Pen = sequelize.define('Pen', {
    penID: {
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
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lastCleanedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isFull: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'pens',
    timestamps: true,
  });

  Pen.associate = function(models) {
    // Pen hasMany Livestock
    Pen.hasMany(models.Livestock, { foreignKey: 'penID', as: 'livestock' });
  };

  return Pen;
};
