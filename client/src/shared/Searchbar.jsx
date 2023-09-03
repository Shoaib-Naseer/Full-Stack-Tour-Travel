import React, { useRef } from 'react';
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';

const Searchbar = () => {

    const locationRef = useRef('');
    const distanceRef = useRef(0);
    const maxPeopleRef = useRef(0);

  const searchHandler = () => {
    if (
      !locationRef.current.value?.trim() ||
      distanceRef.current.value === null ||
      maxPeopleRef.current.value === null
    ) {
      alert('Please Fill out All Fields');
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar ">
        <Form className="d-md-flex align-items-md-center lg:gap-4 lg:p-2">
          <div className="d-flex gap-3 form__group form__group-fast mb-4 mb-md-0 " >
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input type="text" placeholder="Where are you going?" ref={locationRef} />
            </div>
          </div>

          <div className="d-flex gap-3 form__group form__group-fast mb-4 mb-md-0 " >
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Distance</h6>
              <input type="text" placeholder="Distance k/m" ref={distanceRef} />
            </div>
          </div>

          <div className="d-flex gap-3 form__group form__group-fast mb-4 mb-md-0 " >
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxPeopleRef} />
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
