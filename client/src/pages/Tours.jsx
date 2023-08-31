import React, { useEffect, useState } from 'react';
import CommonSection from '../shared/CommonSection';

import {Container , Row ,Col} from 'reactstrap'

import "../styles/tour.css";
import tourData from '../assets/data/tours';
import TourCard from '../shared/TourCard';
import Searchbar from '../shared/Searchbar';
import NewsLetter from '../shared/NewsLetter';


const Tours = () => {

  const [pageCount,setPageCount] = useState(0);
  const [page,setPage] = useState(1);

  useEffect(()=>{
    const pages = Math.ceil(4);
    setPageCount(pages)
  },[page])

  return (
    <>
      <CommonSection title={"All Tours"} />

      <section>
        <Container>
          <Row>
            <Searchbar />
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {
              tourData.map(tour=><Col lg='3' key={tour}> <TourCard tour={tour}/> </Col>)
            }
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
             <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
             {[...Array(pageCount).keys()].map(number => (
              <span key={number} onClick={()=>setPage(number)} className={page === number && 'active__page'}>{number + 1} </span>
             ))}
             </div>
            </Col>
          </Row>
        </Container>
      </section>

      <NewsLetter />
    </>
  )
}

export default Tours