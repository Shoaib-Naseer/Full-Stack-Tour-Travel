import React from 'react';
import './news-letter.css';

import { Container, Row, Col } from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';

const NewsLetter = () => {
  return (
    <section className="newsletter__section">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>
                Subscribe now to get useful traveling information
              </h2>
              <div className="newsletter__form | d-flex justify-content-between align-items-center gap-2">
                <input type="email" placeholder="Enter your Email" />
                <span className="newsletter__btn">Subscribe</span>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint nesciunt beatae
                cupiditate quibusdam amet nisi? Quae consequuntur deserunt earum.
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="a tourist" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewsLetter;
