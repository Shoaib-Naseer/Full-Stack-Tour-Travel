// routes/categoryRoutes.js
const config = require("../config");
const helper = require("./helper");
const authController = require("../controllers/authContoller");

const loginUserBodySchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
};

const registerUserBodySchema = {
  type: "object",
  required: ["userName", "gender", "email", "password","birthdate"],
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
    gender: { type: "string", enum: ['male', 'female', 'other'] },
    userName: { type: "string" },
    birthdate: { type: "string", format: "date" },
    location: { type: "string" },
    profile_image: { type: "string" },
  },
};

const logoutUserBodySchema = {
  type: "object",
  required: ["email"],
  properties: {
    email: { type: "string", format: "email" },
  },
};

const loginUser = {
  schema: {
    tags: ["Auth"],
    body: loginUserBodySchema,
    response: {
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: authController.login,
};

const registerUser = {
  schema: {
    tags: ["Auth"],
    body: registerUserBodySchema,
    response: {
      400: helper.errorMessage,
    },
  },
  handler: authController.register,
};

const logoutUser = {
  schema: {
    tags: ["Auth"],
    body: logoutUserBodySchema,
    response: {
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: authController.logout,
};

function authRoutes(fastify, options, done) {
  fastify.post(`${config.app.apiPath}auth/login`, loginUser);
  fastify.post(`${config.app.apiPath}auth/register`, registerUser);
  fastify.post(`${config.app.apiPath}auth/logout`, logoutUser);
  done();
}

module.exports = authRoutes;
