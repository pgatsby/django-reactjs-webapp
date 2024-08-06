import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CustomPayPalButtons from "../components/CustomPayPalButtons.js";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { getOrderInfo, ORDER_PAY_RESET } from "../actions/orderActions.js";

function OrderScreen() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const orderId = useParams().id;

  const { access } = useSelector((state) => state.userLogin);

  const { order, error, loading } = useSelector((state) => state.orderInfo);

  const { success: successPay, loading: loadingPay } = useSelector(
    (state) => state.orderPay
  );

  const initialOptions = {
    clientId:
      "AZ_wTSAI4xEb8gcdzkff7m7h4wolUKXTTkQA65qGe54FcYhEBumF9g55Czjt1RGW7AnUa8vSmYwgs_Bz",
  };

  let itemsPrice = null;

  if (!loading && !error) {
    itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }
  useEffect(() => {
    if (!access) {
      navigate("/");
    }
    if (!order || order.id !== Number(orderId) || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderInfo(orderId));
    }
  }, [access, order, orderId, successPay, dispatch, navigate]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Row>
        <h1>Order: {order.id}</h1>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.first_name} {order.user.last_name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping: </strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>

              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col> ${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col> ${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col> ${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col> ${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {!order.isPaid ? (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    <PayPalScriptProvider options={initialOptions}>
                      <CustomPayPalButtons
                        amount={order.totalPrice}
                        orderId={order.id}
                      />
                    </PayPalScriptProvider>
                  </ListGroup.Item>
                ) : null}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
