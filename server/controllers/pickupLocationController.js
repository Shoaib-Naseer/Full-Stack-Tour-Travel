// controllers/pickupLocationController.js
const pickupLocationService = require("../services/pickupLocationService");
const responseUtils = require("../utils/responseUtils");

// Create a new pickup location
async function createPickupLocation(req, reply) {
  try {
    const pickupLocation = await pickupLocationService.createPickupLocation(
      req.body,
    );
    responseUtils.sendSuccessResponse(reply, pickupLocation, 201);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

// Update an existing pickup location by ID
async function updatePickupLocation(req, reply) {
  const { pickupId: pickup_location_id } = req.params;
  try {
    const pickupLocation = await pickupLocationService.updatePickupLocation(
      { pickup_location_id },
      req.body,
    );
    if (!pickupLocation) {
      responseUtils.sendNotFoundResponse(reply, "Pickup Location not found");
      return;
    }
    responseUtils.sendSuccessResponse(reply, pickupLocation);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

// Delete a pickup location by ID and return the deleted record
async function deletePickupLocation(req, reply) {
  const { pickupId: pickup_location_id } = req.params;
  try {
    const pickupLocation = await pickupLocationService.deletePickupLocation({
      pickup_location_id,
    });
    if (!pickupLocation) {
      responseUtils.sendNotFoundResponse(reply, "Pickup Location not found");
      return;
    }
    responseUtils.sendSuccessResponse(reply, pickupLocation);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

// Find a pickup location by ID
async function findPickupLocationById(req, reply) {
  const { pickupId: pickup_location_id } = req.params;
  try {
    const pickupLocation = await pickupLocationService.findPickupLocationById({
      pickup_location_id,
    });
    if (!pickupLocation) {
      responseUtils.sendNotFoundResponse(reply, "Pickup Location not found");
      return;
    }
    responseUtils.sendSuccessResponse(reply, pickupLocation);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

// Find all pickup locations
async function findAllPickupLocations(req, reply) {
  try {
    const pickupLocations =
      await pickupLocationService.findAllPickupLocations();
    responseUtils.sendSuccessResponse(reply, pickupLocations);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

// Delete all pickup locations
async function deleteAllPickupLocations(req, reply) {
  try {
    await pickupLocationService.deleteAllPickupLocations();
    responseUtils.sendSuccessResponse(
      reply,
      "All pickup locations deleted successfully",
    );
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

module.exports = {
  createPickupLocation,
  updatePickupLocation,
  deletePickupLocation,
  findPickupLocationById,
  findAllPickupLocations,
  deleteAllPickupLocations,
};
