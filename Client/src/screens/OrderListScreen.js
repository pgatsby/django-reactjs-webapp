import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { fetchOrders } from "../actions/orderActions.js";

function OrderListScreen() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userProfile);

  const { loading, error, orders } = useSelector((state) => state.orderList);

  useEffect(() => {
    if (user && user.is_staff) {
      dispatch(fetchOrders());
    } else {
      navigate("/");
    }
  }, [user, navigate, dispatch]);

  return (
    <div>
      <h1>Orders</h1>

      {orders.length === 0 ? (
        <Message variant="info">There are no orders to view.</Message>
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.user.last_name}, {order.user.first_name} <br />(
                  {order.user.username})
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
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
    </div>
  );
}

export default OrderListScreen;
