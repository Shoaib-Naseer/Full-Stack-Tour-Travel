"use strict";
const interestsData = require("../data/interests");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const startingPrimaryKeyValue = 1;
    await queryInterface.sequelize.query(
      `TRUNCATE TABLE "Interests" RESTART IDENTITY CASCADE`,
    );
    await queryInterface.bulkInsert(
      "Interests",
      interestsData.map((interest, index) => ({
        ...interest,
        interest_id: startingPrimaryKeyValue + index,
      })),
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `TRUNCATE TABLE "Interests" RESTART IDENTITY CASCADE`,
    );
  },
};
