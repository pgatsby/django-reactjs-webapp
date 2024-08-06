import { createReducer } from "@reduxjs/toolkit";
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAIL,
} from "../actions/productActions";

export const productListReducer = createReducer(
  {
    products: [],
    loading: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(GET_PRODUCTS_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GET_PRODUCTS_SUCCESS, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(GET_PRODUCTS_FAIL, (state, action) => {
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
      .addCase(GET_PRODUCT_BY_ID_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GET_PRODUCT_BY_ID_SUCCESS, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(GET_PRODUCT_BY_ID_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);
