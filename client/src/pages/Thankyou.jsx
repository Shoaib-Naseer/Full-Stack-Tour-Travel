import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row , Button} from 'reactstrap'
import '../styles/thankyou.css'

const Thankyou = () => {
  return (
    <section className='thankyou__section'>
        <Row>
            <Col lg='12'>
                <div className="thank__you | pt-5 text-center ">
                    <span>
                        <i className="ri-checkbox-circle-line"></i>
                    </span>
                    <h1>Thank You</h1>
                    <h3>Your tour is booked</h3>

                    <Button className='btn primary__btn'>
                        <Link to="/home">Back to Home</Link>
                    </Button>
                </div>
            </Col>
        </Row>
    </section>
  )
}

export default Thankyou