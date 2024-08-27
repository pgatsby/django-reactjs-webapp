import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants.js";
import {
  CREATE_ORDER_PENDING,
  CREATE_ORDER_FULLFILLED,
  CREATE_ORDER_REJECTED,
  ORDER_INFO_PENDING,
  ORDER_INFO_FULLFILLED,
  ORDER_INFO_REJECTED,
  ORDER_PAY_PENDING,
  ORDER_PAY_FULLFILLED,
  ORDER_PAY_REJECTED,
  ORDER_DELIVER_PENDING,
  ORDER_DELIVER_FULLFILLED,
  ORDER_DELIVER_REJECTED,
  FETCH_USER_ORDERS_PENDING,
  FETCH_USER_ORDERS_FULLFILLED,
  FETCH_USER_ORDERS_REJECTED,
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_FULLFILLED,
  FETCH_ORDERS_REJECTED,
} from "../constants/orderConstants.js";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.post("/api/orders/create/", order, config);

    dispatch({
      type: CREATE_ORDER_FULLFILLED,
      payload: data,
    });

    dispatch({
      type: CART_CLEAR_ITEMS,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fetchOrderInfo = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_INFO_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}/`, config);

    dispatch({
      type: ORDER_INFO_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_INFO_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${id}/pay/`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.put(`/api/orders/${id}/deliver/`, {}, config);

    dispatch({
      type: ORDER_DELIVER_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fetchUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_USER_ORDERS_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.get("/api/orders/myorders/", config);

    dispatch({
      type: FETCH_USER_ORDERS_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_ORDERS_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fetchOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_ORDERS_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.get("/api/orders/", config);

    dispatch({
      type: FETCH_ORDERS_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
