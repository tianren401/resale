import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { venueEventsService } from '_services';

export const getVenueEventsAction = createAsyncThunk(
  'content/venue/get',
  async (payload) => {
    const response = await venueEventsService.getVenueEvents(payload.id);
    return response;
  }
);

const venueSlice = createSlice({
  name: 'venueEvents',
  initialState: {
    events: {},
    loading: 'idle',
  },
  reducers: {
    setEventsAction(state, action) {
      state.eventType = action.payload;
    },
  },
  extraReducers: {
    [getVenueEventsAction.fulfilled]: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { setEventsAction } = venueSlice.actions;
export default venueSlice.reducer;
