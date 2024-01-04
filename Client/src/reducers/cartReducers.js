import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const CART_ADD_ITEM = "CART_ADD_ITEM";

const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  // console.log(data)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const cartReducer = createReducer(
  {
    cartItems: cartItemsFromLocalStorage,
  },
  (builder) => {
    builder
      .addCase(CART_ADD_ITEM, (state, action) => {
        const item = action.payload;
        const existItem = state.cartItems.find(
          (p) => p.product === item.product
        );

        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((p) =>
              p.product === existItem.product ? item : p
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
      })
      .addCase(CART_REMOVE_ITEM, (state, action) => {
        const item = action.payload;

        return {
          ...state,
          cartItems: state.cartItems.filter((p) => p.product !== item),
        };
      });
  }
);
