"use strict";
const toursData = require("../data/tours");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const startingPrimaryKeyValue = 1;

    await queryInterface.sequelize.query(
      `TRUNCATE TABLE "Tours" RESTART IDENTITY CASCADE`,
    );
    await queryInterface.bulkInsert(
      "Tours",
      toursData.map((tour, index) => ({
        ...tour,
        tour_id: startingPrimaryKeyValue + index,
      })),
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `TRUNCATE TABLE "Tours" RESTART IDENTITY CASCADE`,
    );
  },
};
