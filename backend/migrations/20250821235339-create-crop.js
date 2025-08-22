'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('crops', {
      cropID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      plantingDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      expectedHarvestDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      actualHarvestDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      yieldQuantity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      yieldUnit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fieldID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'fields', key: 'fieldID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM('growing', 'harvested'),
        allowNull: false,
        defaultValue: 'growing',
      },
      isInfested: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      infestation: {
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
    await queryInterface.dropTable('crops');
  },
};
