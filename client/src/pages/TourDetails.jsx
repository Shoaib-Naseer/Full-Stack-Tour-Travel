import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import tourData from '../assets/data/tours';
import { Container, Row, Col,Form, ListGroup } from 'reactstrap';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking';

import '../styles/tour-details.css'

const TourDetails = () => {
  const { id } = useParams();

  const reviewMsgRef = useRef("");
  const [tourRatings,setTourRatings] = useState(null)

  const tour = tourData.find((tour) => tour.id === id);
  // Format date
  const options = {day: "numeric", month : 'long', year:"numeric"}

  const { photo, title, desc, price, reviews, city, distance, address, maxGroupSize } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // Submit request to server
  const submitHandler = e =>{
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    alert(`${reviewText} , ${tourRatings}`)
  }

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
                    {calculateAvgRating === 0 ? null : avgRating}
                    {totalRating === 0 ? 'Not Rated' : <span>{reviews?.length}</span>}
                  </span>

                  <span>
                    <i className="ri-map-pin-fill"></i> {address}
                  </span>
                </div>

                <div className="tour__extra-details | d-flex align-items-center">
                  <span>
                    <i className="ri-map-pin-2-line"></i> {city}
                  </span>
                  <span>
                    <i className="ri-money-dollar-circle-line"></i> $ {price} / per person
                  </span>
                  <span>
                    <i className="ri-map-pin-time-line"></i> {distance} k/m
                  </span>
                  <span>
                    <i className="ri-group-line"></i> {maxGroupSize}
                  </span>
                </div>
                <h5>Description</h5>
                <p>{desc}</p>
              </div>

              {/* Tour Review Section */}
              <div className="tour__reviews mt-4">
                <h4>Reviews ({reviews?.length} reviews)</h4>

                <Form onSubmit={submitHandler}>
                  <div className="rating__group | d-flex align-items-center gap-3">
                    <span onClick={setTourRatings(1)}>1 <i className="ri-star-s-fill"></i></span>
                    <span onClick={setTourRatings(2)}>2 <i className="ri-star-s-fill"></i></span>
                    <span onClick={setTourRatings(3)}>3 <i className="ri-star-s-fill"></i></span>
                    <span onClick={setTourRatings(4)}>4 <i className="ri-star-s-fill"></i></span>
                    <span onClick={setTourRatings(5)}>5 <i className="ri-star-s-fill"></i></span>
                  </div>

                  <div className="review__input">
                    <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' />
                    <button className='btn primary__btn text-white' type='submit'>Submit</button>
                  </div>
                </Form>

                <ListGroup className='user__reviews'>
                  {
                    reviews?.map(review=>(
                      <div className="review__item">
                        <img src={avatar} alt="user profile avatar" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>Muhib</h5>
                              <p> {new Date('08-31-2023').toLocaleDateString("en-US",options)} </p>
                            </div>
                            <span className="d-flex align-items-center">
                              5 <i className="ri-star-s-fill"></i>
                            </span>
                          </div>

                          <h6>Amazing tour</h6>
                        </div>
                      </div>
                    ))
                  }
                </ListGroup>
              </div>
            </div>
          </Col>

          <Col lg='4'>
            <Booking tour={tour} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetails;
