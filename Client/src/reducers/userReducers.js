import { createReducer } from "@reduxjs/toolkit";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
} from "../actions/userActions";

const userLoginFromLocalStorage = localStorage.getItem("userLogin")
  ? JSON.parse(localStorage.getItem("userLogin"))
  : null;

const userDetailsFromLocalStorage = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

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
      .addCase(USER_INFO_REQUEST, (state) => {
        state.loading = true;
      })
      .addCase(USER_INFO_SUCCESS, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(USER_INFO_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(USER_LOGOUT, () => {
        return { user: null };
      });
  }
);

export const userRegisterReducer = createReducer({}, (builder) => {
  builder
    .addCase(USER_REGISTER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(USER_REGISTER_SUCCESS, (state, action) => {
      state.loading = false;
      state.access = true;
    })
    .addCase(USER_REGISTER_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(USER_LOGOUT, () => {
      return {};
    });
});

export const userUpdateProfileReducer = createReducer({}, (builder) => {
  builder
    .addCase(USER_UPDATE_PROFILE_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(USER_UPDATE_PROFILE_SUCCESS, (state, action) => {
      state.loading = false;
      state.success = true;
    })
    .addCase(USER_UPDATE_PROFILE_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(USER_UPDATE_PROFILE_RESET, () => {
      return {};
    });
});
