const Review = require("../models/Review");

async function createReview({ user_id, tour_id, rating, comment }) {
  return Review.create({ user_id, tour_id, rating, comment });
}

async function getAllReviewsForTour(tourId) {
  return Review.findAll({
    where: { tour_id: tourId },
  });
}

async function getAllReviewsForUser(userId) {
  return Review.findAll({
    where: { user_id: userId },
  });
}

async function getReviewByUserAndTour({ user_id, tour_id, review_id }) {
  return Review.findAll({
    where: { user_id, tour_id, review_id },
  });
}

async function getReviewById(reviewId) {
  return Review.findByPk(reviewId);
}

async function getAllReviews() {
  return Review.findAll();
}

async function deleteReview(reviewId) {
  const review = await Review.findByPk(reviewId);

  if (!review) {
    throw new Error("Review not found");
  }

  await review.destroy();
  return review;
}
module.exports = {
  getAllReviewsForTour,
  getAllReviewsForUser,
  getReviewById,
  createReview,
  getAllReviews,
  getReviewByUserAndTour,
  deleteReview
};
