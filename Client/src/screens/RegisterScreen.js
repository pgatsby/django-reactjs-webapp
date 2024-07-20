import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import FormContainer from "../components/FormContainer.js";
import { login, register } from "../reducers/userReducers.js";

function RegisterScreen() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);

  const { error, loading, access } = userRegister;

  useEffect(() => {
    if (access) {
      navigate("/");
    }
  }, [access]);

  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setCheckPassword("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === checkPassword) {
      dispatch(register(username, email, password, firstname, lastname));
      resetForm();
    }
  };

  return (
    <FormContainer center xs={12} md={6}>
      <h1>Register</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Group controlId="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstname"
                placeholder="Enter First Name"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastname"
                placeholder="Enter Last Name"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="username" className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="mt-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="check_password" className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={checkPassword}
            onChange={(e) => {
              setCheckPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button className="mt-3" type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already a Customer? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
