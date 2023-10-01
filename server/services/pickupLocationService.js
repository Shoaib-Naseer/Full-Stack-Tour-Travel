// services/pickupLocationService.js
const { Op } = require("sequelize");
const { PickupLocation } = require("../models");

// Create a new pickup location
async function createPickupLocation(data) {
  return await PickupLocation.create(data);
}

// Update an existing pickup location by ID
async function updatePickupLocation(id, data) {
  try {
    const [, updatedRows] = await PickupLocation.update(data, {
      where: { id },
      returning: true,
    });

    if (updatedRows.length === 0) {
      throw new Error("Pickup Location not found");
    }

    return updatedRows[0].get({ plain: true });
  } catch (error) {
    throw error;
  }
}

// Delete a pickup location by ID and return the deleted record
async function deletePickupLocation(id) {
  const pickupLocation = await PickupLocation.findByPk(id);
  return pickupLocation;
}

// Find a pickup location by ID
async function findPickupLocationById(id) {
  return await PickupLocation.findByPk(id);
}

// Find all pickup locations
async function findAllPickupLocations() {
  return await PickupLocation.findAll();
}

// Find multiple pickup locations by their IDs
async function findMultiplePickupLocations(ids) {
    return await PickupLocation.findAll({
      where: { pickup_location_id: { [Op.in]: ids } },
    });
  }

// Delete all pickup locations
async function deleteAllPickupLocations() {
  try {
    await PickupLocation.destroy({ truncate: true });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPickupLocation,
  updatePickupLocation,
  deletePickupLocation,
  findPickupLocationById,
  findAllPickupLocations,
  findMultiplePickupLocations,
  deleteAllPickupLocations,
};
