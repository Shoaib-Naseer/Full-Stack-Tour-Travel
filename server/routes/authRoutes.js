// routes/categoryRoutes.js
const config = require("../config");
const helper = require("./helper");
const authController = require("../controllers/authContoller");

const LoginUser = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
};

const RegisterUser = {
  type: "object",
  required: ["username", "gender", "email", "password"],
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
    gender: { type: "string", enum: ['male', 'female', 'other'] },
    username: { type: "string" },
    birthdate: { type: "string", format: "date" },
    location: { type: "string" },
    profile_image: { type: "string" },
  },
};

const loginUser = {
  schema: {
    body: LoginUser,
    response: {
      400: helper.errorMessage,
      404: helper.errorMessage,
    },
  },
  handler: authController.login,
};

const registerUser = {
  schema: {
    body: RegisterUser,
    response: {
      400: helper.errorMessage,
    },
  },
  handler: authController.register,
};

function authRoutes(fastify, options, done) {
  fastify.post(`${config.app.apiPath}auth/login`, loginUser);
  fastify.post(`${config.app.apiPath}auth/register`, registerUser);
  done();
}

module.exports = authRoutes;
