'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      saleID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      saleDetailsID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sales_details', key: 'salesDetailsID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      saleDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      employeeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'employees', key: 'employeeID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('sales');
  },
};
