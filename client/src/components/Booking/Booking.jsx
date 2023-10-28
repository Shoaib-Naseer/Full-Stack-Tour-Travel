import React, { useContext, useState } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Booking = ({ tour, avgRating }) => {
    
  const { base_price:price, Reviews:reviews } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [credentials,setCredentials] = useState({
    userId:user.id,
    userEmail:user.email,
    fullName:user.userName,
    phone:'',
    guestSize:1,
    bookAt:''
  })  

  const serviceFee = 10
  const totalPrice = Number(price) * Number(credentials.guestSize) + Number(serviceFee)

  const handleChange = e => {
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
  }
  //   send data to server
  const handleClick = e=>{
    e.preventDefault()
    console.log(credentials)
    // navigate('/thank-you')
  }

  return (
    <div className="booking">
      <div className="booking__top | d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour__rating | d-flex align-items-center">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h6>Information</h6>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              onChange={handleChange}
              value={credentials.fullName}
              type="text"
              id="fullName"
              placeholder="Full Name"
              required
            />
          </FormGroup>
          <FormGroup>
            <input onChange={handleChange} type="number" id="phone" placeholder="Phone" required />
          </FormGroup>
          <FormGroup className="d-flex gap-2">
            <input onChange={handleChange} type="date" id="bookAt" required />
            <input
              onChange={handleChange}
              type="text"
              id="guestSize"
              placeholder="Guest"
              required
            />
          </FormGroup>
        </Form>

        <div className="booking__bottom | mt-2">
            <ListGroup>
            <ListGroupItem className="border-0 px-0 ">
            <h5 className='d-flex justify-content-between gap-1'>${price} <i className='ri-close-line'></i> 1 person</h5>
            <span>${price}</span>
        </ListGroupItem>
        <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
        </ListGroupItem>
        <ListGroupItem className="border-0 px-0 total__container fw-bold">
            <h5>Total</h5>
            <span>${totalPrice}</span>
        </ListGroupItem>
        <button className="btn primary__btn | text-white w-100 mt-4" onClick={handleClick}>Book Now</button>
      
            </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default Booking;
