import { createReducer } from "@reduxjs/toolkit";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../actions/cartActions";

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

export const cartReducer = createReducer(
  {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
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
      })
      .addCase(CART_SAVE_SHIPPING_ADDRESS, (state, action) => {
        return {
          ...state,
          shippingAddress: action.payload,
        };
      });
  }
);
