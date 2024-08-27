import { createReducer } from "@reduxjs/toolkit";
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
  DELETE_PRODUCT_RESET,
  CREATE_PRODUCT_PENDING,
  CREATE_PRODUCT_FULLFILLED,
  CREATE_PRODUCT_REJECTED,
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCT_PENDING,
  UPDATE_PRODUCT_FULLFILLED,
  UPDATE_PRODUCT_REJECTED,
  UPDATE_PRODUCT_RESET,
  CREATE_PRODUCT_REVIEW_PENDING,
  CREATE_PRODUCT_REVIEW_FULLFILLED,
  CREATE_PRODUCT_REVIEW_REJECTED,
  CREATE_PRODUCT_REVIEW_RESET,
} from "../constants/productConstants.js";

export const productListReducer = createReducer(
  {
    products: [],
    loading: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(FETCH_PRODUCTS_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_PRODUCTS_FULLFILLED, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(FETCH_PRODUCTS_REJECTED, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);

export const productDetailsReducer = createReducer(
  {
    product: {
      reviews: [],
    },
    loading: false,
    error: null,
  },
  (builder) => {
    builder
      .addCase(FETCH_PRODUCT_BY_ID_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_PRODUCT_BY_ID_FULLFILLED, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(FETCH_PRODUCT_BY_ID_REJECTED, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);

export const productDeleteReducer = createReducer({}, (builder) => {
  builder
    .addCase(DELETE_PRODUCT_PENDING, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(DELETE_PRODUCT_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
    })
    .addCase(DELETE_PRODUCT_REJECTED, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_PRODUCT_RESET, (state, action) => {
      return {};
    });
});

export const productCreateReducer = createReducer({}, (builder) => {
  builder
    .addCase(CREATE_PRODUCT_PENDING, (state) => {
      state.loading = true;
      state.fullfilled = false;
      state.error = null;
    })
    .addCase(CREATE_PRODUCT_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
      state.product = action.payload;
    })
    .addCase(CREATE_PRODUCT_REJECTED, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CREATE_PRODUCT_RESET, (state, action) => {
      return {};
    });
});

export const productUpdateReducer = createReducer({}, (builder) => {
  builder
    .addCase(UPDATE_PRODUCT_PENDING, (state) => {
      state.loading = true;
      state.fullfilled = false;
      state.error = null;
    })
    .addCase(UPDATE_PRODUCT_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
      state.product = action.payload;
    })
    .addCase(UPDATE_PRODUCT_REJECTED, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(UPDATE_PRODUCT_RESET, (state, action) => {
      return {};
    });
});

export const productCreateReviewReducer = createReducer({}, (builder) => {
  builder
    .addCase(CREATE_PRODUCT_REVIEW_PENDING, (state) => {
      state.loading = true;
      state.fullfilled = false;
      state.error = null;
    })
    .addCase(CREATE_PRODUCT_REVIEW_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
    })
    .addCase(CREATE_PRODUCT_REVIEW_REJECTED, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(CREATE_PRODUCT_REVIEW_RESET, (state, action) => {
      return {};
    });
});
