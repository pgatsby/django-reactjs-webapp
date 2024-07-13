import { createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
const USER_LOGOUT = "USER_LOGOUT";

const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
const GET_USER_INFO_FAIL = "GET_USER_INFO_FAIL";

const userLoginFromLocalStorage = localStorage.getItem("userLogin")
  ? JSON.parse(localStorage.getItem("userLogin"))
  : null;

const userDetailsFromLocalStorage = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
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

    localStorage.setItem("userLogin", JSON.stringify(data));

    dispatch(getUserDetails());
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

export const logout = () => (dispatch) => {
  localStorage.removeItem("userLogin");
  localStorage.removeItem("userDetails");

  dispatch({
    type: USER_LOGOUT,
  });
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_INFO_REQUEST,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.get("/api/users/profile/", config);

    dispatch({
      type: GET_USER_INFO_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userDetails", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_USER_INFO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userLoginReducer = createReducer(
  {
    ...userLoginFromLocalStorage,
  },
  (builder) => {
    builder
      .addCase(USER_LOGIN_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(USER_LOGIN_SUCCESS, (state, action) => {
        return {
          loading: false,
          ...action.payload,
        };
      })
      .addCase(USER_LOGIN_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(USER_LOGOUT, () => {
        return {};
      });
  }
);

export const userDetailsReducer = createReducer(
  {
    user: userDetailsFromLocalStorage ? userDetailsFromLocalStorage : null,
  },
  (builder) => {
    builder
      .addCase(GET_USER_INFO_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(GET_USER_INFO_SUCCESS, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(GET_USER_INFO_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(USER_LOGOUT, () => {
        return {};
      });
  }
);
