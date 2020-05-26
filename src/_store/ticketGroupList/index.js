import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ticketGroupListService } from '_services';

export const getTicketGroupListAction = createAsyncThunk(
  'ticketGroupList/get',
  async (eventId) => {
    const response = await ticketGroupListService.getTicketGroupList(eventId);
    return response;
  }
);

const ticketGroupListSlice = createSlice({
  name: 'seatics',
  initialState: {
    ticketGroupListFormatted: null,
    ticketGroupListRaw: null,
  },
  reducers: {},
  extraReducers: {
    [getTicketGroupListAction.fulfilled]: (state, action) => {
      state.ticketGroupListFormatted = [];
      const ticketData = action.payload.ticketGroups;

      state.ticketGroupListRaw = ticketData;
      ticketData.forEach((ticketGroup) => {
        state.ticketGroupListFormatted.push({
          tgUserSec: ticketGroup.seats.section,
          tgUserRow: ticketGroup.seats.row,
          tgQty: ticketGroup.availableQuantity,
          tgPrice: ticketGroup.unitPrice.wholesalePrice.value,
          tgID: ticketGroup.exchangeTicketGroupId,
          tgType: ticketGroup.ticketGroupType.id,
          tgNotes: ticketGroup.notes,
          tgUserSeats: `${ticketGroup.seats.lowSeat}-${ticketGroup.seats.highSeat}`,
          tgDeliveryOptions: '',
          tgSplitRuleId: 1,
        });
      });
    },
  },
});

// export const { setSeaticsData } = seaticsSlice.actions;
export default ticketGroupListSlice.reducer;
