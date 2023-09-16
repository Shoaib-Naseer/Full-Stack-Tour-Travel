const authService = require('../services/authService');

const register = async (request, reply) => {
  try {
    const userData = request.body;
    const token = await authService.registerUser(userData);
    reply.code(201).send({ token });
  } catch (error) {
    reply.code(400).send({ error: error });
  }
};


const login = async (request, reply) => {
  try {
    const { email, password } = request.body;
    const {accessToken, refreshToken} = await authService.loginUser(email, password);
    reply.code(200).send({ accessToken,refreshToken });
  } catch (error) {
    reply.code(401).send({ error: error.message  });
  }
};

// Logout the authenticated user
const logout = async (request, reply) => {
  // Implement your logout logic here (e.g., token invalidation)
};

module.exports = { register, login, logout };
