'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales_details', {
      salesDetailsID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      item: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'inventory', key: 'itemID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantitySold: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      unitPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      saleTotal: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('sales_details');
  },
};
