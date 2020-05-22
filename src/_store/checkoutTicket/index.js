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
    ticketGroupId: null,
    ticketGroupQuantity: null,
    ticketGroupPrice: null,
    deliveryTypeId: null,
    deliveryTypeName: '',
    ticketNetworkId: null,
    event: {
      id: null,
      name: '',
      date: null,
      city: 'City',
      stateProvince: 'State',
      venue: 'Venue',
    },
    ticketGroupSection: null,
    ticketGroupRow: null,
    lockRequestId: null,
    vfsURL: null,
  },
  reducers: {
    setCheckoutTicketDataAction(state, action) {
      state.ticketGroupId = action.payload.ticketGroupID;
      state.ticketGroupQuantity = action.payload.ticketGroupQuantity;
      state.ticketGroupPrice = action.payload.ticketGroupPrice;
      state.deliveryTypeId = action.payload.deliveryTypeId;
      state.deliveryTypeName = action.payload.deliveryTypeName;
      state.ticketNetworkId = action.payload.eventId;
      state.vfsURL = action.payload.vfsURL;
      state.ticketGroupSection = action.payload.section;
      state.ticketGroupRow = action.payload.row;
    },
    setCheckoutTicketEventDataAction(state, action) {
      state.event = {
        id: action.payload.eventId,
        name: action.payload.eventData.eventName,
        date: action.payload.eventData.eventDate,
        city: action.payload.eventData.city,
        stateProvince: action.payload.eventData.stateProvince,
        venue: action.payload.eventData.venueName,
      };
    },
  },
  extraReducers: {
    [getLockRequestIdAction.fulfilled]: (state, action) => {
      state.lockRequestId = action.payload.lockRequestId;
    },
  },
});

export const {
  setCheckoutTicketDataAction,
  setCheckoutTicketEventDataAction,
} = checkoutTicketSlice.actions;
export default checkoutTicketSlice.reducer;
