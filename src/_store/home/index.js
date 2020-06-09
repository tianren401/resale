import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { homeService } from '_services';

export const getHomeAction = createAsyncThunk(
  'content/home/get',
  async (location) => {
    const response = await homeService.getHome(location);
    return response;
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    home: {},
    loading: 'idle',
  },
  reducers: {
    setEventTypeAction(state, action) {
      state.eventType = action.payload;
    },
  },
  extraReducers: {
    [getHomeAction.fulfilled]: (state, action) => {
      state.home = action.payload;
    },
  },
});

export const { setEventTypeAction } = homeSlice.actions;
export default homeSlice.reducer;
