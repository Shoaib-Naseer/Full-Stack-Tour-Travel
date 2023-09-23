const { User } = require("../models");
const fs = require("fs");
const path = require("path");

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

async function uploadProfilePicture(file, userId) {
  try {
    const dirPath = path.join(__dirname, "..", "uploads/profiles");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filePath = path.join(dirPath, `${uniqueSuffix}-${file.name}`);

    await file.mv(filePath);
    await User.update(
      { profile_image: filePath },
      { where: { user_id: userId } },
    );

    return filePath;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteUserProfilePicture(imagePath) {
  try {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  getUserByEmail,
  uploadProfilePicture,
  deleteUserProfilePicture,
};
