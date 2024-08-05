import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { saveShippingAddress } from "../actions/cartActions.js";

function ShippingScreen() {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);

  const { access } = userLogin;

  useEffect(() => {
    if (!access) {
      navigate("/");
    }
  }, [access, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        address,
        city,
        state,
        country,
        postalCode,
      })
    );

    navigate("/payment");
  };

  return (
    <FormContainer center xs={12} md={8}>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address ? address : ""}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="city" className="mt-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city ? city : ""}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="state" className="mt-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                value={state ? state : ""}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="country" className="mt-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={country ? country : ""}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="postalCode" className="mt-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode ? postalCode : ""}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Countinue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
