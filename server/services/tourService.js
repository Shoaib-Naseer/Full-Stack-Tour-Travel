const { Tour, Image } = require("../models");

async function getAllTours() {
  return await Tour.findAll({
    include: {
      model: Image,
      attributes: ["url", "image_id"],
    },
  });
}

async function createTour(tourData) {
  try {
    const createdTour = await Tour.create(tourData);
    return createdTour;
  } catch (error) {
    throw new Error(`Failed to create tour: ${error.message}`);
  }
}

async function getTourById(id) {
  return await Tour.findByPk(id, {
    include: {
      model: Image,
      attributes: ["url"],
    },
  });
}

async function updateTour(id, tourData) {
  const tour = await getTourById(id);
  if (!tour) {
    return null;
  }
  return await tour.update(tourData);
}

async function deleteTour(id) {
  const tour = await getTourById(id);
  if (!tour) {
    return null;
  }
  await tour.destroy();
  return tour;
}

module.exports = {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
};
