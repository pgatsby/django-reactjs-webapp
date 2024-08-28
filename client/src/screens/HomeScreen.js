import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { fetchProducts } from "../actions/productActions.js";
import Product from "../components/Product.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import Paginate from "../components/Paginate.js";
import ProductCarousel from "../components/ProductCarousel.js";

function HomeScreen() {
  const dispatch = useDispatch();

  const location = useLocation();

  const keyword = location.search;

  useEffect(() => {
    dispatch(fetchProducts(keyword));
  }, [keyword, dispatch]);

  const { products, loading, error, page, pages } = useSelector(
    (state) => state.productList
  );

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.length === 0 && (
              <Message variant="danger">There are no products</Message>
            )}
            {products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
