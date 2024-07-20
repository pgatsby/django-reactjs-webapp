import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {
  userLoginReducer,
  userDetailsReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers.js";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
