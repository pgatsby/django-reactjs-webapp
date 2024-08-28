import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader.js";
import Message from "./Message.js";
import { fetchFeaturedProducts } from "../actions/productActions.js";

function ProductCarousel() {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector(
    (state) => state.productFeatured
  );

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark mb-3">
      {products.map((product) => (
        <Carousel.Item key={product.id} className="text-center">
          <Link to={`/product/${product.id}`}>
            <Image src={product.image} alt={product.name} />
            <Carousel.Caption className="carousel.caption">
              <h4>
                {product.name} (${product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
