const authService = require("../services/authService");
const userService = require("../services/userService");

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
    const accessToken = tokenUtils.generateAccessToken(user);
    reply.code(201).send({ message: "success", data: { accessToken } });
  } catch (error) {
    reply.code(400).send({ message: "failure", error: error.message });
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
    const validPassword = await authService.loginUser(email, password);
    if (!validPassword)
      return reply
        .code(400)
        .send({ message: "failure", error: "Invalid Credentials" });
    const accessToken = tokenUtils.generateAccessToken(user);
    const refreshToken = tokenUtils.generateRefreshToken(user);
    reply
      .code(200)
      .send({ messgae: "success", data: { accessToken, refreshToken } });
  } catch (error) {
    reply.code(400).send({ message: "failure", error: error.message });
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
    reply.code(400).send({ message: "failure", error: error.message });
  }
};

module.exports = { register, login, logout };
