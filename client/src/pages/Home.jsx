import React from 'react';
import '../styles/home.css';

import { Container, Row, Col } from 'reactstrap';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';
import experienceImg from '../assets/images/experience.png';

import Subtitle from '../shared/Subtitle';
import Searchbar from '../shared/Searchbar';

import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImageGallery from '../components/image-gallery/MasonryImageGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import NewsLetter from '../shared/NewsLetter';

const Home = () => {
  const [serviceRef, serviceInView] = useInView({
    triggerOnce: false, // Animation triggers only once when element comes into view
    threshold: 0.7 // Percentage of element's visibility to trigger
  });

  const [heroRef, heroInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <>
      {/* Hero section start */}
      <motion.section
      ref={heroRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: heroInView ? 1 : 0 }}
        transition={{ duration: 1 }}>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle | d-flex align-items-center">
                  <Subtitle subtitle={'know Before You Go'} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Traveling Opens the door to creating
                  <span className="highlight"> memories</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nisi officiis
                  error, beatae assumenda alias quod accusantium, est nemo non qui consequuntur quam
                  reprehenderit similique mollitia voluptate dolore dicta consequatur?
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box | mt-4">
                <video controls>
                  <source src={heroVideo} alt="" />
                </video>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box | mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>

            <Searchbar />
          </Row>
        </Container>
      </motion.section>
      {/* Hero section End */}

      {/* Services section start */}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <motion.div
                ref={serviceRef}
                initial={{ x: -150 }} // Initial position (left side of the screen)
                animate={{ x: serviceInView ? 0 : 0 }} // Animate to default (0) when inView is true
                transition={{ duration: .5 , type:'spring' , stiffness:120 }}>
                <h5 className="services_subtitle">What we serve</h5>
                <h2 className="services__title">We Offer our best services</h2>
              </motion.div>
            </Col>

            <ServiceList />
          </Row>
        </Container>
      </section>
      {/* Services section End */}

      {/* Featured Tour Section Start */}

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={'Explore'} />
              <h2 className="featured__tour-title">Our featured tours</h2>
            </Col>

            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* Featured Tour Section End */}

      {/* Experience Section Start */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={'Experiennce'} />

                <h2>
                  With all our experience <br />
                  we will serve you
                </h2>

                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  <br />
                  Dolor possimus cumque eius dolorem corrupti saepe quaerat minima.
                </p>

                <div className="counter__wrapper | d-flex gap-sm-4 align-items-center">
                  <div className="counter__box">
                    <span>12K+</span>
                    <h6>Successful trips</h6>
                  </div>
                  <div className="counter__box">
                    <span>2K+</span>
                    <h6>Regular Clients</h6>
                  </div>
                  <div className="counter__box">
                    <span>15+</span>
                    <h6>years Experience</h6>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Experience Section Start */}

      {/* Gallery Section Start */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={'Gallery'} />
              <h2 className="gallery__title">Visit our customers tour gallery</h2>
            </Col>
            <Col lg="12">
              <MasonryImageGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonial Sections */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={'Fans love'} />
              <h2 className="testimonial__title">What our fans say about us</h2>
              <p>Testimonials</p>
            </Col>

            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>

      {/* NewsLetter Sections */}
      <NewsLetter />
    </>
  );
};

export default Home;
