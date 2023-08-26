import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';
import './service-list.css';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData = [
  {
    imgUrl: weatherImg,
    title: 'Calculate Weather',
    desc: 'lorem ipsum dolor sit amet,  consectetur adipiscing elit'
  },
  {
    imgUrl: guideImg,
    title: 'Best Tour Guide',
    desc: 'lorem ipsum dolor sit amet,  consectetur adipiscing elit'
  },
  {
    imgUrl: customizationImg,
    title: 'Customization',
    desc: 'lorem ipsum dolor sit amet,  consectetur adipiscing elit'
  }
];

const ServiceList = () => {
  return (
    <>
      <AnimatePresence>
        {servicesData.map((item, index) => {
          const [ref, inView] = useInView({
            triggerOnce: false,
            threshold: 0.7
          });
          return (
            <Col lg="3">
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: -20 }} // Initial opacity and y position (fade-in from below)
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }} // Fade-in when inView is true
                transition={{ duration: 0.5, delay: index * 0.2 }} // Delay each card's animation
                exit={{ opacity: 0, y: 20 }} // Exit animation if needed
              >
                <ServiceCard item={item} />
              </motion.div>
            </Col>
          );
        })}
      </AnimatePresence>
    </>
  );
};

export default ServiceList;
