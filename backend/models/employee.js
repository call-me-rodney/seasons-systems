export default (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    employeeID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfHire: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateOfFire: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'employees',
    timestamps: true,
  });

  Employee.associate = function(models) {
    // Employee hasMany Equipment
    Employee.hasMany(models.Equipment, { foreignKey: 'employeeID', as: 'equipment' });
    // Employee hasMany Sales
    Employee.hasMany(models.Sales, { foreignKey: 'employeeID', as: 'sales' });
  };

  return Employee;
};
