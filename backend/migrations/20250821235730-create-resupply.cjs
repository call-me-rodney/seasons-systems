'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resupplies', {
      requestID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      requestDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      item: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'equipment', key: 'equipmentID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      supplierID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'suppliers', key: 'supplierID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      unitPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      subtotal: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      deliveryDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      invoiceNo: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('resupplies');
  },
};
