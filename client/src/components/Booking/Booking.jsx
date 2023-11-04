import React, { useContext, useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { baseUrl } from "../../config";

const Booking = ({ tour, avgRating }) => {
  const { base_price: price, Reviews: reviews, basic_tour_id:tourId } = tour;
  
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const elements = useElements();
  const stripe = useStripe();

  const [credentials, setCredentials] = useState({
    userId: user.id,
    userEmail: user.email,
    fullName: user.userName,
    address:"",
    phone: "",
    guestSize: 1,
  });

  const serviceFee = 10;
  const totalPrice =
    Number(price) * Number(credentials.guestSize) + Number(serviceFee);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  //   send data to server
  const handleClick = async (e) => {
    e.preventDefault();
    const {paymentMethod,error} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    
    if(!paymentMethod){
      alert("Card Verification Failed")
      return
    }

    const requestData = {
      amount:totalPrice,
      id: paymentMethod.id
    };

    fetch(`${baseUrl}payment/${tourId}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData), 
    })
      .then((response) => response.json())
      .then((data) => {
        setHasBookedTour(data.hasBooked);
      })
      .catch((error) => {
        console.error("Error checking booking status:", error);
      });
    // navigate('/thank-you')
  };

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "black",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "black" },
        "::placeholder": { color: "black" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "black",
      },
      Input: {
        display: "block",
      },
    },
    hidePostalCode: true,
  };

  const cardElementStyle = {
    base: {
      width: "100%",
      display: "block",
      margin: "8px 0",
    },
  };

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
            <input
              onChange={handleChange}
              type="number"
              id="phone"
              placeholder="Phone"
              required
            />
          </FormGroup>
          <FormGroup>
            <input
              onChange={handleChange}
              value={credentials.userEmail}
              type="email"
              id="userEmail"
              placeholder="Full Name"
              required
            />
          </FormGroup>
          <FormGroup>
            <input
              onChange={handleChange}
              type="text"
              id="address"
              placeholder="Address"
              required
            />
          </FormGroup>
          <FormGroup className="d-flex gap-2">
            <input
              onChange={handleChange}
              type="text"
              id="guestSize"
              placeholder="Guest"
              required
            />
          </FormGroup>
          <CardElement options={CARD_OPTIONS} style={cardElementStyle} />
        </Form>

        <div className="booking__bottom | mt-2">
          <ListGroup>
            <ListGroupItem className="border-0 px-0 ">
              <h5 className="d-flex justify-content-between gap-1">
                ${price} <i className="ri-close-line"></i> 1 person
              </h5>
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
            <button
              className="btn primary__btn | text-white w-100 mt-4"
              onClick={handleClick}
            >
              Book Now
            </button>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default Booking;
