"use strict";
const { queryInterface, Sequelize, Op } = require("sequelize"); // Import queryInterface and Sequelize
const toursData = require("../data/tours");
const { BasicTour, Tour, PickupLocation, Category } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    let id = 0;
    for (const tours of toursData) {
      const { name, pickupLocationIds, categoryIds, ...tourData } = tours;
      id++;
      const basicTour = await BasicTour.create({
        name: name,
        basic_tour_id: id,
      });
      const tour = await Tour.create({
        ...tourData,
        basic_tour_id: basicTour.basic_tour_id,
      });
      if(pickupLocationIds){
        const pickupLocations = await PickupLocation.findAll({
          where: { pickup_location_id: { [Op.in]: pickupLocationIds } },
        });
        if (pickupLocations) {
          await tour.setPickupLocations(pickupLocations);
        }
      }
      if(categoryIds){
        const categories = await Category.findAll({
          where: { category_id: { [Op.in]: categoryIds } },
        });
        if (categories) {
          await tour.setCategories(categories);
        }
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tours", { cascade: true });
    await queryInterface.dropTable("BasicTours", { cascade: true });
  },
};
