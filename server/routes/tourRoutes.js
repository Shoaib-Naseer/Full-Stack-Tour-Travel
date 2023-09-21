// routes/categoryRoutes.js
const config = require("../config");
const helper = require("./helper");
const tourController = require("../controllers/tourController");

const tourBodySchema = {
  type: "object",
  properties: {
    tour_id: { type: "integer" },
    name: { type: "string" },
    description: { type: "string" },
    location: { type: "string" },
    base_price: { type: "string" },
  },
};

const tourResponseSchema = {
  type: "object",
  properties: {
    tour_id: { type: "integer" },
    name: { type: "string" },
    description: { type: "string" },
    location: { type: "string" },
    base_price: { type: "string" },
    Images: {
      type: "array",
      items: {
        type: "object",
        properties: {
          url: { type: "string" },
          image_id: { type: "integer" },
        },
      },
    },
  },
};

const getTours = {
  schema: {
    response: {
      200: { type: "array", items: tourResponseSchema },
      400: helper.errorMessage,
    },
  },
  handler: tourController.getAllTours,
};

const createTour = {
  schema: {
    body: { ...tourBodySchema, required: ["name"] },
    response: {
      201:tourResponseSchema,
      400: helper.errorMessage,
    },
  },
  handler: tourController.createTour,
};

const updateTour = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
    body: tourBodySchema,
    response: {
      200:tourResponseSchema,
      404: helper.errorMessage,
      400: helper.errorMessage,
    },
  },
  handler: tourController.updateTour,
};

const getTour = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
    response: {
      200:tourResponseSchema,
      404: helper.errorMessage,
      400: helper.errorMessage,
    },
  },
  handler: tourController.getTour,
};

const deleteTour = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
    response: {
      200:tourResponseSchema,
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: tourController.deleteTour,
};

function categoryRoutes(fastify, options, done) {
  fastify.get(`${config.app.apiPath}tours`, getTours);
  fastify.post(`${config.app.apiPath}tours`, createTour);
  fastify.get(`${config.app.apiPath}tours/:id`, getTour);
  fastify.put(`${config.app.apiPath}tours/:id`, updateTour);
  fastify.delete(`${config.app.apiPath}tours/:id`, deleteTour);

  done();
}

module.exports = categoryRoutes;
