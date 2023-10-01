"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("BasicTours", {
      basic_tour_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,

      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: () => new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: () => new Date(),
      },
    });

  },

  down: async (queryInterface, Sequelize) => {
    // Define the rollback logic here if needed
  },
};
