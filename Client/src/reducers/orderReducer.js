import { createReducer } from "@reduxjs/toolkit";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
} from "../actions/orderActions";

export const orderCreateReducer = createReducer({}, (builder) => {
  builder
    .addCase(ORDER_CREATE_REQUEST, (state) => {
      state.loading = true;
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
      return {}
    });
});
