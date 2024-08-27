import { createReducer } from "@reduxjs/toolkit";
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
  UPDATE_USER_RESET,
  REGISTER_USER_RESET,
  FETCH_USERS_PENDING,
  FETCH_USERS_FULLFILLED,
  FETCH_USERS_REJECTED,
  DELETE_USER_PENDING,
  DELETE_USER_FULLFILLED,
  DELETE_USER_REJECTED,
  DELETE_USER_RESET,
  ADMIN_FETCH_USER_PENDING,
  ADMIN_FETCH_USER_FULLFILLED,
  ADMIN_FETCH_USER_REJECTED,
  ADMIN_UPDATE_USER_PENDING,
  ADMIN_UPDATE_USER_FULLFILLED,
  ADMIN_UPDATE_USER_REJECTED,
  ADMIN_UPDATE_USER_RESET,
} from "../constants/userConstants.js";

const userLoginFromLocalStorage = localStorage.getItem("userLogin")
  ? JSON.parse(localStorage.getItem("userLogin"))
  : null;

const userProfileFromLocalStorage = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : null;

export const userLoginReducer = createReducer(
  {
    ...userLoginFromLocalStorage,
  },
  (builder) => {
    builder
      .addCase(USER_LOGIN_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(USER_LOGIN_FULLFILLED, (state, action) => {
        return {
          ...action.payload,
        };
      })
      .addCase(USER_LOGIN_REJECTED, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(USER_LOGOUT, () => {
        return {};
      });
  }
);

export const userProfileReducer = createReducer(
  {
    user: userProfileFromLocalStorage,
  },
  (builder) => {
    builder
      .addCase(FETCH_USER_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_USER_FULLFILLED, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(FETCH_USER_REJECTED, (state, action) => {
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
    .addCase(REGISTER_USER_PENDING, (state) => {
      state.loading = true;
      state.fullfilled = false;
      state.error = null;
    })
    .addCase(REGISTER_USER_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
    })
    .addCase(REGISTER_USER_REJECTED, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(REGISTER_USER_RESET, () => {
      return {};
    });
});

export const userUpdateReducer = createReducer({}, (builder) => {
  builder
    .addCase(UPDATE_USER_PENDING, (state) => {
      state.loading = true;
      state.fullfilled = false;
      state.error = null;
    })
    .addCase(UPDATE_USER_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
    })
    .addCase(UPDATE_USER_REJECTED, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(UPDATE_USER_RESET, () => {
      return {};
    });
});

export const userListReducer = createReducer(
  {
    users: [],
  },
  (builder) => {
    builder
      .addCase(FETCH_USERS_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_USERS_FULLFILLED, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(FETCH_USERS_REJECTED, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(USER_LOGOUT, () => {
        return { users: [] };
      });
  }
);

export const userDeleteReducer = createReducer({}, (builder) => {
  builder
    .addCase(DELETE_USER_PENDING, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(DELETE_USER_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
    })
    .addCase(DELETE_USER_REJECTED, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(DELETE_USER_RESET, (state, action) => {
      return {};
    })
    .addCase(USER_LOGOUT, () => {
      return {};
    });
});

export const adminEditUserReducer = createReducer({}, (builder) => {
  builder
    .addCase(ADMIN_FETCH_USER_PENDING, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(ADMIN_FETCH_USER_FULLFILLED, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(ADMIN_FETCH_USER_REJECTED, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(USER_LOGOUT, () => {
      return { user: null };
    });
});

export const adminUpdateUserReducer = createReducer({}, (builder) => {
  builder
    .addCase(ADMIN_UPDATE_USER_PENDING, (state) => {
      state.loading = true;
      state.fullfilled = false;
      state.error = null;
    })
    .addCase(ADMIN_UPDATE_USER_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
    })
    .addCase(ADMIN_UPDATE_USER_REJECTED, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(ADMIN_UPDATE_USER_RESET, () => {
      return {};
    });
});
