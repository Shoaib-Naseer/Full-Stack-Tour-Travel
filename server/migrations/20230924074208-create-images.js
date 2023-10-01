'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Images', {
      image_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tour_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    // Add a foreign key constraint
    await queryInterface.addConstraint('Images', {
      fields: ['tour_id'],
      type: 'foreign key',
      references: {
        table: 'Tours',
        field: 'tour_id',
      },
      onDelete: 'CASCADE',
    });

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the "Images" table
    await queryInterface.dropTable('Images');

    return Promise.resolve();
  },
};
