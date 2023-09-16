"use strict";
const imagesData = require("../data/images");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const startingPrimaryKeyValue = 1;
    await queryInterface.sequelize.query(
      `TRUNCATE TABLE "Images" RESTART IDENTITY CASCADE`,
    );
    await queryInterface.bulkInsert(
      "Images",
      imagesData.map((image, index) => ({
        ...image,
        image_id: startingPrimaryKeyValue + index,
      })),
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `TRUNCATE TABLE "Images" RESTART IDENTITY CASCADE`,
    );
  },
};
