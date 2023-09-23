const { User } = require("../models");

async function getAllUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

async function deleteUserById(userId) {
  try {
    const deletedRows = await User.destroy({
      where: { id: userId },
    });

    if (deletedRows === 0) {
      throw new Error("User not found");
    }

    return deletedRows;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  getUserByEmail,
};
