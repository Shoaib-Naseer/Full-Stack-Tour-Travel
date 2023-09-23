const reviewService = require("../services/reviewService.js");
const bookingService = require("../services/bookingService");
const responseUtils = require("../utils/responseUtils");

async function createReview(req, reply) {
  try {
    const { userId: user_id } = req.user;
    const { tourId: tour_id } = req.params;
    const { rating, comment } = req.body;

    const hasBooked = await bookingService.getBookingByUserAndTour(
      user_id,
      tour_id,
    );

    if (!hasBooked) {
      responseUtils.sendFailureResponse(reply, "User has not booked this tour");
      return;
    }

    const review = await reviewService.createReview({
      user_id,
      tour_id,
      rating,
      comment,
    });
    return responseUtils.sendSuccessResponse(reply, review, 201);
  } catch (error) {
    return responseUtils.sendFailureResponse(reply, error.message);
  }
}
async function updateReview(req, reply) {
  try {
    const { tourId: tour_id, reviewId: review_id } = req.params;
    const { userId: user_id } = req.user;
    const { rating, comment } = req.body;

    const hasBooked = await bookingService.getBookingByUserAndTour(
      user_id,
      tour_id,
    );
    if (!hasBooked) {
      responseUtils.sendFailureResponse(
        reply,
        "User has not booked this tour",
        400,
      );
      return;
    }

    const review = await reviewService.getReviewById(review_id);
    if (!review) {
      responseUtils.sendFailureResponse(reply, "Review not Found", 400);
      return;
    }
    // Check if the user has already created a review for the tour
    const existingReview = await reviewService.getReviewByUserAndTour({
      user_id,
      tour_id,
      review_id,
    });

    if (!existingReview) {
      responseUtils.sendFailureResponse(
        reply,
        "User has not reviewed this tour",
        400,
      );
      return;
    }

    // Update the existing review
    const updatedReview = await reviewService.updateReview(
      existingReview.review_id,
      {
        rating,
        comment,
      },
    );

    responseUtils.sendSuccessResponse(reply, updatedReview);
  } catch (error) {
    return responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function getAllReviewsForTour(req, reply) {
  try {
    const { tourId } = req.params;
    const reviews = await reviewService.getAllReviewsForTour(tourId);
    responseUtils.sendSuccessResponse(reply, reviews);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function getAllReviewsForUser(req, reply) {
  try {
    const { userId } = req.params;
    const reviews = await reviewService.getAllReviewsForUser(userId);
    responseUtils.sendSuccessResponse(reply, reviews);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function getReviewById(req, reply) {
  try {
    const { reviewId } = req.params;
    const review = await reviewService.getReviewById(reviewId);

    if (!review) {
      responseUtils.sendNotFoundResponse(reply, "Review not found");
      return;
    }

    responseUtils.sendSuccessResponse(reply, review);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function getAllReviews(req, reply) {
  try {
    const reviews = await reviewService.getAllReviews();
    responseUtils.sendSuccessResponse(reply, reviews);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

async function deleteReview(req, reply) {
  try {
    const { userId: user_id, role_id } = req.user; 

    const { reviewId } = req.params;

    const reviewExists = await reviewService.getReviewById(reviewId);

    if (!reviewExists) {
      responseUtils.sendNotFoundResponse(reply, "Review not found");
      return;
    }
    if (review.user_id !== user_id || role_id !== 1) {
      responseUtils.sendFailureResponse(
        reply,
        "You are not authorized to delete this review",
        403 
      );
      return;
    }
    const review = await reviewService.deleteReview(reviewId);

    responseUtils.sendSuccessResponse(
      reply,
      review
    );
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}


module.exports = {
  createReview,
  getAllReviewsForTour,
  getAllReviewsForUser,
  getReviewById,
  updateReview,
  getAllReviews,
  deleteReview
};
