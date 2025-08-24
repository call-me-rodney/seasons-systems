'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventory', {
      itemID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      units: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pricePerUnit: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      expiryDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      cropID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'crops', key: 'cropID' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      animalID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'livestock', key: 'animalID' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      type: {
        type: Sequelize.ENUM('crop_produce', 'meat_produce'),
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
    await queryInterface.dropTable('inventory');
  },
};
