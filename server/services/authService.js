const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const registerUser = async (userData) => {
  const {
    username,
    email,
    password,
    gender,
    birthdate,
    location = "",
    profile_image = "",
  } = userData;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, config.jwt.saltRounds);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    gender,
    birthdate,
    location,
    profile_image,
  });
  const accessToken = jwt.sign(
    { userId: user.user_id, email: user.email },
    config.jwt.accessTokenSecret,
    { expiresIn: config.jwt.expirationShortInSeconds },
  );
  return accessToken;
};

async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found.");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid Credentials.");
  }
  const accessToken = jwt.sign(
    { userId: user.user_id, email: user.email },
    config.jwt.accessTokenSecret,
    { expiresIn: config.jwt.expirationShortInSeconds },
  );
  const refreshToken = jwt.sign(
    { userId: user.user_id, email: user.email },
    config.jwt.refreshTokenSecret,
    { expiresIn: config.jwt.refreshExpirationInSeconds },
  );
  return({
    accessToken,
    refreshToken,
  });
}

module.exports = {
  loginUser,
  registerUser,
};
