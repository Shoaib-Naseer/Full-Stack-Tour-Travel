// seeders/reviewSeeder.js
"use strict";
const { Review } = require("../models");
const reviewsData = require("../data/reviews"); 

module.exports = {
  async up(queryInterface, Sequelize) {
    // Loop through the reviewsData array and create review records
    for (const reviewData of reviewsData) {
      await Review.create(reviewData);
    }
  },

  async down(queryInterface, Sequelize) {
    // Truncate the "Reviews" table to remove all records
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
