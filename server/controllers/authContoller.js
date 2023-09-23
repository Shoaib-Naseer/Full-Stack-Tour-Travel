const authService = require("../services/authService");
const userService = require("../services/userService");

const register = async (request, reply) => {
  try {
    const userData = request.body;
    const { email } = userData;
    const user = await userService.getUserByEmail(email);
    if (user) return reply.code(400).send({ message: "User Already Exists" });
    const newUser = await authService.registerUser(userData);
    if (!newUser)
      return reply
        .code(400)
        .send({ message: "failure", error: "Error While Creating new User" });
    const accessToken = tokenUtils.generateAccessToken(user);
    reply.code(201).send({ message: "success", accessToken });
  } catch (error) {
    reply.code(400).send({ error: error });
  }
};

const login = async (request, reply) => {
  try {
    const { email, password } = request.body;
    const user = await userService.getUserByEmail(email);
    if (!user) return reply.code(400).send({ message: "User Doesnt Exists" });
    const validPassword = await authService.loginUser(email, password);
    if (!validPassword)
      return reply
        .code(400)
        .send({ message: "failure", error: "Invalid Credentials" });
    const accessToken = tokenUtils.generateAccessToken(user);
    const refreshToken = tokenUtils.generateRefreshToken(user);
    reply
      .code(200)
      .send({ messgae: "success", tokens: { accessToken, refreshToken } });
  } catch (error) {
    reply.code(401).send({ error: error.message });
  }
};

// Logout the authenticated user
const logout = async (request, reply) => {
  try {
    const { email } = request.body;
    const user = await userService.getUserByEmail(email);
    if (!user) return reply.code(400).send({ message: "User Doesnt Exists" });
    const accessToken = await authService.logutUser(user);
    reply.code(200).send({ accessToken });
  } catch (error) {}
};

module.exports = { register, login, logout };
