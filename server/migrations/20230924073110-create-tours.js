"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tours", {
      basic_tour_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tour_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      base_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      booking_start_date: {
        type: Sequelize.DATE,
        defaultValue: () => new Date(),
      },
      booking_end_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: () => new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint("Tours", {
      fields: ["basic_tour_id"],
      type: "foreign key",
      references: {
        table: "BasicTours",
        field: "basic_tour_id",
      },
      onDelete: "CASCADE",
    });

    // Add associations with Image, PickupLocation, and Category here
    // For example, create a TourCategories table
    await queryInterface.createTable("TourCategories", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tour_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tours",
          key: "tour_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "category_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: () => new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable("TourPickupLocations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tour_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tours",
          key: "tour_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      pickup_location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "PickupLocations",
          key: "pickup_location_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      additional_cost: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: () => new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Repeat the above step for associations with Image and PickupLocation
  },

  down: async (queryInterface, Sequelize) => {
    // Define the rollback logic here if needed
  },
};
