import React, { useContext, useEffect, useState } from 'react';
import '../styles/login.css';

import LoginImg from '../assets/images/login.png';
import UserIcon from '../assets/images/user.png';
import { Button, Col, Form, FormGroup, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validators';
import { AuthContext } from '../context/AuthContext';
import { setAccessToken, setUserInfo } from '../helpers';
import { toast, ToastContainer } from "react-toastify";
import { baseUrl } from '../config';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate()
  const [isFormValid, setIsFormValid] = useState(false);
  const { dispatch, loading, error } = useContext(AuthContext);


  const handleChange = (e) => {
    let  { id, value } = e.target;
    let errorMessage = '';
    if (id === 'email') {
      value = value.trim();
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

  };

  useEffect(()=>{
    
    setIsFormValid(
      !Object.values(errors).some((error) => error !== '') &&
        credentials.email !== '' &&
        credentials.password !== ''
    );
  },[credentials, errors])

  //   send data to server
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}auth/login`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error);
        return;
      }
      setAccessToken(result.data.accessToken)
      setUserInfo(result.data.user)
      dispatch({ type: "LOGIN" ,payload: result.data.user});
      toast.success("Login Successfull, You'll be redirecting to Home Page",{
        autoClose: 2500,
      });
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
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

                <Button className="btn secondary__btn auth" type="submit" disabled={!isFormValid || loading}>
                {loading ? <i class="fa fa-spinner fa-spin"></i> : "Login"}
                </Button>
                <p>
                  Dont have an account? <Link to="/register">Create</Link>{' '}
                </p>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </section>
  );
};

export default Login;
