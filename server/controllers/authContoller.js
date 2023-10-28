const authService = require("../services/authService");
const userService = require("../services/userService");
const tokenUtils = require("../utils/tokenUtils");
const responseUtils = require("../utils/responseUtils");

const register = async (req, reply) => {
  try {
    const userData = req.body;
    const { email } = userData;
    const user = await userService.getUserByEmail(email);
    if (user)
      return reply
        .code(400)
        .send({ message: "failure", error: "User Already Exists" });
    const newUser = await authService.registerUser(userData);
    if (!newUser)
      return reply
        .code(400)
        .send({ message: "failure", error: "Error While Creating new User" });
    const accessToken = tokenUtils.generateAccessToken(newUser);
    reply.code(201).send({ message: "success", data: { accessToken } });
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
};

const login = async (req, reply) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user)
      return reply
        .code(400)
        .send({ message: "failure", error: "User Doesnt Exists" });
    const validPassword = await authService.loginUser(user.password, password);
    if (!validPassword)
      return reply
        .code(400)
        .send({ message: "failure", error: "Invalid Credentials" });

    const userWithoutPassword = {
      id: user.user_id,
      email: user.email,
      userName: user.userName,
      role: user.Role.name,
      // Add other properties here
    };
    const accessToken = tokenUtils.generateAccessToken(user);
    const refreshToken = tokenUtils.generateRefreshToken(user);
    reply
      .code(200)
      .send({
        messgae: "success",
        data: { accessToken, refreshToken, user: userWithoutPassword },
      });
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
};

// Logout the authenticated user
const logout = async (req, reply) => {
  try {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user)
      return reply
        .code(400)
        .send({ message: "failure", error: "User Doesnt Exists" });
    const accessToken = await authService.logutUser(user);
    reply.code(200).send({ message: "success", data: { accessToken } });
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
};

module.exports = { register, login, logout };
