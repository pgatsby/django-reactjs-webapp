import { createReducer } from "@reduxjs/toolkit";
import {
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_FULLFILLED,
  GET_PRODUCTS_REJECTED,
  GET_PRODUCT_BY_ID_PENDING,
  GET_PRODUCT_BY_ID_FULLFILLED,
  GET_PRODUCT_BY_ID_REJECTED,
} from "../constants/productConstants.js";

export const productListReducer = createReducer(
  {
    products: [],
    loading: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(GET_PRODUCTS_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GET_PRODUCTS_FULLFILLED, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(GET_PRODUCTS_REJECTED, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);

export const productDetailsReducer = createReducer(
  {
    product: [],
    loading: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(GET_PRODUCT_BY_ID_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GET_PRODUCT_BY_ID_FULLFILLED, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(GET_PRODUCT_BY_ID_REJECTED, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);
