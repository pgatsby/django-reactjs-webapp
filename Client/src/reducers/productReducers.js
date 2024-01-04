import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "/api/products",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const productListReducer = createReducer(
  {
    products: [],
    loading: false,
    error: "",
  },
  (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);

export const fetchProductById = createAsyncThunk(
  "/api/products/product_id",
  async (product_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/products/${product_id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const productDetailsReducer = createReducer(
  {
    product: [],
    loading: false,
    error: "",
  },
  (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);
