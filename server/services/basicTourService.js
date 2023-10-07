const {Tour, BasicTour, PickupLocation, sequelize, Image, Category,Review } = require("../models");
const { Op } = require("sequelize");

async function createBasicTour(data) {
  return await BasicTour.create(data);
}

async function getBasicTourById(id) {
  return await BasicTour.findByPk(id, {
    include: [
      {
        model: Tour,
        as: "Tours",
        include: [Image],
        include: [
          {
            model: PickupLocation,
            through: "TourPickupLocations",
          },
        ],
      },
    ],
  });
}

async function getAllToursByBasicTour(id) {
  return await BasicTour.findAll({
    where: { basic_tour_id: id },
    include: [
      {
        model: Tour,
        as: "Tours",
        include: [Image],
        include: [
          {
            model: PickupLocation,
            through: "TourPickupLocations",
          },
        ],
      },
    ],
  });
}

async function updateBasicTour(id, data) {
  const [, updatedRows] = await BasicTour.update(data, {
    where: { basic_tour_id: id },
    returning: true,
  });

  const updatedTour = updatedRows[0].get({ plain: true });
  return updatedTour;
}

async function getLatestTourOfBasicTour(basicTourId) {
  try {
    const basicTour = await BasicTour.findByPk(basicTourId, {
      include: [
        {
          model: Tour,
          as: "Tours",
          // attributes: ['tour_id', 'createdAt'],
          order: [["createdAt", "DESC"]],
          limit: 1,
          include: [Image],
          include: [
            {
              model: PickupLocation,
              through: "TourPickupLocations",
            },
          ],
        },
      ],
    });
    if (!basicTour) {
      throw new Error("BasicTour not found");
    }

    return basicTour;
  } catch (error) {
    throw error;
  }
}

async function deleteBasicTour(id) {
  const tour = await getBasicTourById(id);
  await tour.destroy();
  return tour;
}

async function getAllBasicTours() {
  try {
    // Fetch all basic tours
    const toursWithLatestDetails = await BasicTour.findAll({
      include: [
        {
          model: Tour,
          as: "Tours",
          // attributes: ['tour_id', 'createdAt'],
          order: [["createdAt", "DESC"]],
          limit: 1,
          include: [
            {
              model: Image,
              as: "Images",
              attributes: ["url", "image_id"],
            },
            {
              model: PickupLocation,
              through: "TourPickupLocations",
              as: "PickupLocations",
            },
            {
              model: Category,
              as: "Categories",
            },
          ],
        },
      ],
    });

    return toursWithLatestDetails;
  } catch (error) {
    throw error;
  }
}

async function getAllActiveBasicTours() {
  try {
    // Fetch all active basic tours
    const toursWithLatestDetails = await BasicTour.findAll({
      include: [
        {
          model: Tour,
          as: 'Tours',
          include: [
            {
              model: Image,
              as: "Images",
              attributes: ["url", "image_id"],
            },
            {
              model: Image,
              as: "Images",
              attributes: ["url", "image_id"],
            },
            {
              model: Review,
              as: "Reviews",
            },
            {
              model: PickupLocation,
              through: "TourPickupLocations",
              as: "PickupLocations",
            },
            {
              model: Category,
              through: "TourCategories",
              as: "Categories",
            },
          ],
          order: [['createdAt', 'DESC']],
        },
      ],
      attributes: {
        include: [
          [
            sequelize.where(
              sequelize.literal(
                'CURRENT_DATE BETWEEN "Tours"."booking_start_date" AND "Tours"."booking_end_date"'
              ),
              true
            ),
            'isBookingOpen',
          ],
        ],
      },
    });

    return toursWithLatestDetails;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBasicTour,
  getBasicTourById,
  getLatestTourOfBasicTour,
  updateBasicTour,
  deleteBasicTour,
  getAllBasicTours,
  getAllToursByBasicTour,
  getAllActiveBasicTours,
};
