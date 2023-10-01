const interestsService = require("../services/interestsService");
const responseUtils = require("../utils/responseUtils");


async function getAllInterests(req, reply) {
  try {
    const interests = await interestsService.getAllInterests();
    responseUtils.sendSuccessResponse(reply, interests);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function createInterest(req, reply) {
  const { name, description = "" } = req.body;
  try {
    const interest = await interestsService.createInterest(name, description);
    responseUtils.sendSuccessResponse(reply, interest,201);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function updateInterest(req, reply) {
  const { id } = req.params;
  const { name, description = "" } = req.body;
  try {
    const interestExists = await interestsService.getInterest(id);
    if (!interestExists) {
      responseUtils.sendNotFoundResponse(reply, "Interest not found");
      return;
    }
    const interest = await interestsService.updateInterest(id, {
      name,
      description,
    });
    responseUtils.sendSuccessResponse(reply, interest);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function getInterest(req, reply) {
  const { id } = req.params;
  try {
    const interest = await interestsService.getInterest(id);
    if (interest) {
      responseUtils.sendSuccessResponse(reply, interest);
      return
    } else {
      responseUtils.sendNotFoundResponse(reply, "Interest not found");
      return
    }
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function deleteInterest(req, reply) {
  const { id } = req.params;
  try {
    const interestExists = await interestsService.getInterest(id);
    if (interestExists) {
      const interest = await interestsService.deleteInterest(id);
      responseUtils.sendSuccessResponse(reply, interest);
      return
    } else {
      responseUtils.sendNotFoundResponse(reply, "Interest not found");
      return
    }
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);  }
}

module.exports = {
  getAllInterests,
  createInterest,
  updateInterest,
  getInterest,
  deleteInterest,
};
