import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { checkoutTickeService } from '_services';

export const getLockRequestIdAction = createAsyncThunk(
  'checkoutTicket/get',
  async (request) => {
    const response = await checkoutTickeService.getLockRequestId(request);
    return response;
  }
);

const checkoutTicketSlice = createSlice({
  name: 'checkoutTicket',
  initialState: {
    ticketGroupID: null,
    ticketGroupQuantity: null,
    ticketGroupPrice: null,
    deliveryTypeId: null,
    deliveryTypeName: '',
    eventId: null,
    lockRequestId: null,
    vfsURL: null,
  },
  reducers: {
    setCheckoutTicketDataAction(state, action) {
      state.ticketGroupID = action.payload.ticketGroupID;
      state.ticketGroupQuantity = action.payload.ticketGroupQuantity;
      state.ticketGroupPrice = action.payload.ticketGroupPrice;
      state.deliveryTypeId = action.payload.deliveryTypeId;
      state.deliveryTypeName = action.payload.deliveryTypeName;
      state.eventId = action.payload.eventId;
      state.vfsURL = action.payload.vfsURL;
    },
  },
  extraReducers: {
    [getLockRequestIdAction.fulfilled]: (state, action) => {
      state.lockRequestId = action.payload.lockRequestId;
    },
  },
});

export const { setCheckoutTicketDataAction } = checkoutTicketSlice.actions;
export default checkoutTicketSlice.reducer;
