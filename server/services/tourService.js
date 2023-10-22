const { Op } = require("sequelize");
const {
  Tour,
  Image,
  Category,
  PickupLocation,
  BasicTour,
  Review,
  User
} = require("../models");

async function createTour(tourData) {
  return await Tour.create(tourData);
}

async function setTourPickupLocations(tour, pickupLocationIds) {
  const pickupLocations = await PickupLocation.findAll({
    where: { pickup_location_id: { [Op.in]: pickupLocationIds } },
  });
  await tour.setPickupLocations(pickupLocations);
}

async function setTourCategories(tour, categoryIds) {
  const categories = await Category.findAll({
    where: { category_id: { [Op.in]: categoryIds } },
  });
  await tour.setCategories(categories);
}

async function getTourById(id) {
  return await Tour.findByPk(id, {
    include: [
      {
        model: Image,
        as: "Images",
        attributes: ["url", "image_id"],
      },
      { model: BasicTour, attributes: ["name"] },
      {
        model: PickupLocation,
        through: "TourPickupLocations",
        as: "PickupLocations",
      },
      {
        model: Review,
        as: "Reviews",
        include: [ 
          {
            model: User,
            as:"User"
          },
        ],
      },
    ],
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
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  setTourPickupLocations,
  setTourCategories,
};
