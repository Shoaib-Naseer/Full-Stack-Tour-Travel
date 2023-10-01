const helper = require('./helper')
const interestController = require("../controllers/interestController");
const config = require('../config');

const Interest = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
  },
  required: ["name"],
};

const getInterests = {
  schema: {
    response: {
      // 200: {
      //   type: "array",
      //   interests: Interest,
      // },
      400:helper.errorMessage
    },
  },
  handler: interestController.getAllInterests,
};

const createInterest = {
  schema: {
    // body: Interest,
    response: {
      // 201: Interest,
      400:helper.errorMessage
    },
  },
  handler: interestController.createInterest,
};

const updateInterest = {
  schema: {
    // params: {
    //   type: "object",
    //   properties: {
    //     id: { type: "integer" },
    //   },
    // },
    // body: Interest,
    response: {
      // 200: Interest,
      404:helper.errorMessage,
      400:helper.errorMessage
    },
  },
  handler: interestController.updateInterest,
};

const getInterest = {
  schema: {
    // params: {
    //   type: "object",
    //   properties: {
    //     id: { type: "integer" },
    //   },
    // },
    response: {
      404:helper.errorMessage,
      400: helper.errorMessage,
    },
  },
  handler: interestController.getInterest,
};

const deleteInterest = {
  schema: {
    // params: {
    //   type: "object",
    //   properties: {
    //     id: { type: "integer" },
    //   },
    // },
    response: {
      // 200: {
      //   type: "object",
      //   properties: {
      //     message: { type: "string" },
      //   },
      // },
      404:helper.errorMessage,
    },
  },
  handler: interestController.deleteInterest,
};

function interestsRoutes(fastify, options, done) {
  fastify.get(`${config.app.apiPath}interests`, getInterests);
  fastify.post(`${config.app.apiPath}interests`, createInterest);
  fastify.get(`${config.app.apiPath}interests/:id`, getInterest);
  fastify.put(`${config.app.apiPath}interests/:id`, updateInterest);
  fastify.delete(`${config.app.apiPath}interests/:id`, deleteInterest);

  done();
}

module.exports = interestsRoutes;
