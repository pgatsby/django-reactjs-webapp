import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";

import Rating from "../components/Rating.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import {
  fetchProductById,
  createProductReview,
} from "../actions/productActions.js";

import { CREATE_PRODUCT_REVIEW_RESET } from "../constants/productConstants.js";

function ProductScreen() {
  const productId = useParams().id;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userProfile);

  const {
    loading: loadingProductReview,
    fullfilled: fullfilledProductReview,
    error: errorProductReview,
  } = useSelector((state) => state.productCreateReview);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (fullfilledProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: CREATE_PRODUCT_REVIEW_RESET });
      dispatch(fetchProductById(productId));
    }
  }, [productId, fullfilledProductReview, dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createProductReview(productId, { rating, comment }));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Link to="/" className="btn btn-light my-3">
            Go Back
          </Link>
          <Row className="mb-3">
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price :</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (i) => (
                                <option key={i} value={i + 1}>
                                  {i + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="w-100"
                      disabled={product.countInStock === 0}
                      type="button"
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h4>REVIEWS</h4>
              {product.reviews.length === 0 && (
                <Message variant="info">No Reviews</Message>
              )}
              {product.reviews.map((review) => (
                <ListGroup variant="flush" key={review.id}>
                  <ListGroup.Item key={review.id} style={{ padding: 0 }}>
                    <strong>{review.username}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </Col>

            <Col md={6}>
              <h4>Write a review</h4>
              {loadingProductReview && <Loader />}
              {fullfilledProductReview && (
                <Message variant="success">Review Submitted</Message>
              )}

              {errorProductReview && (
                <Message variant="danger">{errorProductReview}</Message>
              )}
              {user ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="formRating" className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formComment" className="mb-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter Product Review"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingProductReview}
                    type="submit"
                    variant="primary"
                    className="mb-3"
                  >
                    SUBMIT
                  </Button>
                </Form>
              ) : (
                <Link to={`/login?redirect=product/${productId}`}>
                  Login to write a review
                </Link>
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
