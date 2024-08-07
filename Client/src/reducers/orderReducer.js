import { createReducer } from "@reduxjs/toolkit";
import {
  ORDER_CREATE_PENDING,
  ORDER_CREATE_FULLFILLED,
  ORDER_CREATE_REJECTED,
  ORDER_CREATE_RESET,
  ORDER_INFO_PENDING,
  ORDER_INFO_FULLFILLED,
  ORDER_INFO_REJECTED,
  ORDER_PAY_PENDING,
  ORDER_PAY_FULLFILLED,
  ORDER_PAY_REJECTED,
  ORDER_PAY_RESET,
  FETCH_USER_ORDERS_PENDING,
  FETCH_USER_ORDERS_FULLFILLED,
  FETCH_USER_ORDERS_REJECTED,
} from "../constants/orderConstants";
import { USER_LOGOUT } from "../constants/userConstants.js";

export const orderCreateReducer = createReducer({}, (builder) => {
  builder
    .addCase(ORDER_CREATE_PENDING, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(ORDER_CREATE_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
      state.order = action.payload;
    })
    .addCase(ORDER_CREATE_REJECTED, (state, action) => {
      state.loading = false;
      state.fullfilled = false;
      state.error = action.payload;
    })
    .addCase(ORDER_CREATE_RESET, () => {
      return {};
    });
});

export const orderInfoReducer = createReducer(
  {
    loading: true,
  },
  (builder) => {
    builder
      .addCase(ORDER_INFO_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ORDER_INFO_FULLFILLED, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(ORDER_INFO_REJECTED, (state, action) => {
        state.loading = false;
        state.fullfilled = false;
        state.error = action.payload;
      });
  }
);

export const orderPayReducer = createReducer({}, (builder) => {
  builder
    .addCase(ORDER_PAY_PENDING, (state) => {
      state.loading = true;
      state.fullfilled = false;
      state.error = null;
    })
    .addCase(ORDER_PAY_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
    })
    .addCase(ORDER_PAY_REJECTED, (state, action) => {
      state.loading = false;
      state.fullfilled = false;
      state.error = action.payload;
    })
    .addCase(ORDER_PAY_RESET, () => {
      return {};
    });
});

export const userOrdersReducer = createReducer(
  {
    orders: [],
  },
  (builder) => {
    builder
      .addCase(FETCH_USER_ORDERS_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_USER_ORDERS_FULLFILLED, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(FETCH_USER_ORDERS_REJECTED, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(USER_LOGOUT, (state, action) => {
        state.orders = [];
      });
  }
);
