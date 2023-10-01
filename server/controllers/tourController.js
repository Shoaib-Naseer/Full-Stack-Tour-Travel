const tourService = require("../services/tourService");
const basicTourService = require("../services/basicTourService");
const pickupLocationService = require("../services/pickupLocationService");
const categoryService = require("../services/categoryService");

const responseUtils = require("../utils/responseUtils");

async function createTour(req, reply) {
  const errorMessages = [];
  try {
    const { pickupLocations, categories, ...tourData } = req.body;

    // as we will store name in basic tour and other details in tour table
    const { name, ...tourDetails } = tourData;
    const basicTour = basicTourService.createBasicTour(name);
    const data = { ...tourDetails, basic_tour_id: basicTour.basic_tour_id };

    const pickupLocationIds =
      pickupLocations?.map((location) => location.pickup_location_id) || [];
    const FindPickupLocations =
      await pickupLocationService.findMultiplePickupLocations(
        pickupLocationIds,
      );

    const categoryIds =
      categories?.map((category) => category.category_id) || [];
    const FindCategoriess =
      await categoryService.findMultipleCategories(pickupLocationIds);

    const tour = await tourService.createTour(data);

    await Promise.all([
      tourService
        .setTourPickupLocations(tour, pickupLocationIds)
        .catch((error) => {
          console.error(`Failed to set pickup locations: ${error.message}`);
          errorMessages.push(
            "Failed to assosiate Pickup Locations, check the logs for details if needed",
          );
        }),
      tourService.setTourCategories(tour, categoryIds).catch((error) => {
        console.error(`Failed to set categories: ${error.message}`);
        errorMessages.push(
          "Failed to assosiate Categories, check the logs for details if needed",
        );
      }),
    ]);

    // Combine error messages into a single message
    const errorMessage =
      errorMessages.length > 0 ? errorMessages.join(", ") : null;

    responseUtils.sendSuccessResponse(reply, tour, 201, errorMessage);
  } catch (error) {
    console.error(error);
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function getTour(req, reply) {
  const { tourId } = req.params;
  try {
    const tour = await tourService.getTourById(tourId);
    if (!tour) {
      responseUtils.sendNotFoundResponse(reply, "Tour not found");
      return;
    }
    responseUtils.sendSuccessResponse(reply, tour);
  } catch (error) {
    console.error(error);
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

// Update a tour by ID
async function updateActiveTour(req, reply) {
  let errorMessages = [];
  try {
    const { tourId } = req.params;

    const tourExists = await tourService.getTourById(tourId);
    if (!tourExists) {
      responseUtils.sendNotFoundResponse(reply, "Tour not found");
      return;
    }
    // only update the active tour, if its not active dont update
    // Check if the current date is within the booking period
    const currentDate = new Date();
    if (
      !(
        currentDate >= tourExists.booking_start_date &&
        currentDate <= tourExists.booking_end_date
      )
    ) {
      responseUtils.sendFailureResponse(
        reply,
        "Cannot update Tour outside of the booking period",
      );
      return;
    }

    // Extract updated tour data from the request
    const { pickupLocations, categories, ...tourData } = req.body;
    let pickupLocationIds;
    let categoryIds;

    if (pickupLocations) {
      pickupLocationIds =
        pickupLocations?.map((location) => location.pickup_location_id) || [];
      const FindPickupLocations =
        await pickupLocationService.findMultiplePickupLocations(
          pickupLocationIds,
        );
    }

    if (categories) {
      categoryIds = categories?.map((category) => category.category_id) || [];
      const FindCategoriess =
        await categoryService.findMultipleCategories(pickupLocationIds);
    }

    const tour = await tourService.updateTour(tourId, tourData);

    if (pickupLocations) {
      tourService
        .setTourPickupLocations(tour, pickupLocationIds)
        .catch((error) => {
          console.error(`Failed to set pickup locations: ${error.message}`);
          errorMessages.push(
            "Failed to assosiate Pickup Locations, check the logs for details if needed",
          );
        });
    }

    if (categories) {
      tourService.setTourCategories(tour, categoryIds).catch((error) => {
        console.error(`Failed to set categories: ${error.message}`);
        errorMessages.push(
          "Failed to assosiate Categories, check the logs for details if needed",
        );
      });
    }

    // Combine error messages into a single message
    const errorMessage =
      errorMessages.length > 0 ? errorMessages.join(", ") : null;

    responseUtils.sendSuccessResponse(reply, tour, 201, errorMessage);
  } catch (error) {
    console.error(error);
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

// Delete a tour by ID
async function deleteActiveTour(req, reply) {
  const { tourId } = req.params;
  try {
    const tourExists = await tourService.getTourById(tourId);
    if (!tourExists) {
      responseUtils.sendNotFoundResponse(reply, "Tour not found");
      return;
    }
    // only delete the active tour, if its not active dont update
    const currentDate = new Date();
    if (
      !(
        currentDate >= tourExists.booking_start_date &&
        currentDate <= tourExists.booking_end_date
      )
    ) {
      responseUtils.sendFailureResponse(
        reply,
        "Cannot delete Tour outside of the booking period",
      );
      return;
    }

    const tour = await tourService.deleteTour(id);
    responseUtils.sendSuccessResponse(reply, tour);
  } catch (error) {
    console.error(error);
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function renewTour(req, reply) {
  let errorMessages = [];
  try {
    const { basicTourId } = req.params;
    // Check if the BasicTour exists
    const basicTour = await basicTourService.getBasicTourById(basicTourId);
    if (!basicTour) {
      return responseUtils.sendNotFoundResponse(reply, "BasicTour not found");
    }
    // Update the associated Tour record
    // Extract updated tour data from the request
    const { pickupLocations, categories, ...tourData } = req.body;
    const pickupLocationIds =
      pickupLocations?.map((location) => location.pickup_location_id) || [];
    const FindPickupLocations =
      await pickupLocationService.findMultiplePickupLocations(
        pickupLocationIds,
      );

    const categoryIds =
      categories?.map((category) => category.category_id) || [];
    const FindCategoriess =
      await categoryService.findMultipleCategories(pickupLocationIds);

    const tour = await tourService.createTour(tourData);
    await Promise.all([
      tourService
        .setTourPickupLocations(tour, pickupLocationIds)
        .catch((error) => {
          console.error(`Failed to set pickup locations: ${error.message}`);
          errorMessages.push(
            "Failed to assosiate Pickup Locations, check the logs for details if needed",
          );
        }),
      tourService.setTourCategories(tour, categoryIds).catch((error) => {
        console.error(`Failed to set categories: ${error.message}`);
        errorMessages.push(
          "Failed to assosiate Categories, check the logs for details if needed",
        );
      }),
    ]);

    // Combine error messages into a single message
    const errorMessage =
      errorMessages.length > 0 ? errorMessages.join(", ") : null;

    responseUtils.sendSuccessResponse(reply, tour, 201, errorMessage);

    responseUtils.sendSuccessResponse(reply, "Tour renewed successfully");
  } catch (error) {
    console.error(error);
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

module.exports = {
  createTour,
  getTour,
  updateActiveTour,
  deleteActiveTour,
  renewTour,
};
