import { createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
const USER_LOGOUT = "USER_LOGOUT";

const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login/",
      {
        username: username,
        password: password,
      },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userLoginReducer = createReducer(
  {
    userInfo: userFromLocalStorage,
  },
  (builder) => {
    builder
      .addCase(USER_LOGIN_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(USER_LOGIN_SUCCESS, (state, action) => {
        state.loading = false;
        state.tokens = action.payload;
      })
      .addCase(USER_LOGIN_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(USER_LOGOUT, (state, action) => {});
  }
);
