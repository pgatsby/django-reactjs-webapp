import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";
import { userLoginReducer } from "./reducers/userReducers.js";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  user: userLoginReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
