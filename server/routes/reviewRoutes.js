const config = require("../config");
const reviewController = require("../controllers/reviewController");
const helper = require("./helper");
const createReviewSchema = {
  body: {
    type: "object",
    properties: {
      rating: { type: "integer", minimum: 1, maximum: 5 },
      comment: { type: "string" },
    },
    required: ["rating"],
  },
};

const updateReviewSchema = {
  body: {
    type: "object",
    properties: {
      rating: { type: "integer", minimum: 1, maximum: 5 },
      comment: { type: "string" },
    },
  },
};

const reviewWithAssociationsSchema = {
  type: "object",
  properties: {
    review_id: { type: "integer" },
    rating: { type: "integer" },
    comment: { type: "string" },
    tour: {
      type: "object",
      properties: {
        tour_id: { type: "integer" },
        name: { type: "string" },
      },
    },
    user: {
      type: "object",
      properties: {
        user_id: { type: "integer" },
        username: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};

const tourIdParamSchema = {
  params: {
    type: "object",
    properties: {
      tourId: { type: "integer" },
    },
  },
};

const reviewIdParamSchema = {
  params: {
    type: "object",
    properties: {
      reviewId: { type: "integer" },
    },
  },
};

const userIdParamSchema = {
  params: {
    type: "object",
    properties: {
      userId: { type: "integer" },
    },
  },
};

const updateReviewParamsSchema = {
  params: {
    type: "object",
    properties: {
      reviewId: { type: "integer" },
      tourId: { type: "integer" },
    },
  },
};

const getAllReviewsForTour = {
  schema: {
    params: tourIdParamSchema,
    response: {
      200: { type: "array", items: reviewWithAssociationsSchema },
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: reviewController.getAllReviewsForTour,
};

const getAllReviewsForUser = {
  schema: {
    params: userIdParamSchema,
    response: {
      200: { type: "array", items: reviewWithAssociationsSchema },
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: reviewController.getAllReviewsForUser,
};

const getAllReviews = {
  schema: {
    response: {
      200: { type: "array", items: reviewWithAssociationsSchema },
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: reviewController.getAllReviews,
};

const createReview = {
  schema: {
    body: createReviewSchema,
    params: tourIdParamSchema,
    response: {
      400: helper.errorMessage,
    },
  },
  handler: reviewController.createReview,
};

const updateReview = {
  schema: {
    params: updateReviewParamsSchema,
    body: updateReviewSchema,
    response: {
      404: helper.errorMessage,
      400: helper.errorMessage,
    },
  },
  handler: reviewController.updateReview,
};

const getReviewById = {
  schema: {
    params: reviewIdParamSchema,
    response: {
      404: helper.errorMessage,
      400: helper.errorMessage,
    },
  },
  handler: reviewController.getReviewById,
};

const deleteReview = {
  schema: {
    params: reviewIdParamSchema,
    response: {
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: reviewController.deleteReview,
};

function reviewRoutes(fastify, options, done) {
  fastify.get(
    `${config.app.apiPath}tours/:tourId/reviews`,
    getAllReviewsForTour,
  );
  fastify.get(
    `${config.app.apiPath}users/:userId/reviews`,
    getAllReviewsForUser,
  );
  fastify.post(`${config.app.apiPath}tours/:tourId/reviews`, createReview);
  fastify.get(`${config.app.apiPath}reviews/:id`, getReviewById);
  fastify.get(`${config.app.apiPath}reviews`, getAllReviews);
  fastify.put(
    `${config.app.apiPath}tours/:tourId/reviews/:reviewId`,
    updateReview,
  );
  fastify.delete(`${config.app.apiPath}reviews/:id`, deleteReview);

  done();
}

module.exports = reviewRoutes;
