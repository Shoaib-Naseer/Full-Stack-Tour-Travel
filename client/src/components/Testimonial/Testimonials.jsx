import React from 'react'
import Slider from 'react-slick';

import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 3000,
        swipeToSlide: true,
        autoplay: true,
      speed: 5000,
      autoplaySpeed: 1000,
      cssEase: "linear",
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
            },
          },
        ],
      };
  return (
    <Slider {...settings}>
        <div className="testimonial | py-4 px-3">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Quis magni ipsa velit aliquid itaque ad blanditiis minima maxime delectus maiores 
                voluptate aliquam repellendus, placeat tenetur earum! Nesciunt vero saepe assumenda?
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} alt='slider-img' className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className='mb-0 mt-3'>John Doe</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>

        <div className="testimonial | py-4 px-3">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Quis magni ipsa velit aliquid itaque ad blanditiis minima maxime delectus maiores 
                voluptate aliquam repellendus, placeat tenetur earum! Nesciunt vero saepe assumenda?
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02} alt='slider-img' className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className='mb-0 mt-3'>John Doe</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>

        <div className="testimonial | py-4 px-3">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Quis magni ipsa velit aliquid itaque ad blanditiis minima maxime delectus maiores 
                voluptate aliquam repellendus, placeat tenetur earum! Nesciunt vero saepe assumenda?
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03} alt='slider-img' className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className='mb-0 mt-3'>John Doe</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>

        <div className="testimonial | py-4 px-3">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Quis magni ipsa velit aliquid itaque ad blanditiis minima maxime delectus maiores 
                voluptate aliquam repellendus, placeat tenetur earum! Nesciunt vero saepe assumenda?
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} alt='slider-img' className='w-25 h-25 rounded-2' />
                <div>
                    <h6 className='mb-0 mt-3'>John Doe</h6>
                    <p>Customer</p>
                </div>
            </div>
        </div>
    </Slider>
  )
}

export default Testimonials