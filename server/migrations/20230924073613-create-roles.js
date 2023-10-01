'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      role_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the "Roles" table
    await queryInterface.dropTable('Roles');

    return Promise.resolve();
  },
};
