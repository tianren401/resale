import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { seaticsService } from '_services';

export const getSeaticsDataAction = createAsyncThunk(
  'seatics/get',
  async (eventId) => {
    const response = await seaticsService.getSeaticsData(eventId);
    response[0].eventDate = JSON.stringify(response[0].eventDate);
    return response;
  }
);

const seaticsSlice = createSlice({
  name: 'seatics',
  initialState: {
    eventData: null,
    mapData: null,
  },
  reducers: {},
  extraReducers: {
    [getSeaticsDataAction.fulfilled]: (state, action) => {
      state.eventData = action.payload[0];
      state.mapData = action.payload[1];
    },
  },
});

export default seaticsSlice.reducer;
