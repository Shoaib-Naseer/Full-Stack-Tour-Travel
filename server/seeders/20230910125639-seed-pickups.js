"use strict";
const pickupLocationsData = require("../data/pickupLocations");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Set the starting primary key value for the "PickupLocations" table
    const startingPrimaryKeyValue = 1; // You can adjust this value as needed

    // Truncate the "PickupLocations" table to reset primary key increments
    await queryInterface.sequelize.query(
      `TRUNCATE TABLE "PickupLocations" RESTART IDENTITY CASCADE`,
    );

    // Insert data with the specified starting primary key value
    await queryInterface.bulkInsert(
      "PickupLocations",
      pickupLocationsData.map((location, index) => ({
        ...location,
        pickup_location_id: startingPrimaryKeyValue + index,
      })),
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    // Truncate the "PickupLocations" table to reset primary key increments
    await queryInterface.sequelize.query(
      `TRUNCATE TABLE "PickupLocations" RESTART IDENTITY CASCADE`,
    );
  },
};
