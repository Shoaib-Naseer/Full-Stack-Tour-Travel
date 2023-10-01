'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      payment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.STRING,
      },
      payment_status: {
        type: Sequelize.ENUM("pending", "paid", "failed", "pending_refund", "refunded"),
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the "Payments" table
    await queryInterface.dropTable('Payments');

    return Promise.resolve();
  },
};
