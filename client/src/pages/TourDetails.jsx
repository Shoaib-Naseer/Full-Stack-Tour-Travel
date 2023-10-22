import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import tourData from '../assets/data/tours';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';

import '../styles/tour-details.css';
import useFetch from '../hooks/useFetch';
import { baseUrl } from '../config';

const TourDetails = () => {
  const {id} = useParams();
  const {data: toursData, loading , error } = useFetch(`${baseUrl}tours/${id}`)
  const reviewMsgRef = useRef('');

  const formattedTour = {
    desc:toursData.description,
    location: toursData.location,
    reviews:toursData.Reviews,
    price:toursData.base_price,
  }

  const [tourRatings, setTourRatings] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);

  // Format date
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const photo = toursData.Images[0].url;
  const title = toursData.BasicTour.name;
  const { desc, price, reviews, location  } = formattedTour;

  // const { photo, title, desc, price, reviews, city:location, distance, address, maxGroupSize } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // Submit request to server
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    alert(`${reviewText} , ${tourRatings}`);
  };

  const handleStarClick = (rating) => {
    setTourRatings(rating);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour__content">
              <img src={photo} alt="" />

              <div className="tour__info">
                <h2>{title}</h2>

                <div className="d-flex align-items-center gap-5">
                  <span className="tour__rating | d-flex align-items-center gap-1">
                    <i className="ri-star-s-fill" style={{ color: 'var(--secondary-color)' }}></i>
                    {avgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? 'Not Rated' : <span>{reviews?.length}</span>}
                  </span>

                  {/* <span>
                    <i className="ri-map-pin-fill"></i> {address}
                  </span> */}
                </div>

                <div className="tour__extra-details | d-flex align-items-center">
                  <span>
                    <i className="ri-map-pin-2-line"></i> {location}
                  </span>
                  <span>
                    <i className="ri-money-dollar-circle-line"></i> $ {price} / per person
                  </span>
                  {/* <span>
                    <i className="ri-map-pin-time-line"></i> {distance} k/m
                  </span> */}
                  {/* <span>
                    <i className="ri-group-line"></i> {maxGroupSize}
                  </span> */}
                </div>
                <h5>Description</h5>
                <p>{desc}</p>
              </div>

              {/* Tour Review Section */}
              <div className="tour__reviews mt-4">
                <h4>Reviews ({reviews?.length} reviews)</h4>

                <Form onSubmit={submitHandler} className="d-flex flex-column gap-1">
                  <div className="rating__group | d-flex align-items-center gap-1 ps-3">
                    {[1, 2, 3, 4, 5].map((rating,index) => (
                      <span
                        key={rating}
                        onMouseEnter={() => setHoveredRating(rating)}
                        onMouseLeave={() => setHoveredRating(null)}
                        onClick={() => handleStarClick(rating)}
                        className={`rating__star ${
                          tourRatings && rating <= tourRatings && 'colorized'
                        } ${hoveredRating && index < hoveredRating && 'hovered' }`}>
                        <i className="ri-star-s-fill"></i>
                      </span>
                    ))}
                  </div>

                  <div className="review__input">
                    <input type="text" ref={reviewMsgRef} placeholder="share your thoughts" />
                    <button className="btn primary__btn text-white" type="submit">
                      Submit
                    </button>
                  </div>
                </Form>

                <ListGroup className="user__reviews">
                  {reviews?.map((review) => (
                    <div className="review__item" key={review.review_id}>
                      <img src={avatar} alt="user profile avatar" />
                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>Muhib</h5>
                            <p> {new Date(review.createdAt).toLocaleDateString('en-US', options)} </p>
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

          <Col lg="4" style={{padding: 0}}>
            <Booking tour={tour} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetails;
