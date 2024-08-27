import axios from "axios";
import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_FULLFILLED,
  FETCH_PRODUCTS_REJECTED,
  FETCH_PRODUCT_BY_ID_PENDING,
  FETCH_PRODUCT_BY_ID_FULLFILLED,
  FETCH_PRODUCT_BY_ID_REJECTED,
  DELETE_PRODUCT_PENDING,
  DELETE_PRODUCT_FULLFILLED,
  DELETE_PRODUCT_REJECTED,
  CREATE_PRODUCT_PENDING,
  CREATE_PRODUCT_FULLFILLED,
  CREATE_PRODUCT_REJECTED,
  UPDATE_PRODUCT_PENDING,
  UPDATE_PRODUCT_FULLFILLED,
  UPDATE_PRODUCT_REJECTED,
  CREATE_PRODUCT_REVIEW_PENDING,
  CREATE_PRODUCT_REVIEW_FULLFILLED,
  CREATE_PRODUCT_REVIEW_REJECTED,
} from "../constants/productConstants";

export const fetchProducts =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: FETCH_PRODUCTS_PENDING,
      });

      const { data } = await axios.get(`/api/products${keyword}`);

      dispatch({
        type: FETCH_PRODUCTS_FULLFILLED,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCTS_REJECTED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const fetchProductById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PRODUCT_BY_ID_PENDING,
    });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: FETCH_PRODUCT_BY_ID_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_BY_ID_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.delete(`/api/products/delete/${id}/`, config);

    dispatch({
      type: DELETE_PRODUCT_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.post(`/api/products/create/`, {}, config);

    dispatch({
      type: CREATE_PRODUCT_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/update/${product.id}/`,
      product,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_PRODUCT_REVIEW_PENDING,
      });

      const { access } = getState().userLogin;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      };

      const { data } = await axios.post(
        `/api/products/${productId}/reviews/`,
        review,
        config
      );

      dispatch({
        type: CREATE_PRODUCT_REVIEW_FULLFILLED,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_REVIEW_REJECTED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
