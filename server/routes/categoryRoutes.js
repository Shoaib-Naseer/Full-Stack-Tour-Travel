// routes/categoryRoutes.js
const config = require("../config");
const helper = require('./helper')
const categoryController = require("../controllers/categoryController");

const Category = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
};


const getCategories = {
  schema: {
    response: {
      200: {
        type: "array",
        categories: Category,
      },
      400:helper.errorMessage
    },
  },
  handler: categoryController.getAllCategories,
};

const createCategory = {
  schema: {
    body: Category,
    response: {
      201: Category,
      400:helper.errorMessage
    },
  },
  handler: categoryController.createCategory,
};

const updateCategory = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
    body: Category,
    response: {
      200: Category,
      404: helper.errorMessage,
      400: helper.errorMessage,
    },
  },
  handler: categoryController.updateCategory,
};

const getCategory = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
    response: {
      200: Category,
      404:helper.errorMessage,
      400: helper.errorMessage,
    },
  },
  handler: categoryController.getCategory,
};

const deleteCategory = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      404:helper.errorMessage,
    },
  },
  handler: categoryController.deleteCategory,
};

function categoryRoutes(fastify, options, done) {
  fastify.get(`${config.app.apiPath}categories`, getCategories);
  fastify.post(`${config.app.apiPath}categories`, createCategory);
  fastify.get(`${config.app.apiPath}categories/:id`, getCategory);
  fastify.put(`${config.app.apiPath}categories/:id`, updateCategory);
  fastify.delete(
    `${config.app.apiPath}categories/categories/:id`,
    deleteCategory,
  );

  done();
}

module.exports = categoryRoutes;
