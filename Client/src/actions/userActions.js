import axios from "axios";

import {
  USER_LOGIN_PENDING,
  USER_LOGIN_FULLFILLED,
  USER_LOGIN_REJECTED,
  USER_LOGOUT,
  FETCH_USER_PENDING,
  FETCH_USER_FULLFILLED,
  FETCH_USER_REJECTED,
  REGISTER_USER_PENDING,
  REGISTER_USER_FULLFILLED,
  REGISTER_USER_REJECTED,
  UPDATE_USER_PENDING,
  UPDATE_USER_FULLFILLED,
  UPDATE_USER_REJECTED,
  FETCH_USERS_PENDING,
  FETCH_USERS_FULLFILLED,
  FETCH_USERS_REJECTED,
  DELETE_USER_PENDING,
  DELETE_USER_FULLFILLED,
  DELETE_USER_REJECTED,
  ADMIN_FETCH_USER_PENDING,
  ADMIN_FETCH_USER_FULLFILLED,
  ADMIN_FETCH_USER_REJECTED,
  ADMIN_UPDATE_USER_PENDING,
  ADMIN_UPDATE_USER_FULLFILLED,
  ADMIN_UPDATE_USER_REJECTED,
} from "../constants/userConstants.js";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_PENDING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
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
      type: USER_LOGIN_FULLFILLED,
      payload: data,
    });

    localStorage.setItem("userLogin", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const register =
  (username, email, password, first_name, last_name) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_USER_PENDING,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register/",
        {
          username: username,
          email: email,
          password: password,
          first_name: first_name,
          last_name: last_name,
        },
        config
      );

      dispatch({
        type: REGISTER_USER_FULLFILLED,
      });

      dispatch({
        type: USER_LOGIN_FULLFILLED,
        payload: data,
      });

      localStorage.setItem("userLogin", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: REGISTER_USER_REJECTED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const updateUserProfile =
  (username, email, password, first_name, last_name) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_USER_PENDING,
      });

      const { access } = getState().userLogin;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      };

      const { data } = await axios.put(
        "/api/users/update/",
        {
          username: username,
          email: email,
          password: password,
          first_name: first_name,
          last_name: last_name,
        },
        config
      );

      dispatch({
        type: UPDATE_USER_FULLFILLED,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_REJECTED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_USER_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.get(`/api/users/profile/`, config);

    dispatch({
      type: FETCH_USER_FULLFILLED,
      payload: data,
    });

    localStorage.setItem("userProfile", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FETCH_USER_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userLogin");
  localStorage.removeItem("userProfile");

  dispatch({
    type: USER_LOGOUT,
  });
};

export const fetchUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_USERS_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.get("/api/users/", config);

    dispatch({
      type: FETCH_USERS_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_USER_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.delete(`/api/users/delete/${id}/`, config);

    dispatch({
      type: DELETE_USER_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminFetchUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_FETCH_USER_PENDING,
    });

    const { access } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}/`, config);

    dispatch({
      type: ADMIN_FETCH_USER_FULLFILLED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FETCH_USER_REJECTED,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminUpdateUser =
  (id, username, email, first_name, last_name, is_staff) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_UPDATE_USER_PENDING,
      });

      const { access } = getState().userLogin;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/update/${id}/`,
        {
          username: username,
          email: email,
          first_name: first_name,
          last_name: last_name,
          is_staff: is_staff,
        },
        config
      );

      dispatch({
        type: ADMIN_UPDATE_USER_FULLFILLED,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_USER_REJECTED,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
