import React from 'react';
import TourCard from '../../shared/TourCard';
import tourData from '../../assets/data/tours';
import { Col } from 'reactstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FeaturedTourList = () => {
  return (
    <>
      <AnimatePresence>
        {tourData.map((tour, index) => {
          const [tourRef, tourInView] = useInView({
            triggerOnce: false,
            threshold: 0.2
          });
          return (
            <Col lg="3" className="mb-4" key={tour.id}>
              <motion.div
                ref={tourRef}
                initial={{ opacity: 0, y: -20 }} // Initial opacity and y position (fade-in from below)
                animate={{ opacity: tourInView ? 1 : 0, y: tourInView ? 0 : 20 }} // Fade-in when inView is true
                transition={{ duration: 0.5, delay: index * 0.2 }} // Delay each card's animation
                exit={{ opacity: 0, y: 20 }} // Exit animation if needed
              >
                <TourCard tour={tour} />
              </motion.div>
            </Col>
          );
        })}
      </AnimatePresence>
    </>
  );
};

export default FeaturedTourList;
