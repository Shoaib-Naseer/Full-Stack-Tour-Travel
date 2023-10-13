// routes/categoryRoutes.js
const config = require("../config");
const helper = require("./helper");
const tourController = require("../controllers/tourController");
const basicTourController = require("../controllers/basicTourController");


const getActiveTours = {
  schema: {
    tags: ["Tours"],
    response: {
      // 200: { type: "array", items: tourResponseSchema },
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: basicTourController.getAllActiveBasicTours,
};

const createTour = {
  schema: {
    tags: ["Tours"],
    // body: { ...tourBodySchema, required: ["name"] },
    response: {
      // 201: tourResponseSchema,
      400: helper.errorMessage,
    },
  },
  handler: tourController.createTour,
};

const updateActiveTour = {
  schema: {
    tags: ["Tours"],
    // params: tourParamsSchema,
    // body: tourBodySchema,
    response: {
      // 200: tourResponseSchema,
      404: helper.errorMessage,
      400: helper.errorMessage,
    },
  },
  handler: tourController.updateActiveTour,
};

const getTour = {
  schema: {
    tags: ["Tours"],
    // params: tourParamsSchema,
    response: {
      // 200: tourResponseSchema,
      404: helper.errorMessage,
      400: helper.errorMessage,
    },
  },
  handler: tourController.getTour,
};

const getSearchTour = {
  schema: {
    // params: tourParamsSchema,
    response: {
      // 200: tourResponseSchema,
      404: helper.errorMessage,
      400: helper.errorMessage,
    },
  },
  handler: basicTourController.getSearchTours,
};

const deleteActiveTour = {
  schema: {
    tags: ["Tours"],
    // params: tourParamsSchema,
    response: {
      // 200: tourResponseSchema,
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: tourController.deleteActiveTour,
};

function tourRoutes(fastify, options, done) {
  fastify.get(`${config.app.apiPath}tours`, getActiveTours);
  fastify.get(`${config.app.apiPath}tours/:tourId`, getTour);
  fastify.get(`${config.app.apiPath}/tours/search`,getSearchTour);

  // admin routes
  fastify.post(`${config.app.apiPath}tours`, createTour);
  fastify.put(`${config.app.apiPath}tours/:tourId`, updateActiveTour);
  fastify.delete(`${config.app.apiPath}tours/:tourId`, deleteActiveTour);

  done();
}

module.exports = tourRoutes;
