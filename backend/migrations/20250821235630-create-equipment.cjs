'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipment', {
      equipmentID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      purchaseDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('new', 'damaged', 'decommissioned', 'worn out'),
        allowNull: false,
        defaultValue: 'new',
      },
      supplierID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'suppliers', key: 'supplierID' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      isInUse: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      employeeID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'employees', key: 'employeeID' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('equipment');
  },
};
