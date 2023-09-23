const Booking = require("../models/Booking");
const Tour = require("../models/Tour");

async function checkTourLimit(tour_id, group_size) {
  try {
    const totalGroupSize = await Booking.sum("group_size", {
      where: { tour_id },
    });
    const tour = await Tour.findByPk(tour_id);
    if (!tour) {
      throw new Error("Tour not Found while checking the group-size limit");
    }
    if (totalGroupSize + group_size < tour.limit) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createBooking(bookingData) {
  try {
    const booking = await Booking.create(bookingData);
    return booking;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getBookingsForTour(tourId) {
  try {
    const bookings = await Booking.findAll({
      where: { tour_id: tourId },
      include: [User, Tour, Payment],
    });
    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getBookingsForUser(userId) {
  try {
    const bookings = await Booking.findAll({
      where: { user_id: userId },
      include: [User, Tour, Payment],
    });
    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllBookings() {
  try {
    const bookings = await Booking.findAll({ include: [User, Tour, Payment] });
    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getBookingByUserAndTour(userId, tourId) {
  try {
    const booking = await Booking.findOne({
      where: { user_id: userId, tour_id: tourId },
      include: [User, Tour, Payment],
    });
    return booking;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  checkTourLimit,
  createBooking,
  getBookingsForTour,
  getBookingsForUser,
  getAllBookings,
  getBookingByUserAndTour,
};
