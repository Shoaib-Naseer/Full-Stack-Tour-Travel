'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      review_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      tour_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    // Add foreign key constraints
    await queryInterface.addConstraint('Reviews', {
      fields: ['tour_id'],
      type: 'foreign key',
      references: {
        table: 'Tours',
        field: 'tour_id',
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('Reviews', {
      fields: ['user_id'],
      type: 'foreign key',
      references: {
        table: 'Users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
    });

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the "Reviews" table
    await queryInterface.dropTable('Reviews');

    return Promise.resolve();
  },
};
