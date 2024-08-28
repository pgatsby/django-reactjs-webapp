import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import FormContainer from "../components/FormContainer.js";
import { fetchProductById, updateProduct } from "../actions/productActions.js";
import { UPDATE_PRODUCT_RESET } from "../constants/productConstants.js";

function ProductEditScreen() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const productId = useParams().id;

  const [productName, setProductName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const { access } = useSelector((state) => state.userLogin);

  const { user } = useSelector((state) => state.userProfile);

  const { product: productToEdit } = useSelector(
    (state) => state.productDetails
  );

  const { loading, error, fullfilled } = useSelector(
    (state) => state.productUpdate
  );

  useEffect(() => {
    if (user && user.is_staff) {
      if (!productToEdit || productToEdit.id !== Number(productId)) {
        dispatch(fetchProductById(productId));
      }
    } else {
      navigate("/");
    }
  }, [productId, user, productToEdit, dispatch, navigate]);

  useEffect(() => {
    if (productToEdit && fullfilled) {
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch(fetchProductById(productId));
    }
  }, [productToEdit, fullfilled, productId, dispatch]);

  useEffect(() => {
    if (productToEdit) {
      setProductName(productToEdit.name || "");
      setImage(productToEdit.image || "");
      setBrand(productToEdit.brand || "");
      setCategory(productToEdit.category || "");
      setDescription(productToEdit.description || "");
      setPrice(productToEdit.price || 0);
      setCountInStock(productToEdit.countInStock || 0);
    }
  }, [productToEdit]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id: productToEdit.id,
        productName,
        brand,
        category,
        description,
        price,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("image", file);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access}`,
        },
      };

      const { data } = await axios.post(
        `/api/products/${productToEdit.id}/upload/image/`,
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link to="/admin/products">Go Back</Link>
      <h1>Edit Product</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <FormContainer center xs={12} md={6}>
        <Form onSubmit={submitHandler}>

          <Form.Group controlId="formProductName" className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            ></Form.Control>

            <Form.Control
              type="file"
              label="Choose File"
              onChange={uploadFileHandler}
            ></Form.Control>

            {uploading && <Loader />}
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="formBrand" className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="formCategory" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="formPrice" className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="formQuantity" className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Quantity"
                  value={countInStock}
                  onChange={(e) => {
                    setCountInStock(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Button className="mb-3" type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
