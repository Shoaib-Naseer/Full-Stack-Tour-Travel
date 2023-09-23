const jwt = require("jsonwebtoken");
const config = require("../config");

function generateAccessToken(user) {
  const { user_id: userId, email } = user;
  return jwt.sign({ userId, email }, config.jwt.accessTokenSecret, {
    expiresIn: config.jwt.expirationShortInSeconds,
  });
}

function generateRefreshToken(user) {
  const { user_id: userId, email } = user;
  return jwt.sign({ userId, email }, config.jwt.refreshTokenSecret, {
    expiresIn: config.jwt.refreshExpirationInSeconds,
  });
}

function logoutAccessToken(user) {
    const { user_id: userId, email } = user;
    return jwt.sign({ userId, email }, config.jwt.refreshTokenSecret, {
      expiresIn: config.jwt.logoutExpirationToken,
    });
  }

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  logoutAccessToken
};
