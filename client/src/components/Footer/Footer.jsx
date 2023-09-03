import React from 'react'
import './footer.css'

import { Container , Row , Col, ListGroup , ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png';

const nav__links = [
  {
    path:"/home",
    display:"Home"
  },
  {
    path:"/about",
    display:"About"
  },
  {
    path:"/tours",
    display:"Tours"
  }
]

const quick__links = [
  {
    path:"/home",
    display:"Home"
  },
  {
    path:"/about",
    display:"About"
  },
  {
    path:"/tours",
    display:"Tours"
  }
]

const quick__links2 = [
  {
    path:"/gallery",
    display:"Gallery"
  },
  {
    path:"/login",
    display:"Login"
  },
  {
    path:"/register",
    display:"Register"
  }
]

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3'>
            <div className="logo">
              <img src={logo} alt="" />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Commodi, sint.</p>

              <div className="social__links | d-flex flex-row gap-4 align-items-center">
                <span>
                  <Link to="#"><i className="ri-youtube-line"></i></Link>
                </span>
                <span>
                  <Link to="https://github.com/Shoaib-Naseer"><i className="ri-github-line"></i></Link>
                </span>
                <span>
                  <Link to="#"><i className="ri-facebook-circle-line"></i></Link>
                </span>
                <span>
                  <Link to="#"><i className="ri-instagram-line"></i></Link>
                </span>
              </div>

            </div>
          </Col>
          <Col sm='6' lg='3' className='mt-4 mt-lg-0'>
            <h5 className="footer__link-title">
              Discover
            </h5>
            <ListGroup className='footer__quick-links'>
              {nav__links.map((item,index)=>(
                <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}

            </ListGroup>
          </Col>
          <Col sm='6' lg='3' className='mt-4 mt-lg-0'>
          <h5 className="footer__link-title">
              Quick Links
            </h5>
            <ListGroup className='footer__quick-links'>
              {quick__links2.map((item,index)=>(
                <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}

            </ListGroup>
          </Col>
          <Col lg='3' className='mt-4 mt-lg-0'>
            <h5 className="footer__link-title">
              Contact
            </h5>
            <ListGroup className='footer__quick-links'>
                <ListGroupItem className='border-0 ps-0 d-flex align-items-center gap-3'>
                  <h6 className="mb-0 d-flex align-items-center gap-2">
                    <span>
                      <i className="ri-map-pin-line"></i>
                    </span>
                    Address:
                  </h6>
                  <p className='mb-0'>Isb, Pakistan</p>
                </ListGroupItem>

                <ListGroupItem className='border-0 ps-0 d-flex align-items-center gap-3'>
                  <h6 className="mb-0 d-flex align-items-center gap-2">
                    <span>
                      <i className="ri-mail-line"></i>
                    </span>
                    Email:
                  </h6>
                  <p className='mb-0'>johndoe@gmail.com</p>
                </ListGroupItem>

                <ListGroupItem className='border-0 ps-0 d-flex align-items-center gap-3'>
                  <h6 className="mb-0 d-flex align-items-center gap-2">
                    <span>
                      <i className="ri-phone-line"></i>
                    </span>
                    Phone:
                  </h6>
                  <p className='mb-0'>+92 313 0159150</p>
                </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg='12' className='text-center pt-5 m-0'>
              <p className="copyright">
                Copyright {year} , design and develop by Shoaib Naseer. All rights reserved
                </p>  
          </Col>
        </Row>
      </Container>

    </footer>
  )
}

export default Footer