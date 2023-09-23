const userService = require("../services/userService");

async function getAllUsers(req, reply) {
  try {
    const users = await userService.getAllUsers();
    responseUtils.sendSuccessResponse(reply, users);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function getUserById(req, reply) {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);

    if (!user) {
      responseUtils.sendNotFoundResponse(reply, "User not found");
      return;
    }

    responseUtils.sendSuccessResponse(reply, user);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function deleteUserById(req, reply) {
  try {
    const { userId: loggedInUserId } = req.user; 
    const { userId } = req.params;
    if (parseInt(loggedInUserId) !== parseInt(userId) || role_id !== 1) {
      responseUtils.sendFailureResponse(
        reply,
        "You are not authorized to delete this review",
        403 
      );
      return;
    }
    const user = await userService.deleteUserById(userId);
    responseUtils.sendSuccessResponse(reply, user);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function uploadProfilePicture(req, reply) {
  try {
    const { userId: loggedInUserId } = req.user; 
    const { userId } = req.params;
    const profilePicture = req.raw.files;
    if (parseInt(loggedInUserId) !== parseInt(userId)) {
      responseUtils.sendUnauthorizedResponse(reply, "You are not authorized to update this profile");
      return;
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      responseUtils.sendNotFoundResponse(reply, "User not found");
      return;
    }

    const updatedProfileImagePath = await userService.uploadUserProfilePicture(
      userId,
      profilePicture,
    );

    if (user.profile_image) {
      await userService.deleteUserProfilePicture(user.profile_image);
    }

    responseUtils.sendSuccessResponse(reply, updatedProfileImagePath);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}


module.exports = {
  getAllUsers,
  getUserById,
  deleteUserById,
  uploadProfilePicture,
};
