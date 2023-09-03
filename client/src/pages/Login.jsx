import React, { useState } from 'react';
import '../styles/login.css';

import LoginImg from '../assets/images/login.png';
import UserIcon from '../assets/images/user.png';
import { Button, Col, Form, FormGroup, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validators';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    let errorMessage = '';
    if (id === 'email') {
      errorMessage = validateEmail(value);
    } else if (id === 'password') {
      errorMessage = validatePassword(value);
    }
    setCredentials((prev) => ({
      ...prev,
      [id]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: errorMessage
    }));

    setIsFormValid(
      !Object.values(errors).some((error) => error !== '') &&
        credentials.email !== '' &&
        credentials.password !== ''
    );
  };

  //   send data to server
  const handleClick = (e) => {
    e.preventDefault();
    console.log(credentials);
  };

  return (
    <section>
      <Row className="mx-0">
        <Col lg="8" className="m-auto">
          <div className="login__container d-sm-flex justify-content-sm-between">
            <div className="login__img">
              <img src={LoginImg} alt="login image" />
            </div>

            <div className="login__form">
              <div className="user">
                <img src={UserIcon} alt="user icon" />
              </div>

              <h2>Login</h2>

              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    required
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </FormGroup>

                <FormGroup>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    required
                    onChange={handleChange}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </FormGroup>

                <Button className="btn secondary__btn auth" type="submit" disabled={!isFormValid}>
                  Login
                </Button>
                <p>
                  Dont have an account? <Link to="/register">Create</Link>{' '}
                </p>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Login;
