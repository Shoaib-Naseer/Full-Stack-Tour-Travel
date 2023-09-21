// routes/categoryRoutes.js
const config = require("../config");
const helper = require("./helper");
const tourImagesConroller = require("../controllers/tourImagesController");

const imageResponseSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
    images: {
      type: "array",
      items: {
        type: "object",
        properties: {
          image_id: { type: "integer" },
          tour_id: { type: "integer" },
          url: { type: "string" },
        },
      },
    },
  },
};

const tourIdParams = {
  type: "object",
  properties: {
    tourId: { type: "integer" },
  },
};

const tourIdImageIdParams = {
  type: "object",
  properties: {
    tourId: { type: "integer" },
    imageId: { type: "integer" },
  },
};

const uploadImages = {
  schema: {
    params: tourIdParams,
  },
  response: {
    201: imageResponseSchema,
    400: helper.errorMessage,
  },
  handler: tourImagesConroller.uploadImages,
};

const getAllImages = {
  response: {
    200: imageResponseSchema,
    400: helper.errorMessage,
    404: helper.errorMessage,
  },

  handler: tourImagesConroller.getAllImages,
};

const getAllImagesForTour = {
  schema: {
    params: tourIdParams,
  },
  response: {
    200: imageResponseSchema,
    400: helper.errorMessage,
    404: helper.errorMessage,
  },
  handler: tourImagesConroller.getAllImagesForTour,
};

const deleteSingleTourImage = {
  schema: {
    params: tourIdImageIdParams,
  },
  response: {
    200: imageResponseSchema,
    400: helper.errorMessage,
    404: helper.errorMessage,
  },
  handler: tourImagesConroller.deleteSingleTourImage,
};

const deleteAllTourImages = {
  schema: {
    params: tourIdParams,
  },
  response: {
    200: imageResponseSchema,
    400: helper.errorMessage,
    404: helper.errorMessage,
  },
  handler: tourImagesConroller.deleteAllTourImages,
};

function imageRoutes(fastify, options, done) {
  fastify.post(`${config.app.apiPath}tours/:tourId/images`, uploadImages);
  fastify.get(`${config.app.apiPath}tours/:tourId/images`, getAllImagesForTour);
  fastify.get(`${config.app.apiPath}images`, getAllImages);
  fastify.delete(
    `${config.app.apiPath}tours/:tourId/images/:imageId`,
    deleteSingleTourImage,
  );
  fastify.delete(
    `${config.app.apiPath}tours/:tourId/images`,
    deleteAllTourImages,
  );

  done();
}

module.exports = imageRoutes;
