import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.js";
import { fetchProducts } from "../actions/productActions.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { useLocation } from "react-router-dom";

function HomeScreen() {
  const dispatch = useDispatch();

  const location = useLocation();

  const keyword = location.search ? location.search : "";

  useEffect(() => {
    dispatch(fetchProducts(keyword));
  }, [keyword, dispatch]);

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.productList);

  return (
    <div>
      <h1>Latest Products </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
