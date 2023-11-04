import React, { useContext, useEffect, useRef, useState } from "react";
import { baseUrl } from "../config";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "../styles/tour-details.css";
import { Col, Container, Row, Form, ListGroup } from "reactstrap";
import calculateAvgRating from "../utils/avgRating";
import Booking from "../components/Booking/Booking";
import { AuthContext } from "../context/AuthContext";
import { stripeApi } from "../config";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";


const TourInfo = () => {
  const [tourRatings, setTourRatings] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [hasBookedTour, setHasBookedTour] = useState(false);
  const { user } = useContext(AuthContext);

  const stripePromise = loadStripe(stripeApi);

  const { id } = useParams();
  const { data, loading, error } = useFetch(`${baseUrl}tours/${id}`);
  const { totalRating, avgRating } = calculateAvgRating(data.Reviews);

  useEffect(() => {
    fetch(`${baseUrl}bookings/hasBooking/${id}/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setHasBookedTour(data.hasBooked);
      })
      .catch((error) => {
        console.error("Error checking booking status:", error);
      });
  }, [id, user]);

  const handleStarClick = (rating) => {
    setTourRatings(rating);
  };
  const reviewMsgRef = useRef("");

  // Format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  // Submit request to server
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    alert(`${reviewText} , ${tourRatings}`);
  };

  return (
    <section>
      <Container>
        {data && data.Images && data.Images.length > 0 && (
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={data.Images[0].url} alt="" />

                <div className="tour__info">
                  <h2>{data.BasicTour.name}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating | d-flex align-items-center gap-1">
                      <i
                        className="ri-star-s-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not Rated"
                      ) : (
                        <span>{data.Reviews?.length}</span>
                      )}
                    </span>

                    {/* <span>
                    <i className="ri-map-pin-fill"></i> {address}
                  </span> */}
                  </div>
                  <div className="tour__extra-details | d-flex align-items-center">
                    <span>
                      <i className="ri-map-pin-2-line"></i> {data.location}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i> ${" "}
                      {data.base_price} / per person
                    </span>
                    {/* <span>
                    <i className="ri-map-pin-time-line"></i> {distance} k/m
                  </span> */}
                    {/* <span>
                    <i className="ri-group-line"></i> {maxGroupSize}
                  </span> */}
                  </div>
                  <h5>Description</h5>
                  <p>{data.description}</p>
                </div>
                {/* Tour Review Section */}
                <div className="tour__reviews mt-4">
                  <h4>Reviews ({data.Reviews?.length} reviews)</h4>
                  {hasBookedTour ? (
                    <Form
                      onSubmit={submitHandler}
                      className="d-flex flex-column gap-1"
                    >
                      <div className="rating__group | d-flex align-items-center gap-1 ps-3">
                        {[1, 2, 3, 4, 5].map((rating, index) => (
                          <span
                            key={rating}
                            onMouseEnter={() => setHoveredRating(rating)}
                            onMouseLeave={() => setHoveredRating(null)}
                            onClick={() => handleStarClick(rating)}
                            className={`rating__star ${
                              tourRatings &&
                              rating <= tourRatings &&
                              "colorized"
                            } ${
                              hoveredRating &&
                              index < hoveredRating &&
                              "hovered"
                            }`}
                          >
                            <i className="ri-star-s-fill"></i>
                          </span>
                        ))}
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="share your thoughts"
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  ) : (
                    <div>
                      Only Users who have booked the tour can submit
                      review/feedback
                    </div>
                  )}
                  <ListGroup className="user__reviews">
                    {data.Reviews?.map((review) => (
                      <div className="review__item" key={review.review_id}>
                        <img
                          src={review.User.profile_image}
                          alt="user profile avatar"
                        />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.User.userName}</h5>
                              <p>
                                {" "}
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-US",
                                  options,
                                )}{" "}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating} <i className="ri-star-s-fill"></i>
                            </span>
                          </div>

                          <h6>{review.comment}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>

            <Col lg="4" style={{ padding: 0 }}>
              <Elements stripe={stripePromise}>
                <Booking tour={data} avgRating={avgRating} />
              </Elements>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default TourInfo;
