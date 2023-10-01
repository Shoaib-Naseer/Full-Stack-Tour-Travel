'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      booking_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tour_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    // Add foreign key constraints
    await queryInterface.addConstraint('Bookings', {
      fields: ['user_id'],
      type: 'foreign key',
      references: {
        table: 'Users',
        field: 'user_id',
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('Bookings', {
      fields: ['payment_id'],
      type: 'foreign key',
      references: {
        table: 'Payments',
        field: 'payment_id',
      },
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('Bookings', {
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
    // Drop the "Bookings" table
    await queryInterface.dropTable('Bookings');

    return Promise.resolve();
  },
};
