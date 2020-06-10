import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ordersService } from '_services';

export const getUserOrdersAction = createAsyncThunk(
  'content/orders/user',
  async (email) => {
    const response = await ordersService.getUserOrders(email);
    return response;
  }
);

export const getOrderDetailsAction = createAsyncThunk(
  'content/order/details',
  async (id) => {
    const response = await ordersService.getOrderDetails(id);
    return response;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    loading: false,
    sidebarStage: 0,
    upcomingOrders: [],
    pastOrders: [],
    currentOrder: null,
  },
  reducers: {
    setSidebarStage(state, action) {
      state.sidebarStage = action.payload;
    },
  },
  extraReducers: {
    [getUserOrdersAction.fulfilled]: (state, action) => {
      const orders = action.payload;
      const pastOrders = [];
      const upcomingOrders = [];
      orders.forEach((order) => {
        const {
          event: {
            event: { timestamp },
          },
        } = order;
        const eventDate = new Date(timestamp).getTime();
        const now = new Date().getTime();
        if (eventDate > now) {
          upcomingOrders.push(order);
        } else {
          pastOrders.push(order);
        }
      });

      state.upcomingOrders = upcomingOrders;
      state.pastOrders = pastOrders;
    },

    [getOrderDetailsAction.fulfilled]: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
});

export const { setSidebarStage } = ordersSlice.actions;

export default ordersSlice.reducer;
