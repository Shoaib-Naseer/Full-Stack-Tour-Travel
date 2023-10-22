import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import "./tour-card.css";
import { fastifyBaseUrl } from "../config";

const TourCard = ({ tour }) => {
  const { id, title, isBookingOpen: featured } = tour;
  const {
    description,
    location: city,
    base_price: price,
    booking_end_date: bookinglastDate,
  } = tour.Tours[0];
  const reviews = tour.Tours[0].Reviews;
  const { url: photo } = tour.Tours[0].Images[0];

  // const { id, title, city, photo, price, featured, reviews } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className="tour__card | mb-4">
      <Card>
        <div className="tour__img">
          <img src={`${photo}`} alt="tour-img" />
          <span>{featured}</span>
        </div>

        <CardBody>
          <div className="card__top | d-flex align-items-center justify-content-between">
            <span className="tour__location | d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i>
              {city}
            </span>

            <span className="tour__rating | d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? "Not Rated" : <span>{reviews.length}</span>}
            </span>
          </div>
          <h5 className="tour__title">
            <Link to={`/tours/${id}`}>{title}</Link>
          </h5>

          <div className="card-bottom | lg:d-flex lg:align-items-center lg:justify-content-between mt-3">
            <h5>
              ${price} <span> /per person</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`tours/${id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
