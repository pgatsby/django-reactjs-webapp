import { createReducer } from "@reduxjs/toolkit";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actions/cartActions";

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

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
