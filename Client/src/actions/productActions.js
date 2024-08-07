import axios from "axios";
import {
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_FULLFILLED,
  GET_PRODUCTS_REJECTED,
  GET_PRODUCT_BY_ID_PENDING,
  GET_PRODUCT_BY_ID_FULLFILLED,
  GET_PRODUCT_BY_ID_REJECTED,
} from "../constants/productConstants";

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTS_PENDING,
    });

    const { data } = await axios.get(`/api/products/`);

    dispatch({
      type: GET_PRODUCTS_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_REJECTED,
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
      type: GET_PRODUCT_BY_ID_PENDING,
    });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: GET_PRODUCT_BY_ID_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_BY_ID_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
