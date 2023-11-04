const config = require("../config");
const paymentController = require("../controllers/paymentController");
const responseUtils = require("../utils/responseUtils");

const createPayment = {
  schema: {
    tags: ["Payment"],
  },
  handler: paymentController.createPayment,
};


function paymentRoutes(fastify, options, done) {
  fastify.post(`${config.app.apiPath}payment/:tourId`, createPayment);
  done();
}

module.exports = paymentRoutes;
