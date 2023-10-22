const jwt = require("jsonwebtoken");
const config = require("../config");

function generateAccessToken(user) {
  const { user_id: id, email,userName } = user;
  const role = user.Role.name;
  return jwt.sign({ id, email,role,userName }, config.jwt.accessTokenSecret, {
    expiresIn: config.jwt.expirationShortInSeconds,
  });
}

function generateRefreshToken(user) {
  const { user_id: id, email,userName } = user;
  const role = user.Role.name;
  return jwt.sign({ id, email,role,userName }, config.jwt.refreshTokenSecret, {
    expiresIn: config.jwt.refreshExpirationInSeconds,
  });
}

function generateLogoutAccessToken(user) {
    const { user_id: id, email,userName } = user;
    return jwt.sign({ id, email,userName }, config.jwt.refreshTokenSecret, {
      expiresIn: config.jwt.logoutExpirationToken,
    });
  }

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateLogoutAccessToken
};
