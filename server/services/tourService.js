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
  const createdTour = await Tour.create(tourData);
  return createdTour;
}

async function getTourById(id) {
  return await Tour.findByPk(id, {
    include: {
      model: Image,
      attributes: ["url", "image_id"],
    },
  });
}

async function updateTour(id, data) {
  const [, updatedRows] = await Tour.update(data, {
    where: { tour_id: id },
    returning: true,
  });

  const updatedTour = updatedRows[0].get({ plain: true });
  return updatedTour;
}

async function deleteTour(id) {
  const tour = await getTourById(id);
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
