import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { eventsService } from '_services';
import { groupEventTypeOptions, upcomingEventOptions } from '_constants';
import {
  heroEventImage,
  groupEventImages,
  upcomingImages,
} from '_mocks/eventImages';

export const getEventsAction = createAsyncThunk(
  'events/get',
  async (payload) => {
    const response = await eventsService.getEvents(payload.page, payload.size);
    return response;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    eventsGroup: {},
    upcomingEvents: {},
    heroEvents: [],
    eventType: 'trendingEvent',
    loading: 'idle',
  },
  reducers: {
    setEventTypeAction(state, action) {
      state.eventType = action.payload;
    },
  },
  extraReducers: {
    [getEventsAction.fulfilled]: (state, action) => {
      const events = action.payload.content;
      state.events = action.payload;
      for (const index in groupEventTypeOptions) {
        const option = groupEventTypeOptions[index];
        state.eventsGroup[option.value] = events
          .slice(6 * index, 6 + 6 * index)
          .map((event, i) => ({ ...event, image: groupEventImages[i] }));
      }
      for (const index in upcomingEventOptions) {
        const option = upcomingEventOptions[index];
        state.upcomingEvents[option.value] = events
          .slice(3 * index, 6 + 3 * index)
          .map((event, i) => ({
            ...event,
            image: upcomingImages[`${option.value}`][i],
            price: 50,
          }));
      }
      state.heroEvents = events.slice(15, 19).map((event) => ({
        ...event,
        image: heroEventImage,
      }));
    },
  },
});

export const { setEventTypeAction } = eventsSlice.actions;
export default eventsSlice.reducer;
