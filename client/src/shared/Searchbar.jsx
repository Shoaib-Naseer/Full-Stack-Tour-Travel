import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { baseUrl } from "../config";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const locationRef = useRef("");
  const navigate = useNavigate();

  const searchHandler = async () => {
    if (!locationRef.current.value?.trim()) {
      alert("Please Fill out All Fields");
    }
    const location = locationRef.current.value;
    const res = await fetch(`${baseUrl}tours?location=${location}`);
    if (!res.ok) {
      alert("Something went wrong");
      return;
    }
    const result = await res.json();
    navigate(`/tours/search?location=${location}`, { state: result.data });
  };

  return (
    <Col>
      <div className="search__bar ">
        <Form className="d-flex p-2">
          <div className="d-flex flex-fill gap-3 form__group form__group-fast mb-md-0 ">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div className="flex-fill">
              <h6>Location</h6>
              <input
                className="w-100"
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </div>

          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default Searchbar;
