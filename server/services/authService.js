const { User } = require("../models");
const bcrypt = require("bcrypt");
const tokenUtils = require("../utils/tokenUtils");
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

  return user;
};

async function loginUser(userPassword,password) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) {
    return 0;
  }
  return 1;
}

async function logutUser(user) {
  const accessToken = tokenUtils.generateLogoutAccessToken(user);
  return accessToken;
}

module.exports = {
  loginUser,
  logutUser,
  registerUser,
};
