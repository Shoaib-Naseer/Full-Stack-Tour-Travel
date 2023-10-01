const helper = require("./helper");
const userController = require("../controllers/userController");
const config = require("../config");

const userParamsSchema = {
  params: {
    type: "object",
    properties: {
      userId: { type: "integer" },
    },
  },
};

const getAllUsers = {
  schema:{
    tags: ["Users"],
    response: {
      400: helper.errorMessage,
    }
  },
  handler: userController.getAllUsers,
};

const getUserById = {
  schema: {
    tags: ["Users"],
    params: userParamsSchema,
    response: {
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: userController.getUserById,
};

const deleteUserById = {
  schema: {
    tags: ["Users"],
    params: userParamsSchema,
    response: {
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: userController.deleteUserById,
};

const uploadProfilePicture = {
  schema: {
    tags: ["Users"],
    params: userParamsSchema,
    response: {
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: userController.uploadProfilePicture,
};

async function userRoutes(fastify) {

  fastify.get(`${config.app.apiPath}users`, getAllUsers);
  fastify.get(`${config.app.apiPath}users/:userId`, getUserById);
  fastify.delete(`${config.app.apiPath}users/:userId`, deleteUserById);
  fastify.post(`${config.app.apiPath}users/:userId/profile`, uploadProfilePicture);
}

module.exports = userRoutes;
