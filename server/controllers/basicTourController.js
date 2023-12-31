const basicTourService = require("../services/basicTourService");
const responseUtils = require("../utils/responseUtils");
const { getFileURL } = require("../utils/upload");

async function getAllBasicTours(req, reply) {
  try {
    const tours = await basicTourService.getAllBasicTours();
    responseUtils.sendSuccessResponse(reply, tours);
  } catch (error) {
    console.error(error);
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function getAllActiveBasicTours(req, reply) {
  try {
    const { location = "" } = req.query;
    const tours = await basicTourService.getAllActiveBasicTours(location);
    for (const basicTour of tours) {
      // Loop through the associated tours of each basic tour
      for (const tour of basicTour.Tours) {
        // Loop through the images of each tour and update their URLs
        for (const image of tour.Images) {
          if (image.url) {
            image.url = getFileURL(image.url);
          }
        }
      }
    }
    responseUtils.sendSuccessResponse(reply, tours);
  } catch (error) {
    console.error(error);
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function getAllToursByBasicTour(req, reply) {
  try {
    const { id } = req.params;
    const tours = await basicTourService.getAllToursByBasicTour(id);
    for (const basicTour of tours) {
      // Loop through the associated tours of each basic tour
      for (const tour of basicTour.Tours) {
        // Loop through the images of each tour and update their URLs
        for (const image of tour.Images) {
          if (image.url) {
            image.url = getFileURL(image.url);
          }
        }
      }
    }
    responseUtils.sendSuccessResponse(reply, tours);
  } catch (error) {
    console.error(error);
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

// Update a tour by ID
async function updateBasicTour(req, reply) {
  const { id } = req.params;
  try {
    const tourExists = await basicTourService.getBasicTourById(id);
    if (!tourExists) {
      responseUtils.sendNotFoundResponse(reply, "Basic Tour not found");
      return;
    }
    const tour = await basicTourService.updateBasicTour(id, req.body);
    responseUtils.sendSuccessResponse(reply, tour);
  } catch (error) {
    console.error(error);
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

// delete a tour by ID
async function deleteBasicTour(req, reply) {
  const { id } = req.params;
  try {
    const tourExists = await basicTourService.getBasicTourById(id);
    if (!tourExists) {
      responseUtils.sendNotFoundResponse(reply, "Basic Tour not found");
      return;
    }
    const tour = await basicTourService.deleteBasicTour(id, req.body);
    responseUtils.sendSuccessResponse(reply, tour);
  } catch (error) {
    console.error(error);
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

module.exports = {
  updateBasicTour,
  deleteBasicTour,
  getAllBasicTours,
  getAllToursByBasicTour,
  getAllActiveBasicTours,
};
