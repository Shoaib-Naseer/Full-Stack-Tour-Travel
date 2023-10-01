'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
      category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the "Categories" table
    await queryInterface.dropTable('Categories');

    return Promise.resolve();
  },
};
