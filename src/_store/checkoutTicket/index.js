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
    ticketGroupRange: null,
    ticketGroupSplits: null,
    lockRequestId: null,
    vfsURL: null,
  },
  reducers: {
    setPreCheckoutTicketDataAction(state, action) {
      state.ticketGroupId = action.payload.ticketGroupID;
      state.ticketGroupPrice = action.payload.ticketGroupPrice;
      state.deliveryTypeId = action.payload.deliveryTypeId;
      state.deliveryTypeName = action.payload.deliveryTypeName;
      state.ticketNetworkId = action.payload.eventId;
      state.vfsURL = action.payload.vfsURL;
      state.ticketGroupSection = action.payload.ticketGroupSection;
      state.ticketGroupRow = action.payload.ticketGroupRow;
      state.ticketGroupRange = action.payload.ticketGroupRange;
      state.ticketGroupSplits = action.payload.ticketGroupSplits;
    },
    clearPreCheckoutTicketDataAction(state) {
      state.ticketGroupId = null;
      state.ticketGroupPrice = null;
      state.deliveryTypeId = null;
      state.deliveryTypeName = null;
      state.ticketNetworkId = null;
      state.vfsURL = null;
      state.ticketGroupSection = null;
      state.ticketGroupRow = null;
    },
    setCheckoutTicketQuantityAction(state, action) {
      state.ticketGroupQuantity = action.payload;
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
  setPreCheckoutTicketDataAction,
  clearPreCheckoutTicketDataAction,
  setCheckoutTicketEventDataAction,
  setCheckoutTicketQuantityAction,
} = checkoutTicketSlice.actions;

export default checkoutTicketSlice.reducer;
