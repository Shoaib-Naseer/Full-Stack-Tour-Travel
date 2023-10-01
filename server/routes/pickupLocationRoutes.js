// routes/categoryRoutes.js
const config = require("../config");
const helper = require("./helper");

const pickupLocationController = require("../controllers/pickupLocationController");

const getAllPickupLocations = {
  schema: {
    tags: ["Pickups "],
    response: {
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: pickupLocationController.findAllPickupLocations,
};

const createPickupLocation = {
  schema: {
    tags: ["Pickups "],
    response: {
      400: helper.errorMessage,
    },
  },
  handler: pickupLocationController.createPickupLocation,
};

const updatePickupLocation = {
  schema: {
    tags: ["Pickups "],
    response: {
      404: helper.errorMessage,
      400: helper.errorMessage,
    },
  },
  handler: pickupLocationController.updatePickupLocation,
};

const getPickupLocation = {
  schema: {
    tags: ["Pickups "],
    response: {
      404: helper.errorMessage,
      400: helper.errorMessage,
    },
  },
  handler: pickupLocationController.findPickupLocationById,
};

const deletePickupLocation = {
  schema: {
    tags: ["Pickups "],
    response: {
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: pickupLocationController.deletePickupLocation,
};

const deleteAllPickupLocations = {
  schema: {
    tags: ["Pickups "],
    response: {
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: pickupLocationController.deleteAllPickupLocations,
};

function pickupRoutes(fastify, options, done) {
  fastify.get(`${config.app.apiPath}pickups`, getAllPickupLocations);
  fastify.get(`${config.app.apiPath}pickups/:pickupId`, getPickupLocation);

  // admin routes
  fastify.post(`${config.app.apiPath}pickups`, createPickupLocation);
  fastify.put(`${config.app.apiPath}pickups/:pickupId`, updatePickupLocation);
  fastify.delete(
    `${config.app.apiPath}pickups/:pickupId`,
    deletePickupLocation,
  );
  fastify.delete(`${config.app.apiPath}pickups`, deleteAllPickupLocations);

  done();
}

module.exports = pickupRoutes;
