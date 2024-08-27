import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import PopupWindow from "../components/PopupWindow.js";
import {
  DELETE_PRODUCT_RESET,
  CREATE_PRODUCT_RESET,
} from "../constants/productConstants.js";
import {
  fetchProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions.js";

function ProductListScreen() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const { user } = useSelector((state) => state.userProfile);

  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  const {
    loading: deleteProductLoading,
    fullfilled: deleteProductFullfilled,
    error: deleteProductError,
  } = useSelector((state) => state.productDelete);

  const {
    loading: createProductLoading,
    fullfilled: createProductFullfilled,
    product,
    error: createProductError,
  } = useSelector((state) => state.productCreate);

  useEffect(() => {
    if (user && user.is_staff) {
      dispatch(fetchProducts());
    } else {
      navigate("/");
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (deleteProductFullfilled) {
      setShow(false);
      dispatch({
        type: DELETE_PRODUCT_RESET,
      });
      dispatch(fetchProducts());
    }
  }, [deleteProductFullfilled, dispatch]);

  useEffect(() => {
    if (createProductFullfilled) {
      dispatch({ type: CREATE_PRODUCT_RESET });
      navigate(`/admin/product/${product.id}/edit`);
    }
  }, [createProductFullfilled, product, dispatch, navigate]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const createProductHandler = (product) => {
    dispatch(createProduct());
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteProductLoading && <Loader />}
      {deleteProductError && <Message>{deleteProductError}</Message>}

      {createProductLoading && <Loader />}
      {createProductError && <Message>{createProductError}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>QTY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>
                  <div className="d-flex justify-content-evenly">
                    <LinkContainer to={`/admin/product/${product.id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        setShow(true);
                        setProductToDelete(product.id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <PopupWindow show={show}>
        <div className="text-center">Are you sure you want to delete?</div>
        <div className="d-flex justify-content-evenly mt-3">
          <Button
            className="btn-md"
            variant="danger"
            onClick={() => {
              deleteProductHandler(productToDelete);
            }}
          >
            Delete
          </Button>
          <Button
            className="btn-md"
            variant="primary"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </div>
        {deleteProductError && (
          <div className="d-flex justify-content-center mt-3">
            <Message variant="danger">{deleteProductError}</Message>
          </div>
        )}
      </PopupWindow>
    </div>
  );
}

export default ProductListScreen;
