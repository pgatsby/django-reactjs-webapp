import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBox() {
  const ROUTES = {
    ADMIN_PRODUCTS: "/admin/products",
  };

  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

  const isAdminProductsPage = location.pathname.startsWith(
    ROUTES.ADMIN_PRODUCTS
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      console.log(isAdminProductsPage)
      const path = isAdminProductsPage
        ? `${ROUTES.ADMIN_PRODUCTS}/?keyword=${keyword}&page=1`
        : `/?keyword=${keyword}&page=1`;
      navigate(path);
    } else {
      navigate(location.pathname);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex mx-4">
      <Form.Group>
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button type="submit" variant="light">
        SEARCH
      </Button>
    </Form>
  );
}

export default SearchBox;
