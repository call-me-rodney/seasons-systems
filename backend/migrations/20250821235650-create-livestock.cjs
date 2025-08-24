'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('livestock', {
      animalID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      species: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      breed: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      acquisitionDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      isHealthy: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      affliction: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      penID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'pens', key: 'penID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM('active', 'sold', 'dead'),
        allowNull: false,
        defaultValue: 'active',
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
    await queryInterface.dropTable('livestock');
  },
};
