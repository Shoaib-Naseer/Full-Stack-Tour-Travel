"use strict";
const categoriesData = require("../data/category");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Set the starting primary key value for the "Roles" table
    const startingPrimaryKeyValue = 1; // You can adjust this value as needed

    // Truncate the "Roles" table to reset primary key increments
    await queryInterface.sequelize.query(`TRUNCATE TABLE "Categories" RESTART IDENTITY CASCADE`);

    // Insert data with the specified starting primary key value
    await queryInterface.bulkInsert(
      "Categories",
      categoriesData.map((category, index) => ({
        ...category,
        category_id: startingPrimaryKeyValue + index,
      })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Truncate the "Roles" table to reset primary key increments
    await queryInterface.sequelize.query(`TRUNCATE TABLE "Categories" RESTART IDENTITY CASCADE`);
  },
};
