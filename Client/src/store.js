import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";
import {
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  adminEditUserReducer,
  adminUpdateUserReducer,
} from "./reducers/userReducers.js";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderInfoReducer,
  OrderListReducer,
  orderPayReducer,
  userOrdersReducer,
} from "./reducers/orderReducer.js";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userOrders: userOrdersReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  adminEdit: adminEditUserReducer,
  adminUpdate: adminUpdateUserReducer,
  orderCreate: orderCreateReducer,
  orderInfo: orderInfoReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderList: OrderListReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
