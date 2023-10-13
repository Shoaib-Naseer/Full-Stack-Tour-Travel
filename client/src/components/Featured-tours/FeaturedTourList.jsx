import React from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { baseUrl } from "../../config";

const FeaturedTourList = () => {
  const { data: FeaturedTours , loading , error } = useFetch(`${baseUrl}tours`);

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
    {loading && <h4> Loading ..... </h4>}
    {error && <h4> {error} </h4>}
      {!loading && !error && toursData?.map((tour, index) => {
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
