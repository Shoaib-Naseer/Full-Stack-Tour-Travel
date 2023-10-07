import React from "react";
import TourCard from "../../shared/TourCard";
import tourData from "../../assets/data/tours";
import { Col } from "reactstrap";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../config";

const FeaturedTourList = () => {
  const { data: FeaturedTours } = useFetch(`${BASE_URL}/tours`);

  const formatData = (toursData) => {
    const formattedData = [];
    for (const tourData of toursData) {
      const formattedTour = {
        id: tourData.basic_tour_id,
        title: tourData.name,
        isBookingOpen: tourData.isBookingOpen,
        Tours: tourData.Tours.map((tour) => ({
          id: tour.tour_id,
          description: tour.description,
          location: tour.location,
          base_price: tour.base_price,
          limit: tour.limit,
          booking_end_date: tour.booking_end_date,
          Images: tour.Images.map((image) => ({
            url: image.url,
            image_id: image.image_id,
          })),
          Reviews: tour.Reviews.map((review) => ({
            id: review.review_id,
            rating: review.rating,
            tour_id: review.tour_id,
            user_id: review.user_id,
            comment: review.comment,
          })),
          PickupLocations: tour.PickupLocations.map((pickup) => ({
            id: pickup.pickup_location_id,
            city: pickup.city,
            address: pickup.address,
          })),
          Categories: tour.Categories.map((category) => ({
            id: category.category_id,
            name: category.name,
          })),
        })),
      };

      formattedData.push(formattedTour);
    }

    return formattedData;
  };
  const toursData = formatData(FeaturedTours);

  return (
    <>
      {toursData.map((tour, index) => {
        return (
          <Col lg="3" className="mb-4" key={tour.id}>
            <TourCard tour={tour} />
          </Col>
        );
      })}
    </>
  );
};

export default FeaturedTourList;
