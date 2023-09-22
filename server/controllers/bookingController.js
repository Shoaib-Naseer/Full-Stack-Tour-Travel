const userService = require("../services/userService");
const tourService = require("../services/tourService");
const paymentService = require("../services/paymentService");

async function createBooking(req, res) {
  try {
    const {tour_id} = req.params
    const { group_size, payment_id, user_id } = req.body;

    // Step 1: Verify that the user exists
    const user = await userService.getUserById(user_id);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Step 2: Verify that the tour exists
    const tourExists = await tourService.getTourById(tour_id);
    if (!tourExists) {
      return res.status(400).json({ error: "Tour does not exist" });
    }

    // Step 3: Verify tour limit does not exceed
    const isTourLimitExceeded = await bookingService.checkTourLimit(
      tour_id,
      group_size,
    );
    if (isTourLimitExceeded) {
      return res.status(400).json({ error: "Tour limit exceeded" });
    }

    // Step 4: Verify payment
    const isPaymentValid = await paymentService.getPaymentById(payment_id);
    if (!isPaymentValid) {
      return res.status(400).json({ error: "Invalid payment" });
    }

    // Create booking
    const bookingData = { group_size, payment_id, tour_id, user_id };
    const booking = await BookingService.createBooking(bookingData);

    return res
      .status(201)
      .json({ message: "success", booking });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Booking creation failed", details: error.message });
  }
}

// Function to get all bookings for a specific tour
async function getBookingsForTour(req, res) {
    try {
      const {tourId} = req.params;
      const bookings = await BookingService.getBookingsForTour(tourId);
      return res.status(200).json({ message: "success", bookings });
    } catch (error) {
      return res.status(400).json({ error: 'Failed to fetch bookings', details: error.message });
    }
  }

  // Function to get all bookings for a specific user
async function getBookingsForUser(req, res) {
    try {
      const {userId} = req.params; 
      const bookings = await BookingService.getBookingsForUser(userId);
      return res.status(200).json({ message: "success", bookings });
    } catch (error) {
      return res.status(400).json({ error: 'Failed to fetch bookings', details: error.message });
    }
  }

// Function to get all bookings
async function getAllBookings(req, res) {
    try {
      const bookings = await BookingService.getAllBookings();
      return res.status(200).json({ message: "success", bookings });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch bookings', details: error.message });
    }
  }

  // Function to get a specific booking based on user and tour ID
async function getBookingByUserAndTour(req, res) {
    try {
      const {userId} = req.params; 
      const {tourId} = req.params; 
      const booking = await BookingService.getBookingByUserAndTour(userId, tourId);
  
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch booking', details: error.message });
    }
  }

module.exports = {
    createBooking,
    getBookingsForTour,
    getBookingsForUser,
    getAllBookings,
    getBookingByUserAndTour
  };
  