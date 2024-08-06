import { createReducer } from "@reduxjs/toolkit";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_INFO_REQUEST,
  ORDER_INFO_SUCCESS,
  ORDER_INFO_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
} from "../actions/orderActions";

export const orderCreateReducer = createReducer({}, (builder) => {
  builder
    .addCase(ORDER_CREATE_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(ORDER_CREATE_SUCCESS, (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    })
    .addCase(ORDER_CREATE_FAIL, (state, action) => {
      state.loading = false;
      state.success = false;
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
      .addCase(ORDER_INFO_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ORDER_INFO_SUCCESS, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(ORDER_INFO_FAIL, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
);

export const orderPayReducer = createReducer({}, (builder) => {
  builder
    .addCase(ORDER_PAY_REQUEST, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    })
    .addCase(ORDER_PAY_SUCCESS, (state, action) => {
      state.loading = false;
      state.success = true;
    })
    .addCase(ORDER_PAY_FAIL, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    })
    .addCase(ORDER_PAY_RESET, () => {
      return {};
    });
});
