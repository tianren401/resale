import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { performerEventsService } from '_services';

export const getPerformerEventsAction = createAsyncThunk(
  'content/performer/get',
  async (payload) => {
    const response = await performerEventsService.getPerformerEvents(
      payload.id
    );
    return response;
  }
);

const performerSlice = createSlice({
  name: 'performer',
  initialState: {
    events: [],
    loading: 'idle',
  },
  reducers: {
    setEventsAction(state, action) {
      state.eventType = action.payload;
    },
  },
  extraReducers: {
    [getPerformerEventsAction.fulfilled]: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { setEventsAction } = performerSlice.actions;
export default performerSlice.reducer;
