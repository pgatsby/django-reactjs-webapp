import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import FormContainer from "../components/FormContainer.js";
import { fetchUserProfile, updateUserProfile } from "../actions/userActions.js";
import { fetchUserOrders } from "../actions/orderActions.js";
import { UPDATE_USER_RESET } from "../constants/userConstants.js";

function ProfileScreen() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { access } = useSelector((state) => state.userLogin);

  const { user } = useSelector((state) => state.userProfile);

  const { loading, fullfilled, error } = useSelector(
    (state) => state.userUpdate
  );

  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = useSelector((state) => state.userOrders);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!access) {
      navigate("/");
    }
  }, [access, navigate]);

  useEffect(() => {
    if (!user || fullfilled) {
      dispatch({ type: UPDATE_USER_RESET });
      dispatch(fetchUserProfile());
      setPassword("");
      setVerifyPassword("");
    }
  }, [user, fullfilled, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders());
      setFirstname(user.first_name);
      setLastname(user.last_name);
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile(username, email, password, firstname, lastname)
      );
      setMessage("");
    }
  };

  return (
    <Row>
      <Col xs={12} md={4}>
        <FormContainer>
          <h1>Update Profile</h1>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formFirstName">
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
                <Form.Group controlId="formLastName">
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
            <Form.Group controlId="formUsername" className="mb-3">
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
            <Form.Group controlId="formEmail" className="mb-3">
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
            <Form.Group controlId="formPassword" className="mb-3">
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
            <Form.Group controlId="formVerifyPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={verifyPassword}
                onChange={(e) => {
                  setVerifyPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            <Button className="mb-3" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </FormContainer>
      </Col>
      <Col xs={12} md={8}>
        <h1>My Orders</h1>
        {orders.length === 0 ? (
          <Message variant="info">You have no orders</Message>
        ) : loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order.id}`}>
                      <Button variant="light" className="btn-sm">
                        View Order
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
