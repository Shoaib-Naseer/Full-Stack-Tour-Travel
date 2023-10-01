const userService = require("../services/userService");
const tourService = require("../services/tourService");
const paymentService = require("../services/paymentService");
const responseUtils = require("../utils/responseUtils");


async function createBooking(req, reply) {
  try {
    const { tour_id } = req.params;
    const { group_size, payment_id, user_id } = req.body;

    // Step 1: Verify that the user exists
    const user = await userService.getUserById(user_id);
    if (!user) {
      return reply
        .status(400)
        .json({ message: "failure", error: "User does not exist" });
    }

    // Step 2: Verify that the tour exists
    const tourExists = await tourService.getTourById(tour_id);
    if (!tourExists) {
      return reply
        .status(400)
        .json({ message: "failure", error: "Tour does not exist" });
    }

    // Step 3: Verify tour limit does not exceed
    const isTourLimitExceeded = await bookingService.checkTourLimit(
      tour_id,
      group_size,
    );
    if (isTourLimitExceeded) {
      return reply
        .status(400)
        .json({ message: "failure", error: "Tour limit exceeded" });
    }

    // Step 4: Verify payment
    const isPaymentValid = await paymentService.getPaymentById(payment_id);
    if (!isPaymentValid) {
      return reply
        .status(400)
        .json({ message: "failure", error: "Invalid payment" });
    }

    // Create booking
    const bookingData = { group_size, payment_id, tour_id, user_id };
    const booking = await BookingService.createBooking(bookingData);

    return reply.status(201).json({ message: "success", data: { booking } });
  } catch (error) {
    return responseUtils.sendFailureResponse(reply, error.message);
  }
}

// Function to get all bookings for a specific tour
async function getBookingsForTour(req, reply) {
  try {
    const { tourId } = req.params;
    const bookings = await BookingService.getBookingsForTour(tourId);
    return reply.status(200).json({ message: "success", data: { bookings } });
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

// Function to get all bookings for a specific user
async function getBookingsForUser(req, reply) {
  try {
    const { userId } = req.params;
    const bookings = await BookingService.getBookingsForUser(userId);
    return reply.status(200).json({ message: "success", data: { bookings } });
  } catch (error) {
    return reply.status(400).json({ message: "failure", error: error.message });
  }
}

// Function to get all bookings
async function getAllBookings(req, reply) {
  try {
    const bookings = await BookingService.getAllBookings();
    return reply.status(200).json({ message: "success", data: { bookings } });
  } catch (error) {
    return reply.status(400).json({ message: "failure", error: error.message });
  }
}

// Function to get a specific booking based on user and tour ID
async function getBookingByUserAndTour(req, reply) {
  try {
    const { userId } = req.params;
    const { tourId } = req.params;
    const booking = await BookingService.getBookingByUserAndTour(
      userId,
      tourId,
    );

    if (!booking) {
      return reply
        .status(404)
        .json({ message: "failure", error: "Booking not found" });
    }

    return reply.status(200).json(booking);
  } catch (error) {
    return reply.status(400).json({ message: "failure", error: error.message });
  }
}

module.exports = {
  createBooking,
  getBookingsForTour,
  getBookingsForUser,
  getAllBookings,
  getBookingByUserAndTour,
};
