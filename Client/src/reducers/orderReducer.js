import { createReducer } from "@reduxjs/toolkit";
import {
  CREATE_ORDER_PENDING,
  CREATE_ORDER_FULLFILLED,
  CREATE_ORDER_REJECTED,
  CREATE_ORDER_RESET,
  ORDER_INFO_PENDING,
  ORDER_INFO_FULLFILLED,
  ORDER_INFO_REJECTED,
  ORDER_PAY_PENDING,
  ORDER_PAY_FULLFILLED,
  ORDER_PAY_REJECTED,
  ORDER_PAY_RESET,
  FETCH_USER_ORDERS_PENDING,
  FETCH_USER_ORDERS_FULLFILLED,
  FETCH_USER_ORDERS_REJECTED,
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_FULLFILLED,
  FETCH_ORDERS_REJECTED,
  ORDER_DELIVER_PENDING,
  ORDER_DELIVER_FULLFILLED,
  ORDER_DELIVER_REJECTED,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { USER_LOGOUT } from "../constants/userConstants.js";

export const orderCreateReducer = createReducer({}, (builder) => {
  builder
    .addCase(CREATE_ORDER_PENDING, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(CREATE_ORDER_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
      state.order = action.payload;
    })
    .addCase(CREATE_ORDER_REJECTED, (state, action) => {
      state.loading = false;
      state.fullfilled = false;
      state.error = action.payload;
    })
    .addCase(CREATE_ORDER_RESET, () => {
      return {};
    });
});

export const orderInfoReducer = createReducer(
  {
    loading: true,
  },
  (builder) => {
    builder
      .addCase(ORDER_INFO_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ORDER_INFO_FULLFILLED, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(ORDER_INFO_REJECTED, (state, action) => {
        state.loading = false;
        state.fullfilled = false;
        state.error = action.payload;
      });
  }
);

export const orderPayReducer = createReducer({}, (builder) => {
  builder
    .addCase(ORDER_PAY_PENDING, (state) => {
      state.loading = true;
      state.fullfilled = false;
      state.error = null;
    })
    .addCase(ORDER_PAY_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
    })
    .addCase(ORDER_PAY_REJECTED, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(ORDER_PAY_RESET, () => {
      return {};
    });
});

export const userOrdersReducer = createReducer(
  {
    orders: [],
  },
  (builder) => {
    builder
      .addCase(FETCH_USER_ORDERS_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_USER_ORDERS_FULLFILLED, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(FETCH_USER_ORDERS_REJECTED, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(USER_LOGOUT, (state, action) => {
        state.orders = [];
      });
  }
);

export const OrderListReducer = createReducer(
  {
    orders: [],
  },
  (builder) => {
    builder
      .addCase(FETCH_ORDERS_PENDING, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_ORDERS_FULLFILLED, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(FETCH_ORDERS_REJECTED, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(USER_LOGOUT, (state, action) => {
        state.orders = [];
      });
  }
);

export const orderDeliverReducer = createReducer({}, (builder) => {
  builder
    .addCase(ORDER_DELIVER_PENDING, (state) => {
      state.loading = true;
      state.fullfilled = false;
      state.error = null;
    })
    .addCase(ORDER_DELIVER_FULLFILLED, (state, action) => {
      state.loading = false;
      state.fullfilled = true;
    })
    .addCase(ORDER_DELIVER_REJECTED, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(ORDER_DELIVER_RESET, () => {
      return {};
    });
});
