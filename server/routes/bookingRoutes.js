const config = require("../config");
const bookingController = require("../controllers/bookingController");

// Request schema for creating a booking
const bookingBodySchema = {
  type: "object",
  properties: {
    group_size: { type: "integer" },
    payment_id: { type: "integer" },
    user_id: { type: "integer" },
  },
  required: ["group_size", "payment_id", "tour_id", "user_id"],
};

const BookingParamsSchema = {
  type: "object",
  properties: {
    tourId: { type: "integer" },
  },
};

const userParamsSchema = {
    type: 'object',
    properties: {
      userId: { type: 'integer' },
    },
  }

  const userTourParamsSchema = {
    type: 'object',
    properties: {
      userId: { type: 'integer' },
      tourId: { type: 'integer' },
    },
  }

// Response schema for success
const bookingResponseSchema = {
  200: {
    type: "object",
    properties: {
      message: { type: "string" },
      bookings: { type: "array" },
    },
  },
};

// Response schema for error
const errorResponseSchema = {
  400: {
    type: "object",
    properties: {
      error: { type: "string" },
      details: { type: "string" },
    },
  },
};

const createBooking = {
  schema: {
    params:BookingParamsSchema,
    body: bookingBodySchema,
    // response: {
    //   201: bookingResponseSchema,
    //   400: helper.errorMessage,
    // },
  },
  handler: bookingController.createBooking,
};

const getBookingsForTour = {
    schema: {
      params:BookingParamsSchema,
    //   response: {
    //     200: { type: 'array', items: bookingResponseSchema },
    //     400: helper.errorMessage,
    //   },
    },
    handler: bookingController.getBookingsForTour,
  };

  const getBookingsForUser = {
    schema: {
      params:userParamsSchema ,
    //   response: {
    //     200: { type: 'array', items: bookingResponseSchema },
    //     400: helper.errorMessage,
    //   },
    },
    handler: bookingController.getBookingsForUser,
  };

  const getAllBookings = {
    schema: {
    //   response: {
    //     200: { type: 'array', items: bookingResponseSchema },
    //     400: helper.errorMessage,
    //   },
    },
    handler: bookingController.getAllBookings,
  };

  const getBookingByUserAndTour = {
    schema: {
      params: userTourParamsSchema,
    //   response: {
    //     200: bookingResponseSchema,
    //     404: helper.errorMessage,
    //     400: helper.errorMessage,
    //   },
    },
    handler: bookingController.getBookingByUserAndTour,
  };

function bookingRoutes(fastify, options, done) {
  fastify.get(`${config.app.apiPath}bookings`, getAllBookings);
  fastify.post(`${config.app.apiPath}/bookings/:tourId`, createBooking);
  fastify.get(`${config.app.apiPath}/bookings/tours/:tourId`, getBookingsForTour);
  fastify.get(`${config.app.apiPath}/bookings/users/:userId`, getBookingsForUser);  
  fastify.get(`${config.app.apiPath}bookings/:tourId/:userId`, getBookingByUserAndTour);

  done();
}

module.exports = bookingRoutes;
