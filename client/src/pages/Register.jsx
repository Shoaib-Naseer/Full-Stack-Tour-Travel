import React, { useContext, useEffect, useState } from "react";
import "../styles/login.css";

import LoginImg from "../assets/images/login.png";
import UserIcon from "../assets/images/user.png";
import { Button, Col, Form, FormGroup, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validators";
import { AuthContext } from "../context/AuthContext";
import { baseUrl } from "../config";
import Input from "../components/Reusable/Input";

import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    email: "",
    password: "",
    gender: "",
    birthdate: "",
  });

  const { dispatch, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthdate: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    let { id, value } = e.target;
    let errorMessage = "";

    if (id === "email") {
      value = value.trim();
      errorMessage = validateEmail(value);
    } else if (id === "userName") {
      value = value.trim();
      if (value.length <= 4) {
        errorMessage = "Username must be at least 4 characters";
      } else {
        errorMessage = "";
      }
    } else if (id === "password") {
      errorMessage = validatePassword(value);
    } else if (id === "confirmPassword") {
      if (value !== credentials.password) {
        errorMessage = "Passwords do not match";
      } else if (id === "gender") {
        if (value === "") {
          errorMessage = "Gender is required";
        }
      }
    }
    if (id !== "confirmPassword") {
      setCredentials((prev) => ({
        ...prev,
        [id]: value,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [id]: errorMessage,
    }));
  };

  useEffect(() => {
    setIsFormValid(
      Object.values(errors).every((error) => error === "") &&
        credentials.userName !== "" &&
        credentials.email !== "" &&
        credentials.password !== "",
      credentials.confirmPassword === credentials.password &&
        credentials.gender !== "" &&
        /^\d{4}-\d{2}-\d{2}$/.test(credentials.birthdate),
    );
  }, [credentials, errors]);

  //   send data to server
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "REGISTER_START" });
      const res = await fetch(`${baseUrl}auth/register`, {
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
      toast.success("Registration Successfull, You'll be redirecting to Login Page",{
        autoClose: 2500,
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error)
    }
  };

  const inputFields = [
    {
      type: "text",
      placeholder: "Username",
      id: "userName",
      value: credentials.userName,
      error: errors.userName,
    },
    {
      type: "text",
      placeholder: "Email",
      id: "email",
      value: credentials.email,
      error: errors.email,
    },
    {
      type: "password",
      placeholder: "Password",
      id: "password",
      value: credentials.password,
      error: errors.password,
    },
    {
      type: "password",
      placeholder: "Confirm Password",
      id: "confirmPassword",
      value: credentials.confirmPassword,
      error: errors.confirmPassword,
    },
    {
      type: "select",
      placeholder: "Gender",
      id: "gender",
      value: credentials.gender,
      error: errors.gender,
    },
    {
      type: "date",
      placeholder: "birthdate",
      id: "birthdate",
      value: credentials.birthdate,
      error: errors.birthdate,
    },
  ];

  return (
    <section>
      <Row className="mx-0">
        <Col lg="8" className="m-auto">
          <div className="login__container d-sm-flex justify-content-sm-between">
            <div className="login__img | mb-5 mb-sm-auto">
              <img src={LoginImg} alt="login image" />
            </div>

            <div className="login__form">
              <div className="user">
                <img src={UserIcon} alt="user icon" />
              </div>

              <h2>Register New Account</h2>

              <Form onSubmit={handleClick}>
                {inputFields.map((field) => (
                  <FormGroup key={field.id}>
                    {field.type === "select" ? (
                      <select
                        id={field.id}
                        value={field.value}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      // Render other input types
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        id={field.id}
                        value={field.value}
                        onChange={handleChange}
                        error={field.error}
                      />
                    )}
                  </FormGroup>
                ))}

                <Button
                  className="btn secondary__btn auth"
                  type="submit"
                  disabled={!isFormValid || loading}
                >
                  {loading ? <i class="fa fa-spinner fa-spin"></i> : "Register"}
                </Button>
                <p>
                  Already Have an account? <Link to="/login">Login</Link>{" "}
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

export default Register;
